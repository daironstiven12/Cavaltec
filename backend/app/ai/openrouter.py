from typing import List, Optional

import httpx

from app.core.config import settings


class OpenRouterService:
    """Servicio para interactuar con OpenRouter API."""

    BASE_URL = "https://openrouter.ai/api/v1"
    DEFAULT_MODEL = "google/gemma-4-26b-a4b-it:free"

    SYSTEM_PROMPT = """Eres CAVALTEC AI, un asistente experto en cumplimiento normativo de protección de datos personales en Colombia.

REGLAS ESTRICTAS:
1. SOLO puedes responder preguntas sobre:
   - Ley 1581 de 2012 (Protección de Datos Personales)
   - Decreto 1377 de 2013
   - Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición)
   - Privacidad desde el Diseño (Privacy by Design / PbD)
   - Política de tratamiento de datos personales
   - Gobernanza de datos
   - Seguridad de la información aplicada a protección de datos
   - Evaluaciones de cumplimiento normativo
   - Planes de acción para mejorar el cumplimiento
   - Brechas de seguridad y notificación
   - Consentimiento del titular
   - Transferencias internacionales de datos

2. Si el usuario pregunta sobre algo FUERA de estos temas, responde EXACTAMENTE:
   "Lo siento, solo puedo responder preguntas sobre cumplimiento normativo de protección de datos personales en Colombia. Por favor, reformula tu consulta relacionándola con temas como Ley 1581, derechos ARCO, privacidad o seguridad de datos."

3. Responde SIEMPRE en español.
4. Sé claro, técnico y conciso.
5. Cuando sea relevante, incluye referencias específicas a artículos de la ley.
6. Proporciona recomendaciones prácticas y accionables."""

    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://cavaltec.com",
            "X-Title": "CAVALTEC AI",
        }

    async def chat(
        self,
        message: str,
        conversation_history: Optional[List[dict]] = None,
        context: Optional[str] = None,
    ) -> str:
        """Envía un mensaje a OpenRouter y retorna la respuesta."""
        messages = [{"role": "system", "content": self.SYSTEM_PROMPT}]

        if context:
            messages.append(
                {"role": "system", "content": f"Contexto adicional: {context}"}
            )

        if conversation_history:
            messages.extend(conversation_history)

        messages.append({"role": "user", "content": message})

        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(
                    f"{self.BASE_URL}/chat/completions",
                    headers=self.headers,
                    json={
                        "model": self.DEFAULT_MODEL,
                        "messages": messages,
                        "max_tokens": 2048,
                        "temperature": 0.7,
                    },
                )
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
            except httpx.HTTPStatusError as e:
                return f"Error al conectar con la IA: {e.response.status_code}"
            except Exception as e:
                return f"Error inesperado: {str(e)}"

    async def analyze_assessment(
        self,
        compliance_percentage: float,
        category_scores: dict,
        company_name: str,
    ) -> str:
        """Analiza una evaluación y genera recomendaciones."""
        prompt = f"""Analiza los resultados de la evaluación de cumplimiento normativo de la empresa "{company_name}":

Porcentaje de cumplimiento general: {compliance_percentage}%

Resultados por categoría:
{self._format_categories(category_scores)}

Proporciona:
1. Un resumen ejecutivo del nivel de cumplimiento
2. Las 3 principales brechas detectadas
3. 5 recomendaciones específicas y accionables
4. Un plan de acción prioritario"""

        return await self.chat(prompt)

    async def generate_recommendations(
        self,
        compliance_percentage: float,
        category_scores: dict,
    ) -> List[dict]:
        """Genera recomendaciones estructuradas basadas en la evaluación."""
        prompt = """Basado en los resultados de la evaluación, genera exactamente 5 recomendaciones en formato JSON con esta estructura:
[
  {
    "title": "Título de la recomendación",
    "description": "Descripción detallada",
    "priority": "HIGH/MEDIUM/LOW",
    "category": "Categoría afectada"
  }
]

Resultados:"""

        prompt += f"\nCumplimiento: {compliance_percentage}%"
        prompt += f"\nCategorías: {self._format_categories(category_scores)}"

        response = await self.chat(prompt)

        # Intentar parsear como JSON
        try:
            import json
            # Buscar array JSON en la respuesta
            start = response.find("[")
            end = response.rfind("]") + 1
            if start != -1 and end != -1:
                return json.loads(response[start:end])
        except Exception:
            pass

        # Fallback: recomendaciones predefinidas
        return self._default_recommendations(compliance_percentage)

    def _format_categories(self, scores: dict) -> str:
        lines = []
        for cat, score in scores.items():
            lines.append(f"- {cat}: {score}%")
        return "\n".join(lines)

    def _default_recommendations(self, compliance: float) -> List[dict]:
        recs = [
            {
                "title": "Implementar comité de privacidad",
                "description": "Establecer un comité interdisciplinario que supervise el cumplimiento de la Ley 1581.",
                "priority": "HIGH",
                "category": "Gobernanza",
            },
            {
                "title": "Actualizar política de tratamiento",
                "description": "Revisar y actualizar la política de tratamiento de datos personales según Decreto 1377.",
                "priority": "HIGH",
                "category": "Política de Datos",
            },
            {
                "title": "Implementar mecanismo de consentimiento",
                "description": "Desarrollar sistema de obtención de consentimiento expreso e informado.",
                "priority": "MEDIUM",
                "category": "Política de Datos",
            },
            {
                "title": "Establecer procedimiento ARCO",
                "description": "Documentar e implementar procedimientos para derechos ARCO de los titulares.",
                "priority": "MEDIUM",
                "category": "Derechos ARCO",
            },
            {
                "title": "Auditoría de seguridad periódica",
                "description": "Programar auditorías trimestrales de seguridad de la información.",
                "priority": "MEDIUM",
                "category": "Seguridad",
            },
        ]

        if compliance < 50:
            for r in recs:
                r["priority"] = "HIGH"

        return recs


openrouter_service = OpenRouterService()
