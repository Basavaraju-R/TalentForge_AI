from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    UserViewSet, JobViewSet, ApplicationViewSet,
    ResumeViewSet, SkillViewSet, RoadmapViewSet,
    InterviewViewSet, CertificateViewSet,
    CompanyViewSet, ProjectViewSet, MessageViewSet,
    NotificationViewSet, InterviewQuestionViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'resumes', ResumeViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'roadmaps', RoadmapViewSet)
router.register(r'interviews', InterviewViewSet)
router.register(r'certificates', CertificateViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'interview-questions', InterviewQuestionViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
