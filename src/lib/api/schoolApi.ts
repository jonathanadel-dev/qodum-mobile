// Type
export type SchoolType = {
    id: string;
    name: string;
    code: string;
};


// Mock data
const MOCK_SCHOOLS: SchoolType[] = [
    { id: '1', name: 'Qodum International School', code: 'QDM001' },
    { id: '2', name: 'Al-Nahda Modern School', code: 'NHD245' },
    { id: '3', name: 'Future Leaders School', code: 'FLS102' },
    { id: '4', name: 'Cairo Modern Academy', code: 'CMA321' },
    { id: '5', name: 'Nile Valley School', code: 'NVS456' },
];


// Verify code
export const verifySchoolCode = async (code: string): Promise<SchoolType | null> => {
    await new Promise((resolve: any) => setTimeout(resolve, 1000));
    return MOCK_SCHOOLS.find(item => item.code === code) ?? null;
};


// Get school
export const getSchools = async () => {
    // TODO: replace with a real API request.
    await new Promise((resolve: any) => setTimeout(resolve, 700));

    // const normalizedQuery = query.trim().toLowerCase();
    // if (!normalizedQuery) return [];

    // return MOCK_SCHOOLS.filter(school =>
    //     school.name.toLowerCase().includes(normalizedQuery),
    // );

    return MOCK_SCHOOLS;
};