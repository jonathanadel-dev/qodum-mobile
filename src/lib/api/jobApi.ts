import { JobOpening } from '../types/job';

export const MOCK_JOBS: JobOpening[] = [
    {
        id: '1',
        title: 'Mathematics Teacher',
        salary: '$800 - $1,200 / month',
        experience: '2+ years',
        applicationDeadline: 'September 30, 2026',
    },
    {
        id: '2',
        title: 'English Language Teacher',
        salary: '$750 - $1,100 / month',
        experience: '2+ years',
        applicationDeadline: 'October 5, 2026',
    },
    {
        id: '3',
        title: 'Primary School Teacher',
        salary: '$650 - $950 / month',
        experience: '1+ year',
        applicationDeadline: 'October 10, 2026',
    },
    {
        id: '4',
        title: 'School Accountant',
        salary: '$900 - $1,300 / month',
        experience: '3+ years',
        applicationDeadline: 'October 15, 2026',
    },
    {
        id: '5',
        title: 'IT Support Specialist',
        salary: '$850 - $1,250 / month',
        experience: '2+ years',
        applicationDeadline: 'October 20, 2026',
    },
];

export const fetchJobOpenings = async (): Promise<JobOpening[]> => {
    // TODO: replace with a real API request.
    await new Promise((resolve:any) => setTimeout(resolve, 800));

    return MOCK_JOBS;
};


export const fetchJobById = async (jobId: string): Promise<JobOpening | null> => {
    // TODO: replace with a real API request.
    await new Promise((resolve: any) => setTimeout(resolve, 700));
    return MOCK_JOBS.find(job => job.id === jobId) ?? null;
};