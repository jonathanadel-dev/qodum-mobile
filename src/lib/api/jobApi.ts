// Type
export type JobType = {
    id: string;
    schoolCode: string;
    title: string;
    salary: string;
    experience: string;
    description?: string;
    applicationDeadline: string;
};


// Mock data
export const MOCK_JOBS: JobType[] = [
    {
        id: '1',
        schoolCode:'QDM001',
        title: 'Mathematics Teacher',
        salary: '$800 - $1,200 / month',
        experience: '2+ years',
        applicationDeadline: 'September 30, 2026',
    },
    {
        id: '2',
        schoolCode:'NHD245',
        title: 'English Language Teacher',
        salary: '$750 - $1,100 / month',
        experience: '2+ years',
        applicationDeadline: 'October 5, 2026',
    },
    {
        id: '3',
        schoolCode:'FLS102',
        title: 'Primary School Teacher',
        salary: '$650 - $950 / month',
        experience: '1+ year',
        applicationDeadline: 'October 10, 2026',
    },
    {
        id: '4',
        schoolCode:'FLS102',
        title: 'School Accountant',
        salary: '$900 - $1,300 / month',
        experience: '3+ years',
        applicationDeadline: 'October 15, 2026',
    },
    {
        id: '5',
        schoolCode:'CMA321',
        title: 'IT Support Specialist',
        salary: '$850 - $1,250 / month',
        experience: '2+ years',
        applicationDeadline: 'October 20, 2026',
    },
];


// Fetch jobs
export const fetchJobOpenings = async (schoolCode: string): Promise<JobType[]> => {
    await new Promise((resolve:any) => setTimeout(resolve, 800));
    return MOCK_JOBS;
};


// Fetch job by id
export const fetchJobById = async (jobId: string): Promise<JobType | null> => {
    await new Promise((resolve: any) => setTimeout(resolve, 700));
    return MOCK_JOBS.find(job => job.id === jobId) ?? null;
};


// Job apply
export const jobApply = async (data:any) => {
    // Job apply api
}