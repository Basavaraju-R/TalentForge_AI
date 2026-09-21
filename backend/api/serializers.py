from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Job, Application, Resume, Skill, Roadmap, Interview, Certificate, Company, Project, Message, Notification, InterviewQuestion

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'bio']
        read_only_fields = ['id']

class JobSerializer(serializers.ModelSerializer):
    recruiter = UserSerializer(read_only=True)
    recruiter_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='recruiter'), source='recruiter', write_only=True
    )

    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'description', 'location', 'created_at', 'recruiter', 'recruiter_id']
        read_only_fields = ['id', 'created_at']

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), source='job', write_only=True
    )
    student = UserSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='student'), source='student', write_only=True
    )

    class Meta:
        model = Application
        fields = ['id', 'job', 'job_id', 'student', 'student_id', 'status', 'applied_at']
        read_only_fields = ['id', 'applied_at']

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class RoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = '__all__'

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class InterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewQuestion
        fields = '__all__'


