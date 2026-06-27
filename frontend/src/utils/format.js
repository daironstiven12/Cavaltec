export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '0%';
  return `${Math.round(value)}%`;
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
};

export const getComplianceLevel = (percentage) => {
  if (percentage >= 90) return { label: 'Excelente', color: 'success' };
  if (percentage >= 70) return { label: 'Alto', color: 'info' };
  if (percentage >= 50) return { label: 'Medio', color: 'warning' };
  return { label: 'Bajo', color: 'danger' };
};

export const getRiskLevel = (level) => {
  const levels = {
    LOW: { label: 'Bajo', color: 'success' },
    MEDIUM: { label: 'Medio', color: 'warning' },
    HIGH: { label: 'Alto', color: 'danger' },
  };
  return levels[level] || { label: level, color: 'secondary' };
};

export const getStatusBadge = (status) => {
  const statuses = {
    DRAFT: { label: 'Borrador', variant: 'secondary' },
    IN_PROGRESS: { label: 'En progreso', variant: 'warning' },
    COMPLETED: { label: 'Completado', variant: 'success' },
    CANCELLED: { label: 'Cancelado', variant: 'danger' },
  };
  return statuses[status] || { label: status, variant: 'secondary' };
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateAvatarUrl = (name) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff`;
};
