// lib/zodSchemas/loginFormSchema.ts

import { z } from 'zod';
import {
    REQUIRED_MSG,
} from '../validationPatterns';


const requiredText = z.string().trim().min(1, REQUIRED_MSG);


export const loginSchema = z.object({
    admission_number: requiredText,
    password: requiredText,
});


export type LoginFormData = z.infer<typeof loginSchema>;