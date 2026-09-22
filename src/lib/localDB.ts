import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdmissionFormData } from './zodSchemas/admissionFormSchema';

const MY_ADMISSION_NUMBERS_KEY = 'my_admission_numbers'; // string[] — admission numbers submitted from THIS device
const STUDENTS_TABLE_KEY = 'students_table'; // Record<admissionNo, StudentRecord> — stands in for a real backend table until one exists

export type StudentRecord = AdmissionFormData & {
    admissionNo: string;
    schoolCode: string;
    feePaid: boolean;
};

export async function addMyAdmissionNumber(admissionNo: string) {
    const existing = await getMyAdmissionNumbers();
    if (existing.includes(admissionNo)) return;
    await AsyncStorage.setItem(
        MY_ADMISSION_NUMBERS_KEY,
        JSON.stringify([...existing, admissionNo]),
    );
}

export async function getMyAdmissionNumbers(): Promise<string[]> {
    const raw = await AsyncStorage.getItem(MY_ADMISSION_NUMBERS_KEY);
    return raw ? JSON.parse(raw) : [];
}

export async function saveStudentRecord(record: StudentRecord) {
    const table = await getStudentsTable();
    table[record.admissionNo] = record;
    await AsyncStorage.setItem(STUDENTS_TABLE_KEY, JSON.stringify(table));
}

export async function getStudentsTable(): Promise<Record<string, StudentRecord>> {
    const raw = await AsyncStorage.getItem(STUDENTS_TABLE_KEY);
    return raw ? JSON.parse(raw) : {};
}

export async function getMyAdmittedStudents(): Promise<StudentRecord[]> {
    const [numbers, table] = await Promise.all([getMyAdmissionNumbers(), getStudentsTable()]);
    return numbers.map((no) => table[no]).filter((r): r is StudentRecord => Boolean(r));
}