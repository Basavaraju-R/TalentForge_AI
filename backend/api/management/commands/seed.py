from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from api.models import Job, Application, Resume, Skill, Roadmap, Interview, Certificate, Company, Project, Message, Notification, InterviewQuestion
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial mock data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # Create Users
        student1, _ = User.objects.get_or_create(username='student1', defaults={'email': 'student1@example.com', 'role': 'student'})
        if _: student1.set_password('pass123'); student1.save()

        recruiter1, _ = User.objects.get_or_create(username='recruiter1', defaults={'email': 'recruiter1@example.com', 'role': 'recruiter'})
        if _: recruiter1.set_password('pass123'); recruiter1.save()

        institution1, _ = User.objects.get_or_create(username='institution1', defaults={'email': 'inst1@example.com', 'role': 'institution'})
        if _: institution1.set_password('pass123'); institution1.save()

        # Create Jobs
        job1, _ = Job.objects.get_or_create(
            title='Software Engineer Intern',
            company='Tech Corp',
            defaults={
                'description': 'Work on cutting edge React and Django apps.',
                'location': 'Remote',
                'recruiter': recruiter1
            }
        )
        
        job2, _ = Job.objects.get_or_create(
            title='Data Scientist',
            company='Data AI Inc.',
            defaults={
                'description': 'Analyze large datasets using Python.',
                'location': 'New York, NY',
                'recruiter': recruiter1
            }
        )

        # Create Applications
        Application.objects.get_or_create(
            job=job1,
            student=student1,
            defaults={'status': 'screening'}
        )

        # Create Resume
        Resume.objects.get_or_create(
            student=student1,
            defaults={
                'file_url': 'http://example.com/resume.pdf',
                'ats_score': 85,
                'feedback': 'Great use of keywords. Add more metrics.'
            }
        )

        # Create Skills
        Skill.objects.get_or_create(student=student1, name='Python', defaults={'proficiency': 'Advanced'})
        Skill.objects.get_or_create(student=student1, name='React', defaults={'proficiency': 'Intermediate'})

        # Create Roadmap
        Roadmap.objects.get_or_create(
            student=student1,
            title='Full Stack Developer Path',
            defaults={
                'content': '1. Learn React (2 weeks)\n2. Learn Django (2 weeks)\n3. Build a project.'
            }
        )

        # Create Interview
        Interview.objects.get_or_create(
            student=student1,
            job=job1,
            defaults={
                'scheduled_at': timezone.now() + timedelta(days=2),
                'feedback': '',
                'score': None
            }
        )

        # Create Certificate
        Certificate.objects.get_or_create(
            student=student1,
            name='AWS Certified Cloud Practitioner',
            issuer='Amazon',
            defaults={
                'issued_on': timezone.now().date(),
                'url': 'http://aws.amazon.com/cert'
            }
        )

        # Create Company
        Company.objects.get_or_create(
            name='Tech Corp',
            defaults={
                'website': 'https://techcorp.example.com',
                'description': 'A leading technology company.',
                'logo_url': 'https://example.com/logo.png'
            }
        )

        # Create Project
        Project.objects.get_or_create(
            student=student1,
            title='TalentForge AI Clone',
            defaults={
                'description': 'A full stack job portal built with React and Django.',
                'github_link': 'https://github.com/example/talentforge',
                'live_link': 'https://talentforge.example.com'
            }
        )

        # Create Message
        Message.objects.get_or_create(
            sender=recruiter1,
            receiver=student1,
            content='Hi Student1, your resume looks great! Let us schedule a chat.'
        )

        # Create Notification
        Notification.objects.get_or_create(
            user=student1,
            message='Your application for Software Engineer Intern has been moved to screening.',
            defaults={'link': '/student/applications'}
        )

        # Create Interview Question
        interview1 = Interview.objects.filter(student=student1, job=job1).first()
        if interview1:
            InterviewQuestion.objects.get_or_create(
                interview=interview1,
                question='Can you explain how React hooks work?',
                defaults={
                    'student_answer': 'React hooks are functions that let you use state and lifecycle features from function components.',
                    'ai_feedback': 'Good answer. You accurately described the main purpose of hooks.',
                    'score': 90
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))
