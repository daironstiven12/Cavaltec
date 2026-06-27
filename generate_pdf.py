#!/usr/bin/env python3
"""Generate PDF documentation and system results for CAVALTEC platform."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

OUTPUT_DIR = r"C:\Users\Ds\Documents\Important\Codigo\Hackathon Medellin"

# Colors
PRIMARY = HexColor("#2563eb")
PRIMARY_DARK = HexColor("#1d4ed8")
PRIMARY_LIGHT = HexColor("#dbeafe")
SUCCESS = HexColor("#059669")
WARNING = HexColor("#d97706")
ERROR = HexColor("#dc2626")
TEXT = HexColor("#1a1a2e")
TEXT_SECONDARY = HexColor("#475569")
TEXT_MUTED = HexColor("#94a3b8")
BG_LIGHT = HexColor("#f8fafc")
BORDER = HexColor("#e5e7eb")
PURPLE = HexColor("#7c3aed")
TEAL = HexColor("#0d9488")

def get_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontSize=32,
        leading=40,
        fontName='Helvetica-Bold',
        textColor=PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=12,
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontSize=14,
        leading=20,
        fontName='Helvetica',
        textColor=TEXT_SECONDARY,
        alignment=TA_CENTER,
        spaceAfter=8,
    ))
    
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontSize=20,
        leading=26,
        fontName='Helvetica-Bold',
        textColor=TEXT,
        spaceBefore=24,
        spaceAfter=12,
        borderWidth=2,
        borderColor=PRIMARY,
        borderPadding=(0, 0, 8, 0),
    ))
    
    styles.add(ParagraphStyle(
        name='SubSection',
        fontSize=15,
        leading=20,
        fontName='Helvetica-Bold',
        textColor=TEXT,
        spaceBefore=16,
        spaceAfter=8,
    ))
    
    styles.add(ParagraphStyle(
        name='BodyText2',
        fontSize=11,
        leading=16,
        fontName='Helvetica',
        textColor=TEXT_SECONDARY,
        alignment=TA_JUSTIFY,
        spaceAfter=8,
    ))
    
    styles.add(ParagraphStyle(
        name='BulletItem',
        fontSize=11,
        leading=15,
        fontName='Helvetica',
        textColor=TEXT_SECONDARY,
        leftIndent=20,
        spaceAfter=4,
    ))
    
    styles.add(ParagraphStyle(
        name='CodeBlock',
        fontSize=9,
        leading=13,
        fontName='Courier',
        textColor=TEXT,
        backColor=BG_LIGHT,
        borderWidth=1,
        borderColor=BORDER,
        borderPadding=8,
        spaceAfter=8,
    ))
    
    styles.add(ParagraphStyle(
        name='TechCard',
        fontSize=11,
        leading=15,
        fontName='Helvetica',
        textColor=TEXT_SECONDARY,
        spaceAfter=4,
    ))
    
    styles.add(ParagraphStyle(
        name='SmallLabel',
        fontSize=9,
        fontName='Helvetica-Bold',
        textColor=PRIMARY,
        spaceAfter=2,
    ))
    
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontSize=10,
        fontName='Helvetica-Bold',
        textColor=white,
        alignment=TA_CENTER,
    ))
    
    styles.add(ParagraphStyle(
        name='TableCell',
        fontSize=10,
        fontName='Helvetica',
        textColor=TEXT,
    ))
    
    styles.add(ParagraphStyle(
        name='ResultValue',
        fontSize=24,
        fontName='Helvetica-Bold',
        textColor=PRIMARY,
        alignment=TA_CENTER,
    ))
    
    styles.add(ParagraphStyle(
        name='ResultLabel',
        fontSize=10,
        fontName='Helvetica',
        textColor=TEXT_SECONDARY,
        alignment=TA_CENTER,
    ))
    
    return styles

def add_header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(2*cm, 1.5*cm, "CAVALTEC - Documentacion Tecnica")
    canvas.drawRightString(A4[0] - 2*cm, 1.5*cm, f"Pagina {doc.page}")
    canvas.setStrokeColor(BORDER)
    canvas.line(2*cm, 2*cm, A4[0] - 2*cm, 2*cm)
    canvas.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        os.path.join(OUTPUT_DIR, "CAVALTEC_Documentacion_Resultados.pdf"),
        pagesize=A4,
        topMargin=2.5*cm,
        bottomMargin=3*cm,
        leftMargin=2*cm,
        rightMargin=2*cm,
    )
    
    styles = get_styles()
    story = []
    
    # ==================== COVER PAGE ====================
    story.append(Spacer(1, 60))
    story.append(HRFlowable(width="60%", thickness=3, color=PRIMARY))
    story.append(Spacer(1, 20))
    story.append(Paragraph("CAVALTEC", styles['CoverTitle']))
    story.append(Paragraph("Plataforma de Cumplimiento Ley 1581", styles['CoverSubtitle']))
    story.append(Paragraph("Documentacion Tecnica y Resultados del Sistema", styles['CoverSubtitle']))
    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="40%", thickness=1, color=BORDER))
    story.append(Spacer(1, 30))
    
    # Cover info table
    cover_data = [
        ['Version', 'v2.4.1'],
        ['Fecha', '27 de junio, 2026'],
        ['Stack', 'React + FastAPI + MySQL'],
        ['Estado', 'Produccion - Hackathon'],
    ]
    cover_table = Table(cover_data, colWidths=[120, 200])
    cover_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 0), (0, -1), TEXT_SECONDARY),
        ('TEXTCOLOR', (1, 0), (1, -1), TEXT),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(cover_table)
    story.append(PageBreak())
    
    # ==================== TABLE OF CONTENTS ====================
    story.append(Paragraph("Tabla de Contenidos", styles['SectionTitle']))
    story.append(Spacer(1, 8))
    toc_items = [
        "1. Resumen Ejecutivo",
        "2. Arquitectura del Sistema",
        "3. Stack Tecnologico",
        "4. Modulos Funcionales",
        "5. API REST - Endpoints",
        "6. Base de Datos",
        "7. Seguridad y Autenticacion",
        "8. Inteligencia Artificial",
        "9. Resultados del Sistema",
        "10. Metricas de Cumplimiento",
        "11. Brechas Detectadas",
        "12. Plan de Accion",
        "13. Guia de Instalacion",
        "14. Credenciales de Demostracion",
        "15. Proximos Pasos",
    ]
    for item in toc_items:
        story.append(Paragraph(item, styles['BulletItem']))
    story.append(PageBreak())
    
    # ==================== 1. RESUMEN EJECUTIVO ====================
    story.append(Paragraph("1. Resumen Ejecutivo", styles['SectionTitle']))
    story.append(Paragraph(
        "CAVALTEC es una plataforma web integral para la gestion de cumplimiento de la Ley 1581 de 2012 "
        "(Proteccion de Datos Personales) y el Decreto 1377 de 2017. La plataforma permite a las empresas "
        "evaluar su nivel de cumplimiento normativo a traves de cuestionarios automatizados, generar reportes "
        "detallados y recibir recomendaciones de IA basadas en la normativa colombiana.",
        styles['BodyText2']
    ))
    story.append(Paragraph(
        "El sistema cuenta con 44 endpoints API, 18 tablas en base de datos, 4 roles de usuario con "
        "permisos diferenciados, un motor de IA que responde exclusivamente sobre temas de cumplimiento, "
        "y una interfaz moderna con soporte para tema oscuro/claro y disenio responsivo.",
        styles['BodyText2']
    ))
    
    # Key metrics
    metrics_data = [
        [Paragraph('<b>Metrica</b>', styles['TableHeader']),
         Paragraph('<b>Valor</b>', styles['TableHeader'])],
        ['Puntaje de Cumplimiento', '76%'],
        ['Fortalezas Identificadas', '3'],
        ['Brechas Detectadas', '3'],
        ['Recomendaciones', '4'],
        ['Empresas Registradas', '6'],
        ['Usuarios Activos', '12'],
        ['Endpoints API', '44'],
        ['Tablas BD', '18'],
    ]
    metrics_table = Table(metrics_data, colWidths=[250, 150])
    metrics_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(Spacer(1, 8))
    story.append(metrics_table)
    story.append(PageBreak())
    
    # ==================== 2. ARQUITECTURA ====================
    story.append(Paragraph("2. Arquitectura del Sistema", styles['SectionTitle']))
    story.append(Paragraph(
        "La plataforma sigue una arquitectura de capas con separacion clara de responsabilidades:",
        styles['BodyText2']
    ))
    
    arch_items = [
        "<b>Frontend (React + Vite)</b>: SPA con routing client-side, contextos globales para tema, autenticacion y notificaciones. Componentes reutilizables con CSS modular.",
        "<b>Backend (FastAPI + Python)</b>: API REST asincrona con Pydantic schemas, repositorios con patron de acceso a datos, dependencias inyectadas via FastAPI.",
        "<b>Base de Datos (MySQL 8)</b>: 18 tablas con relaciones FK, triggers para auditoria, procedimientos almacenados para reportes.",
        "<b>IA (OpenRouter API)</b>: Integracion con modelos LLM para asistencia de cumplimiento, con prompt de sistema restringido a temas Ley 1581.",
        "<b>Infraestructura (Docker)</b>: Contenedores para backend, MySQL y phpMyAdmin. Docker Compose para orquestacion.",
    ]
    for item in arch_items:
        story.append(Paragraph(f"* {item}", styles['BulletItem']))
    
    # Architecture diagram (text-based)
    story.append(Spacer(1, 12))
    story.append(Paragraph("Diagrama de Arquitectura:", styles['SubSection']))
    arch_diagram = """
    +-------------------+     +-------------------+     +-------------------+
    |                   |     |                   |     |                   |
    |   React + Vite    | --> |   FastAPI + Uvicorn| --> |    MySQL 8.0     |
    |   (Puerto 5174)   |     |   (Puerto 8000)   |     |   (Puerto 3310)  |
    |                   |     |                   |     |                   |
    +-------------------+     +-------------------+     +-------------------+
                                     |                         |
                                     v                         |
                            +-------------------+              |
                            |   OpenRouter API  |              |
                            |   (IA + Ley 1581) |              |
                            +-------------------+              |
                                                               |
                            +-------------------+              |
                            |   phpMyAdmin      | <------------+
                            |   (Puerto 8080)   |
                            +-------------------+
    """
    story.append(Paragraph(arch_diagram.strip(), styles['CodeBlock']))
    story.append(PageBreak())
    
    # ==================== 3. STACK TECNOLOGICO ====================
    story.append(Paragraph("3. Stack Tecnologico", styles['SectionTitle']))
    
    tech_data = [
        [Paragraph('<b>Tecnologia</b>', styles['TableHeader']),
         Paragraph('<b>Version</b>', styles['TableHeader']),
         Paragraph('<b>Por que se eligio</b>', styles['TableHeader'])],
        ['React', '18.x', 'Ecosistema maduro, componentes reutilizables, gran comunidad'],
        ['Vite', '5.x', 'Build rapido, HMR instantaneo, mejor DX que Webpack'],
        ['FastAPI', '0.115+', 'API asincrona automatica, validacion Pydantic, docs OpenAPI'],
        ['MySQL', '8.0', 'ACID, transacciones, escalabilidad, amplio soporte'],
        ['Pydantic', '2.x', 'Validacion de datos estricta, serializacion automatica'],
        ['Recharts', '2.x', 'Graficos declarativos para React, ResponsiveContainer'],
        ['React Router', '6.x', 'Routing declarativo, layouts anidados, carga diferida'],
        ['Axios', '1.x', 'Interceptores de JWT, cancelacion de requests, retry'],
        ['Docker', '24.x', 'Aislamiento de servicios, reproducibilidad, deploy'],
        ['OpenRouter', 'API', 'Acceso a multiples modelos LLM, tier gratuito'],
        ['argon2', 'pwd', 'Ganador Password Hashing Competition, resistente a GPU'],
        ['Fi Icons', 'react-icons', 'Iconos SVG ligeros, tree-shakeable, consistentes'],
    ]
    tech_table = Table(tech_data, colWidths=[90, 70, 280])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tech_table)
    story.append(PageBreak())
    
    # ==================== 4. MODULOS FUNCIONALES ====================
    story.append(Paragraph("4. Modulos Funcionales", styles['SectionTitle']))
    
    modules = [
        ("<b>Modulo de Autenticacion</b>", "Login, registro, roles (Super Admin, Admin Empresa, Auditor, Consultor), JWT tokens, refresh tokens, sesiones."),
        ("<b>Modulo de Empresas</b>", "CRUD completo, gestio de usuarios por empresa, estadisticas de cumplimiento por empresa."),
        ("<b>Modulo de Cuestionarios</b>", "Evaluaciones con 54 preguntas en 4 categorias, navegacion por teclado, guardado de borradores, tiempo estimado."),
        ("<b>Modulo de Resultados</b>", "Gauge de cumplimiento, graficos de barras por categoria, brechas, fortalezas, recomendaciones, exportar/imprimir."),
        ("<b>Modulo de IA</b>", "Chat de asistencia restringido a temas de cumplimiento, historial de conversaciones, recomendaciones automaticas."),
        ("<b>Modulo de Reportes</b>", "Generacion de informes por empresa, tipo y fecha, descarga en TXT, filtros rapidos."),
        ("<b>Modulo de Configuracion</b>", "Perfil editable, notificaciones con toggle, apariencia (tema oscuro/claro), seguridad (2FA, sesiones)."),
        ("<b>Modulo de Auditoria</b>", "Vista especializada para auditores con dashboard propio, historial de evaluaciones asignadas."),
    ]
    for title, desc in modules:
        story.append(Paragraph(title, styles['SubSection']))
        story.append(Paragraph(desc, styles['BodyText2']))
    story.append(PageBreak())
    
    # ==================== 5. API REST ====================
    story.append(Paragraph("5. API REST - Endpoints", styles['SectionTitle']))
    story.append(Paragraph(
        "La API cuenta con 44 endpoints organizados por recurso. Todos los endpoints autenticados "
        "requieren un header Authorization: Bearer <token>.",
        styles['BodyText2']
    ))
    
    api_data = [
        [Paragraph('<b>Metodo</b>', styles['TableHeader']),
         Paragraph('<b>Endpoint</b>', styles['TableHeader']),
         Paragraph('<b>Descripcion</b>', styles['TableHeader'])],
        ['POST', '/auth/login', 'Autenticacion y obtencion de tokens JWT'],
        ['POST', '/auth/register', 'Registro de nuevo usuario'],
        ['POST', '/auth/refresh', 'Renovacion de access token'],
        ['GET', '/auth/me', 'Obtener usuario autenticado'],
        ['GET', '/companies', 'Listar todas las empresas'],
        ['POST', '/companies', 'Crear nueva empresa'],
        ['GET', '/companies/{id}', 'Detalle de empresa'],
        ['PUT', '/companies/{id}', 'Actualizar empresa'],
        ['DELETE', '/companies/{id}', 'Eliminar empresa'],
        ['GET', '/users', 'Listar usuarios'],
        ['POST', '/users', 'Crear usuario'],
        ['GET', '/questionnaires', 'Listar cuestionarios'],
        ['POST', '/questionnaires', 'Crear cuestionario'],
        ['GET', '/categories', 'Listar categorias'],
        ['GET', '/questions', 'Listar preguntas'],
        ['GET', '/assessments', 'Listar evaluaciones'],
        ['POST', '/assessments', 'Crear evaluacion'],
        ['GET', '/results', 'Listar resultados'],
        ['POST', '/ai/chat', 'Chat con IA (cumplimiento)'],
        ['GET', '/ai/conversations', 'Listar conversaciones IA'],
        ['GET', '/dashboard/stats', 'Estadisticas generales'],
        ['GET', '/dashboard/company/{id}', 'Stats por empresa'],
        ['GET', '/dashboard/auditor', 'Stats de auditor'],
        ['GET', '/notifications', 'Listar notificaciones'],
    ]
    api_table = Table(api_data, colWidths=[50, 180, 210])
    api_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTNAME', (0, 1), (0, -1), 'Courier-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(api_table)
    story.append(PageBreak())
    
    # ==================== 6. BASE DE DATOS ====================
    story.append(Paragraph("6. Base de Datos", styles['SectionTitle']))
    story.append(Paragraph(
        "MySQL 8.0 con 18 tablas, foreign keys para integridad referencial, y datos de prueba completos.",
        styles['BodyText2']
    ))
    
    db_data = [
        [Paragraph('<b>Tabla</b>', styles['TableHeader']),
         Paragraph('<b>Registros</b>', styles['TableHeader']),
         Paragraph('<b>Descripcion</b>', styles['TableHeader'])],
        ['users', '12', 'Usuarios del sistema con roles y contrasehas hasheadas (argon2)'],
        ['roles', '4', 'Roles: Super Admin, Admin Empresa, Auditor, Consultor'],
        ['companies', '6', 'Empresas registradas con NIT, direccion, ciudad'],
        ['questionnaires', '1', 'Cuestionario de evaluacion v2.4.1'],
        ['questionnaire_versions', '4', 'Historial de versiones del cuestionario'],
        ['categories', '4', 'Politica de Datos, PbD, Gobernanza, Seguridad'],
        ['questions', '20', 'Preguntas de evaluacion con pesos y categorias'],
        ['assessments', '6', 'Evaluaciones realizadas por empresa'],
        ['answers', '120', 'Respuestas individuales a preguntas'],
        ['results', '6', 'Resultados consolidados por evaluacion'],
        ['category_results', '24', 'Resultados por categoria'],
        ['permissions', '9', 'Permisos granulares del sistema'],
        ['role_permissions', '8', 'Asignacion de permisos a roles'],
        ['ai_conversations', 'variable', 'Historial de chats con IA'],
        ['ai_messages', 'variable', 'Mensajes individuales IA'],
        ['notifications', 'variable', 'Notificaciones del sistema'],
        ['audit_log', 'variable', 'Registro de auditoria'],
        ['sessions', 'variable', 'Sesiones activas de usuarios'],
    ]
    db_table = Table(db_data, colWidths=[120, 70, 250])
    db_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(db_table)
    story.append(PageBreak())
    
    # ==================== 7. SEGURIDAD ====================
    story.append(Paragraph("7. Seguridad y Autenticacion", styles['SectionTitle']))
    
    sec_items = [
        "<b>JWT Tokens</b>: Access token (30 min) + Refresh token (7 dias) con claims de rol y empresa.",
        "<b>Password Hashing</b>: Argon2id con salt aleatorio, resistente a ataques de fuerza bruta y GPU.",
        "<b>CORS</b>: Allow origins configurado para localhost:5174 (dev) y dominio de produccion.",
        "<b>Validacion Pydantic</b>: Todos los inputs validados estrictamente en schemas, prevencion de SQL injection.",
        "<b>Roles y Permisos</b>: 4 roles con permisos granulares. Auditor y Consultor sin permisos de escritura.",
        "<b>Manejo de Errores</b>: Excepciones globales que retornan JSON con CORS headers en todos los casos.",
        "<b>IA Restrictiva</b>: Prompt de sistema restringe respuestas exclusivamente a temas de cumplimiento.",
    ]
    for item in sec_items:
        story.append(Paragraph(f"* {item}", styles['BulletItem']))
    story.append(PageBreak())
    
    # ==================== 8. IA ====================
    story.append(Paragraph("8. Inteligencia Artificial", styles['SectionTitle']))
    story.append(Paragraph(
        "La plataforma integra un motor de IA basado en OpenRouter API que funciona como asistente "
        "especializado en cumplimiento de la Ley 1581 colombiana.",
        styles['BodyText2']
    ))
    
    ai_items = [
        "<b>Modelo</b>: google/gemma-4-26b-a4b-it:free (tier gratuito de OpenRouter).",
        "<b>Restriccion</b>: Solo responde sobre Ley 1581, Decreto 1377, derechos ARCO, PbD, gobernanza de datos, seguridad, notificacion de brechas, consentimiento y transferencias internacionales.",
        "<b>Redireccion</b>: Si el usuario pregunta algo fuera del dominio, la IA redirige gentilmente hacia temas de cumplimiento.",
        "<b>Conversaciones</b>: Historial completo de chats con IDs de conversacion para continuidad.",
        "<b>Uso en Cuestionario</b>: Asistencia contextual para cada pregunta de evaluacion.",
        "<b>Panel de Chat</b>: Interfaz dedicada con prompts rapidos y historial de conversaciones.",
    ]
    for item in ai_items:
        story.append(Paragraph(f"* {item}", styles['BulletItem']))
    story.append(PageBreak())
    
    # ==================== 9. RESULTADOS DEL SISTEMA ====================
    story.append(Paragraph("9. Resultados del Sistema", styles['SectionTitle']))
    story.append(Paragraph(
        "Resultados de la evaluacion de cumplimiento de TechCorp S.A.S. (Evaluacion v2.4.1, 15 de junio 2026).",
        styles['BodyText2']
    ))
    
    # Compliance gauge
    story.append(Spacer(1, 8))
    gauge_data = [
        [Paragraph('<b>PUNTAJE GENERAL DE CUMPLIMIENTO</b>', styles['TableHeader'])],
        [Paragraph('<font size="36"><b>76%</b></font>', styles['ResultValue'])],
        [Paragraph('Nivel de Riesgo: MEDIO', styles['ResultLabel'])],
    ]
    gauge_table = Table(gauge_data, colWidths=[300])
    gauge_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), PRIMARY_LIGHT),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('BOX', (0, 0), (-1, -1), 2, PRIMARY),
    ]))
    story.append(gauge_table)
    story.append(Spacer(1, 16))
    
    # Category scores
    story.append(Paragraph("Puntaje por Categoria", styles['SubSection']))
    cat_data = [
        [Paragraph('<b>Categoria</b>', styles['TableHeader']),
         Paragraph('<b>Puntaje</b>', styles['TableHeader']),
         Paragraph('<b>Tendencia</b>', styles['TableHeader']),
         Paragraph('<b>Estado</b>', styles['TableHeader'])],
        ['Politica de Datos', '82%', '+5%', 'Bueno'],
        ['Privacidad desde el Diseno', '71%', '+3%', 'Mejorable'],
        ['Gobernanza', '68%', '+8%', 'Critico'],
        ['Seguridad', '85%', '+2%', 'Excelente'],
    ]
    cat_table = Table(cat_data, colWidths=[160, 80, 80, 120])
    cat_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(cat_table)
    story.append(PageBreak())
    
    # ==================== 10. METRICAS ====================
    story.append(Paragraph("10. Metricas de Cumplimiento", styles['SectionTitle']))
    
    summary_data = [
        [Paragraph('<b>Metrica</b>', styles['TableHeader']),
         Paragraph('<b>Valor</b>', styles['TableHeader'])],
        ['Fortalezas Identificadas', '3'],
        ['Brechas Detectadas', '3'],
        ['Recomendaciones', '4'],
        ['Puntaje Anterior', '68%'],
        ['Puntaje Actual', '76%'],
        ['Mejora', '+8%'],
    ]
    summary_table = Table(summary_data, colWidths=[250, 150])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(summary_table)
    story.append(PageBreak())
    
    # ==================== 11. BRECHAS ====================
    story.append(Paragraph("11. Brechas Detectadas", styles['SectionTitle']))
    
    brechas = [
        ("Politica de Datos", "Media",
         "La politica de privacidad no incluye todos los derechos ARCO exigidos por la normativa vigente. "
         "Falta informacion sobre procedimiento de reclamaciones y contacto del responsable."),
        ("Privacidad desde el Diseno", "Alta",
         "No se implementan controles de privacidad en la fase de diseno de nuevos productos o servicios. "
         "Se carece de evaluaciones de impacto antes del desarrollo."),
        ("Gobernanza", "Alta",
         "No existe un comite de privacidad formal ni reuniones periodicas de seguimiento. "
         "Falta designacion oficial del Oficial de Cumplimiento."),
    ]
    
    for area, sev, desc in brechas:
        sev_color = ERROR if sev == "Alta" else WARNING
        story.append(Paragraph(
            f"<b>{area}</b> - Severidad: <font color='#{sev_color.hexval()[2:]}'>{sev}</font>",
            styles['SubSection']
        ))
        story.append(Paragraph(desc, styles['BodyText2']))
    story.append(PageBreak())
    
    # ==================== 12. PLAN DE ACCION ====================
    story.append(Paragraph("12. Plan de Accion", styles['SectionTitle']))
    
    recommendations = [
        ("Establecer un comite de privacidad", "Alta",
         "Crear un comite de privacidad con reuniones mensuales y reportes directos a la direccion. "
         "Designar oficial de cumplimiento formalmente."),
        ("Implementar controles PbD", "Alta",
         "Integrar controles de privacidad en el ciclo de vida de desarrollo de productos. "
         "Realizar evaluaciones de impacto antes de nuevos proyectos."),
        ("Actualizar politica de privacidad", "Media",
         "Incluir todos los derechos ARCO y el procedimiento para ejercerlos. "
         "Actualizar canales de contacto del responsable del tratamiento."),
        ("Auditoria externa", "Media",
         "Realizar una auditoria externa de cumplimiento antes del proximo ciclo de evaluacion. "
         "Documentar hallazgos y plan de remediacion."),
    ]
    
    for i, (title, priority, desc) in enumerate(recommendations, 1):
        p_color = ERROR if priority == "Alta" else WARNING
        story.append(Paragraph(
            f"<b>{i}. {title}</b> (Prioridad: <font color='#{p_color.hexval()[2:]}'>{priority}</font>)",
            styles['SubSection']
        ))
        story.append(Paragraph(desc, styles['BodyText2']))
    
    # Strengths
    story.append(Spacer(1, 16))
    story.append(Paragraph("Fortalezas Identificadas", styles['SubSection']))
    strengths = [
        "Procedimientos de notificacion de brechas establecidos y operativos.",
        "Personal capacitado en proteccion de datos personales.",
        "Sistema de gestion de consentimientos implementado correctamente.",
    ]
    for s in strengths:
        story.append(Paragraph(f"* {s}", styles['BulletItem']))
    story.append(PageBreak())
    
    # ==================== 13. INSTALACION ====================
    story.append(Paragraph("13. Guia de Instalacion", styles['SectionTitle']))
    
    story.append(Paragraph("Prerequisitos:", styles['SubSection']))
    prereqs = [
        "Docker y Docker Compose instalados",
        "Node.js 18+ (para desarrollo frontend)",
        "Python 3.13+ (para desarrollo backend)",
        "MySQL 8.0 (o usar Docker)",
    ]
    for p in prereqs:
        story.append(Paragraph(f"* {p}", styles['BulletItem']))
    
    story.append(Paragraph("Pasos de Instalacion:", styles['SubSection']))
    steps = [
        "<b>1.</b> Clonar el repositorio: git clone <url-del-repo>",
        "<b>2.</b> Navegar al directorio: cd Hackathon-Medellin/backend",
        "<b>3.</b> Configurar variables de entorno en .env (ver seccion 14)",
        "<b>4.</b> Levantar servicios: docker-compose up -d",
        "<b>5.</b> Instalar dependencias frontend: cd ../frontend && npm install",
        "<b>6.</b> Iniciar frontend: npm run dev",
        "<b>7.</b> Abrir http://localhost:5174 en el navegador",
    ]
    for s in steps:
        story.append(Paragraph(s, styles['BulletItem']))
    
    story.append(Paragraph("Servicios Docker:", styles['SubSection']))
    docker_data = [
        [Paragraph('<b>Servicio</b>', styles['TableHeader']),
         Paragraph('<b>Puerto</b>', styles['TableHeader']),
         Paragraph('<b>Descripcion</b>', styles['TableHeader'])],
        ['privacy_backend', '8000', 'API FastAPI con auto-reload'],
        ['privacy_mysql', '3310', 'Base de datos MySQL 8.0'],
        ['privacy_phpmyadmin', '8080', 'Panel de administracion MySQL'],
    ]
    docker_table = Table(docker_data, colWidths=[130, 80, 230])
    docker_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Courier'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (1, -1), 'CENTER'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(docker_table)
    story.append(PageBreak())
    
    # ==================== 14. CREDENCIALES ====================
    story.append(Paragraph("14. Credenciales de Demostracion", styles['SectionTitle']))
    story.append(Paragraph(
        "Cada rol tiene credenciales separadas para que los jueces del hackathon puedan probar todas las vistas.",
        styles['BodyText2']
    ))
    
    creds_data = [
        [Paragraph('<b>Rol</b>', styles['TableHeader']),
         Paragraph('<b>Email</b>', styles['TableHeader']),
         Paragraph('<b>Contrasena</b>', styles['TableHeader'])],
        ['Super Admin', 'admin@cavaltec.com', 'Admin123!'],
        ['Admin Empresa', 'maria.gomez@segurdata.com', 'Empresa123!'],
        ['Auditor', 'carlos.rodriguez@cavaltec.com', 'Auditor123!'],
        ['Consultor', 'ana.martinez@cavaltec.com', 'Consultor123!'],
    ]
    creds_table = Table(creds_data, colWidths=[110, 200, 120])
    creds_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (2, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [white, BG_LIGHT]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(creds_table)
    
    story.append(Spacer(1, 16))
    story.append(Paragraph("Variables de Entorno (.env):", styles['SubSection']))
    env_items = [
        "DB_HOST=localhost",
        "DB_PORT=3310",
        "DB_USER=root",
        "DB_PASSWORD=root_password",
        "DB_NAME=privacy_compliance",
        "OPENROUTER_API_KEY=sk-or-v1-...",
        "OPENROUTER_MODEL=google/gemma-4-26b-a4b-it:free",
        "JWT_SECRET_KEY=<clave-secreta>",
        "JWT_ALGORITHM=HS256",
    ]
    for item in env_items:
        story.append(Paragraph(f"* {item}", styles['BulletItem']))
    story.append(PageBreak())
    
    # ==================== 15. PROXIMOS PASOS ====================
    story.append(Paragraph("15. Proximos Pasos", styles['SectionTitle']))
    
    next_steps = [
        "<b>Produccion</b>: Configurar HTTPS, variables de entorno seguras, backup automatico de BD.",
        "<b>Escalabilidad</b>: Redis para cache, load balancing, monitoreo con Prometheus/Grafana.",
        "<b>Features</b>: Exportar a PDF nativo, notificaciones push, modo offline, PWA.",
        "<b>IA</b>: Fine-tuning con jurisprudencia colombiana, RAG con documentos normativos.",
        "<b>Testing</b>: Unit tests (Jest + Pytest), integration tests, E2E con Cypress/Playwright.",
        "<b>Seguridad</b>: Rate limiting, OWASP scan, penetration testing, SOC2 compliance.",
    ]
    for item in next_steps:
        story.append(Paragraph(f"* {item}", styles['BulletItem']))
    
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY))
    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "<b>CAVALTEC</b> - Plataforma de Cumplimiento Ley 1581<br/>"
        "Desarrollado para el Hackathon Medellin 2026<br/>"
        "Documentacion generada automaticamente el 27 de junio de 2026",
        ParagraphStyle(
            'Footer',
            fontSize=10,
            alignment=TA_CENTER,
            textColor=TEXT_SECONDARY,
        )
    ))
    
    # Build PDF
    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)
    print(f"PDF generado exitosamente en: {os.path.join(OUTPUT_DIR, 'CAVALTEC_Documentacion_Resultados.pdf')}")

if __name__ == '__main__':
    build_pdf()
