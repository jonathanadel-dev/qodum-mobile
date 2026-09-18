// Type
export type JobType = {
    id: string;
    schoolCode: string;
    title: string;
    classRange: string;
    employmentType: 'Full-Time' | 'Part-Time';
    experience: string;
    description: string;
    postedDaysAgo: number;
    openings: number;
    salary: string;
    applicationDeadline: string;
};


// Mock data
export const MOCK_JOBS: JobType[] = [
    {
        id: '1',
        schoolCode: 'QDM001',
        title: 'Mathematics Teacher',
        classRange: 'Class 6-10',
        employmentType: 'Full-Time',
        experience: '0-3 Yrs',
        description:
`We are looking for a Social Studies Teacher with a passion for teaching and a B.Ed. qualification. We welcome those with prior teaching experience, preferably in the CBSE board. The ideal candidate will create an engaging, student-centered classroom environment.

- Prepare structured lesson plans and worksheets.
- Conduct interactive classroom sessions.
- Track academic progress and maintain records.
- Collaborate with subject teachers for syllabus planning.
- Prepare students for periodic and annual assessments.`,
        postedDaysAgo: 2,
        openings: 3,
        salary: '₹20,000 - ₹30,000',
        applicationDeadline: '28/12/2025',
    },
    {
        id: '2',
        schoolCode: 'QDM001',
        title: 'Physics Teacher',
        classRange: 'Class 9-12',
        employmentType: 'Full-Time',
        experience: '2-5 Yrs',
        description:
`We are hiring a Physics Teacher who can bring practical, lab-based learning to senior students.

- Plan and deliver lab-based physics lessons.
- Prepare students for board examinations.
- Maintain lab equipment and safety standards.`,
        postedDaysAgo: 5,
        openings: 3,
        salary: '₹22,000 - ₹32,000',
        applicationDeadline: '05/01/2026',
    },
    {
        id: '3',
        schoolCode: 'QDM001',
        title: 'Chemistry Lab Assistant',
        classRange: 'Lab Support',
        employmentType: 'Part-Time',
        experience: '1-2 Yrs',
        description:
`We are seeking a Chemistry Lab Assistant to prepare materials and support practical sessions.

- Prepare reagents and equipment before sessions.
- Assist teachers during practical classes.
- Maintain inventory of lab materials.`,
        postedDaysAgo: 1,
        openings: 3,
        salary: '₹15,000 - ₹20,000',
        applicationDeadline: '10/01/2026',
    },
    {
        id: '4',
        schoolCode: 'QDM001',
        title: 'Economics Teacher',
        classRange: 'Class 11-12',
        employmentType: 'Full-Time',
        experience: '3-5 Yrs',
        description:
`We are looking for an experienced Economics Teacher to guide students through the senior curriculum.

- Deliver structured lessons aligned with the board syllabus.
- Set and grade periodic assessments.
- Mentor students on career pathways in economics.`,
        postedDaysAgo: 4,
        openings: 2,
        salary: '₹25,000 - ₹35,000',
        applicationDeadline: '15/01/2026',
    },
];


// Fetch jobs
export const fetchJobOpenings = async (schoolCode: string): Promise<JobType[]> => {
    await new Promise((resolve: any) => setTimeout(resolve, 800));
    return MOCK_JOBS;
};


// Fetch job by id
export const fetchJobById = async (jobId: string): Promise<JobType | null> => {
    await new Promise((resolve: any) => setTimeout(resolve, 700));
    return MOCK_JOBS.find(job => job.id === jobId) ?? null;
};


// Job apply
export const jobApply = async (data: any) => {
    // Job apply api
}