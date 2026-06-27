from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    type: str
    is_read: bool = False
    created_at: Optional[datetime] = None


class NotificationListResponse(BaseModel):
    notifications: List[NotificationResponse]
    unread_count: int
    total: int


class DashboardStats(BaseModel):
    total_evaluations: int = 0
    average_compliance: float = 0.0
    total_companies: int = 0
    total_breaches: int = 0
    pending_tasks: int = 0


class ComplianceByCategory(BaseModel):
    category: str
    percentage: float
    trend: Optional[str] = None


class RecentActivity(BaseModel):
    id: int
    action: str
    description: str
    date: Optional[datetime] = None
    user_name: Optional[str] = None
