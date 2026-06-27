# CAVALTEC - Plataforma de Cumplimiento Ley 1581

Plataforma web para la gestión de cumplimiento de la **Ley 1581 de 2012** (Protección de Datos Personales) y el **Decreto 1377 de 2017** en Colombia.

## Descripción

CAVALTEC permite a las empresas colombianas evaluar, monitorear y mejorar su cumplimiento normativo en materia de protección de datos personales. Incluye un asistente de IA basado en OpenRouter que responde exclusivamente sobre temas de cumplimiento.

## Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│    MySQL 8.0    │
│   React + Vite  │     │   FastAPI       │     │                 │
│   :5174         │     │   :8000         │     │   :3310         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   OpenRouter AI  │
                        │   Gemma 4 26B   │
                        └─────────────────┘
```

## Stack Tecnológico

### Frontend
- **React 19** - Framework de UI
- **Vite 8** - Build tool y dev server
- **React Router 7** - Enrutamiento SPA
- **Recharts** - Gráficos (AreaChart, BarChart, RadialBarChart)
- **Axios** - Cliente HTTP
- **React Icons** - Iconografía

### Backend
- **FastAPI** - Framework web async
- **SQLAlchemy 2.0** - ORM con async support
- **Pydantic** - Validación de schemas
- **Passlib + Argon2** - Hashing de contraseñas
- **PyJWT** - Autenticación JWT

### Base de Datos
- **MySQL 8.0** - Base de datos relacional
- **Docker Compose** - Orquestación de servicios

### IA
- **OpenRouter API** - Gateway de modelos de IA
- **Google Gemma 4 26B** - Modelo gratuito para chat de cumplimiento

## Credenciales de Demostración

| Rol | Email | Contraseña | Permisos |
|-----|-------|------------|----------|
| Super Admin | admin@cavaltec.com | Admin123! | Acceso completo al sistema |
| Admin Empresa | maria.gomez@segurdata.com | Empresa123! | Gestión de su empresa |
| Auditor | carlos.rodriguez@cavaltec.com | Auditor123! | Revisión de evaluaciones |
| Consultor | ana.martinez@cavaltec.com | Consultor123! | Consultoría externa |

## Módulos

### Admin (Super Admin)
- **Dashboard** - Vista global: estadísticas, gráficos de tendencia, recomendaciones IA
- **Empresas** - Gestión CRUD de empresas registradas
- **Usuarios** - Administración de usuarios y roles
- **Cuestionarios** - Gestión de cuestionarios de evaluación
- **Preguntas** - Banco de preguntas por categoría
- **Versiones** - Control de versiones de cuestionarios
- **Evaluaciones** - Historial de todas las evaluaciones
- **Reportes** - Generación y descarga de reportes
- **Panel IA** - Asistente de IA para cumplimiento normativo
- **Auditoría** - Logs de actividad del sistema
- **Configuración** - Parámetros del sistema

### Admin Empresa
- **Dashboard** - Estadísticas de su empresa, evolución de cumplimiento, asistente IA
- **Nueva Evaluación** - Iniciar evaluación de cumplimiento
- **Mis Evaluaciones** - Historial de evaluaciones de la empresa
- **Resultados** - Resultados detallados con gráficos Recharts
- **Reportes** - Reportes específicos de la empresa
- **Asistente IA** - Chat de IA especializado
- **Mi Empresa** - Datos de la empresa
- **Usuarios** - Gestión de usuarios de la empresa

### Auditor
- **Dashboard** - Vista global de auditorías, cumplimiento por empresa
- **Evaluaciones** - Evaluaciones asignadas para auditoría
- **Resultados** - Resultados con análisis de cumplimiento
- **Reportes** - Reportes de auditoría

### Consultor
- Acceso similar a Admin Empresa con permisos limitados

## Funcionalidades Clave

### Asistente de IA
- Responde **exclusivamente** sobre temas de cumplimiento:
  - Ley 1581 de 2012
  - Decreto 1377 de 2017
  - Derechos ARCO
  - Privacidad desde el Diseño (PbD)
  - Gobernanza de datos
  - Seguridad de la información
  - Notificación de brechas
  - Consentimiento
  - Transferencias internacionales
- Redirige preguntas fuera de tema

### Evaluaciones
- Cuestionario con 20 preguntas organizadas en 4 categorías:
  - Política de Datos (35%)
  - Privacidad desde el Diseño (25%)
  - Gobernanza (20%)
  - Seguridad (20%)
- Navegación por teclado (← → navegar, 1-4 seleccionar)
- Barra de progreso con dots clickeables
- Estimación de tiempo restante

### UI/UX
- Tema oscuro/claro con toggle
- Breadcrumbs dinámicos
- Navegación inferior móvil
- Transiciones de página suaves
- Skeleton loading states
- Toast notifications
- Skip links para accesibilidad
- Focus visible para navegación por teclado

## Endpoints API (44)

### Autenticación
- `POST /auth/register` - Registro de empresa y usuario
- `POST /auth/login` - Inicio de sesión
- `POST /auth/refresh` - Renovar token
- `POST /auth/logout` - Cerrar sesión
- `GET /auth/me` - Usuario autenticado

### Empresas
- `GET /companies/` - Listar empresas
- `GET /companies/{id}` - Detalle de empresa
- `POST /companies/` - Crear empresa
- `PUT /companies/{id}` - Actualizar empresa
- `DELETE /companies/{id}` - Eliminar empresa
- `GET /companies/{id}/stats` - Estadísticas de empresa

### Usuarios
- `GET /users/` - Listar usuarios
- `GET /users/{id}` - Detalle de usuario
- `POST /users/` - Crear usuario
- `PUT /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

### Evaluaciones
- `GET /assessments/` - Listar evaluaciones
- `GET /assessments/{id}` - Detalle de evaluación
- `POST /assessments/` - Crear evaluación
- `PUT /assessments/{id}` - Actualizar evaluación
- `DELETE /assessments/{id}` - Eliminar evaluación
- `GET /assessments/{id}/results` - Resultados
- `GET /assessments/{id}/categories` - Resultados por categoría
- `POST /assessments/{id}/answers` - Guardar respuestas
- `PATCH /assessments/{id}/complete` - Completar evaluación

### Preguntas
- `GET /questions/questionnaires` - Listar cuestionarios
- `GET /questions/questionnaires/{id}` - Detalle de cuestionario
- `POST /questions/questionnaires` - Crear cuestionario
- `PUT /questions/questionnaires/{id}` - Actualizar cuestionario
- `GET /questions/versions/{id}/categories` - Categorías de versión
- `GET /questions/categories/{id}/questions` - Preguntas por categoría
- `POST /questions/questions` - Crear pregunta
- `PUT /questions/questions/{id}` - Actualizar pregunta

### IA
- `POST /ai/chat` - Chat con IA
- `GET /ai/conversations` - Historial de conversaciones
- `GET /ai/conversations/{id}` - Detalle de conversación
- `GET /ai/recommendations` - Recomendaciones de IA

### Dashboard
- `GET /dashboard/admin` - Estadísticas admin
- `GET /dashboard/company/{id}` - Estadísticas empresa
- `GET /dashboard/auditor` - Estadísticas auditor
- `GET /dashboard/compliance-by-category` - Cumplimiento por categoría
- `GET /dashboard/recent-activity` - Actividad reciente

### Reportes
- `GET /reports/` - Listar reportes
- `GET /reports/{id}` - Detalle de reporte
- `GET /reports/{id}/download` - Descargar reporte
- `POST /reports/generate/{assessmentId}` - Generar reporte

## Instalación y Ejecución

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo frontend)

### Iniciar servicios
```bash
cd backend
docker-compose up -d
```

### Frontend (desarrollo)
```bash
cd frontend
npm install
npm run dev
```

### Acceso
- Frontend: http://localhost:5174
- Backend API: http://localhost:8000
- phpMyAdmin: http://localhost:8080
- API Docs: http://localhost:8000/docs

## Despliegue

### Frontend (Vite)
```bash
cd frontend
npm run build
# Los archivos estáticos se generan en dist/
```

### Backend
El backend está containerizado con Docker y puede desplegarse en cualquier plataforma que soporte contenedores.

## Base de Datos

### Tablas
- `users` - Usuarios del sistema
- `companies` - Empresas registradas
- `roles` - Roles del sistema (Administrador, Administrador Empresa, Auditor, Consultor)
- `permissions` - Permisos del sistema
- `role_permissions` - Relación roles-permisos
- `questionnaires` - Cuestionarios
- `questionnaire_versions` - Versiones de cuestionarios
- `question_categories` - Categorías de preguntas
- `questions` - Preguntas del cuestionario
- `question_options` - Opciones de respuesta
- `assessments` - Evaluaciones realizadas
- `assessment_answers` - Respuestas de evaluaciones
- `assessment_results` - Resultados de evaluaciones
- `category_results` - Resultados por categoría
- `ai_conversations` - Conversaciones con IA
- `ai_recommendations` - Recomendaciones de IA
- `audit_logs` - Logs de auditoría
- `notifications` - Notificaciones

## Licencia

Proyecto desarrollado para el Hackathon de Medellín 2026.
