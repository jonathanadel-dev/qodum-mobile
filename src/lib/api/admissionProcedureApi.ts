
// Types
export type Step = {
    id: string;
    label: string;
    title: string;
    description: string;
    icon: any;
};


// Steps
export const STEPS: Step[] = [
    {
        id: '1',
        label: 'Step 01',
        title: 'Fill Admission Form',
        description:
            'Students must fill in their personal and academic details carefully using the application.',
        icon: 'document-text-outline',
    },
    {
        id: '2',
        label: 'Step 02',
        title: 'Receive Registration Number',
        description:
            'After successful submission, a unique Registration Number will be generated for future reference.',
        icon: 'checkmark-circle-outline',
    },
    {
        id: '3',
        label: 'Step 03',
        title: 'Track Application Status',
        description:
            'Using the registration number, students can track the real-time status of their admission application.',
        icon: 'search-outline',
    },
    {
        id: '4',
        label: 'Step 04',
        title: 'Download Admit Card',
        description:
            'Once the application is approved, students can download their admit card from the Download Admit Card section.',
        icon: 'download-outline',
    },
    {
        id: '5',
        label: 'Step 05',
        title: 'Appear for Examination',
        description:
            'Students must appear for the examination on the scheduled date and time as mentioned on the admit card.',
        icon: 'create-outline',
    },
];


// Get admission procedute steps
export const getAdmissionProcedureSteps = async () => {
    return STEPS;
}