const API_BASE_URL = 'http://localhost:8000/api';

export const fetchJobs = async () => {
    // Read user profile to dynamically adjust match scores
    let userTitle = '';
    try {
        const profile = JSON.parse(localStorage.getItem('talentforge_profile') || '{}');
        userTitle = (profile.title || '').toLowerCase();
    } catch(e) {}

    const isFrontend = userTitle.includes('front') || userTitle.includes('react') || userTitle.includes('ui');
    const isBackend = userTitle.includes('back') || userTitle.includes('python') || userTitle.includes('node');

    const realJobs = [
        {
            id: 101,
            title: 'Senior Frontend Engineer',
            company: 'Google',
            logo: '🇬',
            location: 'Mountain View, CA (Hybrid)',
            salary: '₹45,00,000 - ₹60,00,000',
            experience: '4-6 Years',
            match: isFrontend ? 95 : 65
        },
        {
            id: 102,
            title: 'Software Development Engineer II',
            company: 'Amazon',
            logo: '🇦',
            location: 'Bengaluru, India (Remote)',
            salary: '₹35,00,000 - ₹50,00,000',
            experience: '3+ Years',
            match: isBackend ? 92 : 75
        },
        {
            id: 103,
            title: 'Full Stack Developer',
            company: 'Netflix',
            logo: '🇳',
            location: 'Remote',
            salary: '₹40,00,000 - ₹55,00,000',
            experience: '2-5 Years',
            match: (isFrontend || isBackend) ? 88 : 70
        },
        {
            id: 104,
            title: 'Data Scientist',
            company: 'Microsoft',
            logo: '🇲',
            location: 'Hyderabad, India',
            salary: '₹30,00,000 - ₹45,00,000',
            experience: '1-3 Years',
            match: userTitle.includes('data') ? 94 : 50
        },
        {
            id: 105,
            title: 'Staff Engineer (TalentForge PRO)',
            company: 'Meta',
            logo: '♾️',
            location: 'Menlo Park, CA (Remote)',
            salary: '$300,000 - $450,000',
            experience: '8+ Years',
            match: 99,
            isPremium: true
        },
        {
            id: 106,
            title: 'Lead AI Researcher (TalentForge PRO)',
            company: 'OpenAI',
            logo: '🧠',
            location: 'San Francisco, CA',
            salary: '$400,000 - $600,000',
            experience: '5+ Years',
            match: 98,
            isPremium: true
        }
    ];

    // Return our rich mock data instead of the empty backend
    return new Promise(resolve => {
        setTimeout(() => resolve(realJobs), 800);
    });
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
