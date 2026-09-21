const API_BASE_URL = 'http://localhost:8000/api';

export const fetchJobs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return await response.json();
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};

export const fetchApplications = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        return await response.json();
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
};

// Add more functions as needed for Resumes, Skills, Roadmaps, etc.

export const saveInterview = async (interviewData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/interviews/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interviewData),
        });
        if (!response.ok) throw new Error('Failed to save interview results');
        return await response.json();
    } catch (error) {
        console.error('Error saving interview results:', error);
        throw error;
    }
};
