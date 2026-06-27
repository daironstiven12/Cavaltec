export const ROLES = {
  ADMIN: 'Administrador',
  COMPANY: 'Administrador Empresa',
  AUDITOR: 'Auditor',
  VIEWER: 'Consultor',
};

export const ROLE_COLORS = {
  Administrador: 'danger',
  'Administrador Empresa': 'primary',
  Auditor: 'warning',
  Consultor: 'info',
};

export const ASSESSMENT_STATUS = {
  DRAFT: { label: 'Borrador', color: 'secondary', icon: 'FiFileText' },
  IN_PROGRESS: { label: 'En progreso', color: 'warning', icon: 'FiClock' },
  COMPLETED: { label: 'Completado', color: 'success', icon: 'FiCheckCircle' },
  CANCELLED: { label: 'Cancelado', color: 'danger', icon: 'FiXCircle' },
};

export const COMPLIANCE_LEVELS = {
  CRITICAL: { label: 'Crítico', color: 'danger', min: 0, max: 25 },
  LOW: { label: 'Bajo', color: 'warning', min: 25, max: 50 },
  MEDIUM: { label: 'Medio', color: 'info', min: 50, max: 70 },
  HIGH: { label: 'Alto', color: 'primary', min: 70, max: 90 },
  EXCELLENT: { label: 'Excelente', color: 'success', min: 90, max: 100 },
};

export const RISK_LEVELS = {
  LOW: { label: 'Bajo', color: 'success' },
  MEDIUM: { label: 'Medio', color: 'warning' },
  HIGH: { label: 'Alto', color: 'danger' },
};

export const CATEGORIES = {
  1: { name: 'Política de Datos', color: '#1e3a5f', weight: 35 },
  2: { name: 'Privacidad desde el Diseño', color: '#2563eb', weight: 30 },
  3: { name: 'Gobernanza', color: '#7c3aed', weight: 25 },
  4: { name: 'Seguridad', color: '#059669', weight: 10 },
};

export const COMPANY_SIZES = {
  MICRO: 'Micro (< 10 empleados)',
  SMALL: 'Pequeña (10-50 empleados)',
  MEDIUM: 'Mediana (51-250 empleados)',
  LARGE: 'Grande (> 250 empleados)',
};

export const NOTIFICATION_TYPES = {
  assessment: { label: 'Evaluación', color: 'primary', icon: 'FiClipboard' },
  user: { label: 'Usuario', color: 'info', icon: 'FiUser' },
  alert: { label: 'Alerta', color: 'danger', icon: 'FiAlertTriangle' },
  report: { label: 'Reporte', color: 'success', icon: 'FiFileText' },
  ai: { label: 'IA', color: 'purple', icon: 'FiCpu' },
  system: { label: 'Sistema', color: 'secondary', icon: 'FiSettings' },
};

export const PRIORITY_LEVELS = {
  HIGH: { label: 'Alta', color: 'danger' },
  MEDIUM: { label: 'Media', color: 'warning' },
  LOW: { label: 'Baja', color: 'info' },
};

export const QUICK_PROMPTS = [
  '¿Qué dice la Ley 1581 sobre el consentimiento?',
  'Recomendaciones para mejorar cumplimiento',
  'Analizar brechas de seguridad',
  'Generar plan de acción prioritario',
  'Explicar derechos ARCO',
];
