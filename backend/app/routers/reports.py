from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.repositories.assessment_repository import AssessmentRepository

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/")
def list_reports(
    skip: int = 0,
    limit: int = 100,
    company_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Lista los reportes disponibles."""
    repo = AssessmentRepository(db)
    assessments = repo.get_all(skip=skip, limit=limit, company_id=company_id)

    reports = []
    for a in assessments:
        if a.status == "COMPLETED":
            result = repo.get_results(a.id)
            reports.append({
                "id": a.id,
                "company_name": a.company.business_name if a.company else "N/A",
                "type": "Evaluación de Cumplimiento",
                "date": a.completed_at or a.created_at,
                "status": "Completado",
                "compliance_percentage": result.compliance_percentage if result else 0,
            })

    return {"reports": reports, "total": len(reports)}


@router.get("/{report_id}")
def get_report_detail(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene el detalle de un reporte."""
    repo = AssessmentRepository(db)
    assessment = repo.get_by_id(report_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")

    result = repo.get_results(report_id)
    category_results = repo.get_category_results(report_id)

    return {
        "id": assessment.id,
        "company": {
            "name": assessment.company.business_name if assessment.company else "N/A",
            "nit": assessment.company.nit if assessment.company else "N/A",
        },
        "evaluator": {
            "name": f"{assessment.evaluator.first_name} {assessment.evaluator.last_name}"
            if assessment.evaluator
            else "N/A",
        },
        "status": assessment.status,
        "completed_at": assessment.completed_at,
        "result": {
            "compliance_percentage": result.compliance_percentage if result else 0,
            "compliance_level": result.compliance_level if result else "N/A",
            "risk_level": result.risk_level if result else "N/A",
        } if result else None,
        "categories": [
            {
                "category_id": cr.category_id,
                "percentage": cr.percentage,
                "score": cr.score,
                "max_score": cr.max_score,
            }
            for cr in category_results
        ],
    }


@router.get("/{report_id}/download")
def download_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Genera y descarga un reporte en PDF."""
    repo = AssessmentRepository(db)
    assessment = repo.get_by_id(report_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")

    result = repo.get_results(report_id)
    category_results = repo.get_category_results(report_id)

    # Generar PDF con ReportLab
    from io import BytesIO
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    # Título
    title_style = ParagraphStyle(
        "CustomTitle", parent=styles["Heading1"], fontSize=18, spaceAfter=20
    )
    elements.append(Paragraph("Reporte de Cumplimiento Normativo", title_style))
    elements.append(Paragraph(f"Evaluación #{report_id}", styles["Heading2"]))
    elements.append(Spacer(1, 12))

    # Información de la empresa
    company_name = assessment.company.business_name if assessment.company else "N/A"
    elements.append(Paragraph(f"<b>Empresa:</b> {company_name}", styles["Normal"]))
    elements.append(Paragraph(f"<b>NIT:</b> {assessment.company.nit if assessment.company else 'N/A'}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Fecha:</b> {assessment.completed_at or assessment.created_at}", styles["Normal"]))
    elements.append(Spacer(1, 12))

    # Resultados generales
    if result:
        elements.append(Paragraph("<b>Resultado General</b>", styles["Heading3"]))
        data = [
            ["Métrica", "Valor"],
            ["Cumplimiento", f"{result.compliance_percentage}%"],
            ["Nivel", result.compliance_level],
            ["Riesgo", result.risk_level],
        ]
        table = Table(data, colWidths=[150, 150])
        table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e3a5f")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ]))
        elements.append(table)
        elements.append(Spacer(1, 12))

    # Resultados por categoría
    if category_results:
        elements.append(Paragraph("<b>Resultados por Categoría</b>", styles["Heading3"]))
        cat_data = [["Categoría", "Porcentaje", "Puntaje"]]
        cat_names = {1: "Política de Datos", 2: "Privacidad", 3: "Gobernanza", 4: "Seguridad"}
        for cr in category_results:
            cat_name = cat_names.get(cr.category_id, f"Cat. {cr.category_id}")
            cat_data.append([cat_name, f"{cr.percentage}%", f"{cr.score}/{cr.max_score}"])

        cat_table = Table(cat_data, colWidths=[150, 100, 100])
        cat_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e3a5f")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ]))
        elements.append(cat_table)

    doc.build(elements)
    buffer.seek(0)

    filename = f"reporte_evaluacion_{report_id}.pdf"
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@router.post("/generate/{assessment_id}")
def generate_report(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Genera un reporte para una evaluación completada."""
    repo = AssessmentRepository(db)
    assessment = repo.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")
    if assessment.status != "COMPLETED":
        raise HTTPException(status_code=400, detail="La evaluación debe estar completada")

    return {
        "message": "Reporte generado exitosamente",
        "report_id": assessment_id,
        "download_url": f"/reports/{assessment_id}/download",
    }
