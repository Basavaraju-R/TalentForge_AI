-- ==========================================
-- TALENTFORGE-AI FULL DATABASE SQL QUERIES
-- ==========================================
-- This file is for your reference to see how the database is structured in SQL!
-- (Django already executed these commands for us using SQLite)

-- 1. Create Users Table
CREATE TABLE "api_user" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" varchar(128) NOT NULL,
    "last_login" datetime NULL,
    "is_superuser" bool NOT NULL,
    "username" varchar(150) NOT NULL UNIQUE,
    "first_name" varchar(150) NOT NULL,
    "last_name" varchar(150) NOT NULL,
    "email" varchar(254) NOT NULL,
    "is_staff" bool NOT NULL,
    "is_active" bool NOT NULL,
    "date_joined" datetime NOT NULL,
    "role" varchar(20) NOT NULL
);

-- 2. Create Jobs Table
CREATE TABLE "api_job" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(255) NOT NULL,
    "company" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "location" varchar(255) NOT NULL,
    "created_at" datetime NOT NULL,
    "recruiter_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 3. Create Applications Table
CREATE TABLE "api_application" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" varchar(20) NOT NULL,
    "applied_at" datetime NOT NULL,
    "job_id" bigint NOT NULL REFERENCES "api_job" ("id") DEFERRABLE INITIALLY DEFERRED,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 4. Create Resumes Table
CREATE TABLE "api_resume" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_url" varchar(200) NOT NULL,
    "ats_score" integer NULL,
    "feedback" text NOT NULL,
    "uploaded_at" datetime NOT NULL,
    "student_id" bigint NOT NULL UNIQUE REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 5. Create Skills Table
CREATE TABLE "api_skill" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar(100) NOT NULL,
    "proficiency" varchar(50) NOT NULL,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 6. Create Roadmaps Table
CREATE TABLE "api_roadmap" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(255) NOT NULL,
    "content" text NOT NULL,
    "created_at" datetime NOT NULL,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 7. Create Interviews Table
CREATE TABLE "api_interview" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scheduled_at" datetime NOT NULL,
    "feedback" text NOT NULL,
    "score" integer NULL,
    "job_id" bigint NOT NULL REFERENCES "api_job" ("id") DEFERRABLE INITIALLY DEFERRED,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 8. Create Certificates Table
CREATE TABLE "api_certificate" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar(255) NOT NULL,
    "issuer" varchar(255) NOT NULL,
    "issued_on" date NOT NULL,
    "url" varchar(200) NOT NULL,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 9. Create Company Table
CREATE TABLE "api_company" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" varchar(255) NOT NULL,
    "website" varchar(200) NULL,
    "description" text NULL,
    "logo_url" varchar(200) NULL,
    "created_at" datetime NOT NULL
);

-- 10. Create Project Table
CREATE TABLE "api_project" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "github_link" varchar(200) NULL,
    "live_link" varchar(200) NULL,
    "created_at" datetime NOT NULL,
    "student_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 11. Create Message Table
CREATE TABLE "api_message" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" text NOT NULL,
    "timestamp" datetime NOT NULL,
    "is_read" bool NOT NULL,
    "receiver_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED,
    "sender_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 12. Create Notification Table
CREATE TABLE "api_notification" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" text NOT NULL,
    "link" varchar(255) NULL,
    "is_read" bool NOT NULL,
    "created_at" datetime NOT NULL,
    "user_id" bigint NOT NULL REFERENCES "api_user" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- 13. Create InterviewQuestion Table
CREATE TABLE "api_interviewquestion" (
    "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" text NOT NULL,
    "student_answer" text NULL,
    "ai_feedback" text NULL,
    "score" integer NULL,
    "interview_id" bigint NOT NULL REFERENCES "api_interview" ("id") DEFERRABLE INITIALLY DEFERRED
);

-- ==========================================
-- INSERTING DATA (SEEDING THE DATABASE)
-- ==========================================

-- Insert Users (Password hashes are generated by Django in reality, using 'pass123' as dummy hash here for illustration)
INSERT INTO "api_user" ("password", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "role") VALUES 
('dummy_hash', 0, 'student1', '', '', 'student1@example.com', 0, 1, '2026-09-21 09:00:00', 'student'),
('dummy_hash', 0, 'recruiter1', '', '', 'recruiter1@example.com', 0, 1, '2026-09-21 09:00:00', 'recruiter'),
('dummy_hash', 0, 'institution1', '', '', 'inst1@example.com', 0, 1, '2026-09-21 09:00:00', 'institution');

-- Insert Jobs
INSERT INTO "api_job" ("title", "company", "description", "location", "created_at", "recruiter_id") VALUES 
('Software Engineer Intern', 'Tech Corp', 'Work on cutting edge React and Django apps.', 'Remote', '2026-09-21 09:05:00', 2),
('Data Scientist', 'Data AI Inc.', 'Analyze large datasets using Python.', 'New York, NY', '2026-09-21 09:06:00', 2);

-- Insert Application
INSERT INTO "api_application" ("status", "applied_at", "job_id", "student_id") VALUES 
('screening', '2026-09-21 09:10:00', 1, 1);

-- Insert Resume
INSERT INTO "api_resume" ("file_url", "ats_score", "feedback", "uploaded_at", "student_id") VALUES 
('http://example.com/resume.pdf', 85, 'Great use of keywords. Add more metrics.', '2026-09-21 09:15:00', 1);

-- Insert Skills
INSERT INTO "api_skill" ("name", "proficiency", "student_id") VALUES 
('Python', 'Advanced', 1),
('React', 'Intermediate', 1);

-- Insert Roadmap
INSERT INTO "api_roadmap" ("title", "content", "created_at", "student_id") VALUES 
('Full Stack Developer Path', '1. Learn React (2 weeks)\n2. Learn Django (2 weeks)\n3. Build a project.', '2026-09-21 09:20:00', 1);

-- Insert Interview
INSERT INTO "api_interview" ("scheduled_at", "feedback", "score", "job_id", "student_id") VALUES 
('2026-09-23 10:00:00', '', NULL, 1, 1);

-- Insert Certificate
INSERT INTO "api_certificate" ("name", "issuer", "issued_on", "url", "student_id") VALUES 
('AWS Certified Cloud Practitioner', 'Amazon', '2026-09-21', 'http://aws.amazon.com/cert', 1);

-- Insert Company
INSERT INTO "api_company" ("name", "website", "description", "logo_url", "created_at") VALUES
('Tech Corp', 'https://techcorp.example.com', 'A leading technology company.', 'https://example.com/logo.png', '2026-09-21 17:00:00');

-- Insert Project
INSERT INTO "api_project" ("title", "description", "github_link", "live_link", "created_at", "student_id") VALUES
('TalentForge AI Clone', 'A full stack job portal built with React and Django.', 'https://github.com/example/talentforge', 'https://talentforge.example.com', '2026-09-21 17:00:00', 1);

-- Insert Message
INSERT INTO "api_message" ("content", "timestamp", "is_read", "receiver_id", "sender_id") VALUES
('Hi Student1, your resume looks great! Let us schedule a chat.', '2026-09-21 17:00:00', 0, 1, 2);

-- Insert Notification
INSERT INTO "api_notification" ("message", "link", "is_read", "created_at", "user_id") VALUES
('Your application for Software Engineer Intern has been moved to screening.', '/student/applications', 0, '2026-09-21 17:00:00', 1);

-- Insert InterviewQuestion
INSERT INTO "api_interviewquestion" ("question", "student_answer", "ai_feedback", "score", "interview_id") VALUES
('Can you explain how React hooks work?', 'React hooks are functions that let you use state and lifecycle features from function components.', 'Good answer. You accurately described the main purpose of hooks.', 90, 1);

