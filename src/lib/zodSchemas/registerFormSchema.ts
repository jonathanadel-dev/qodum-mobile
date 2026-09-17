import { z } from 'zod';
import { REQUIRED_MSG } from '../validationPatterns';

const requiredText = z.string().trim().min(1, REQUIRED_MSG);

export const registerSchema = z
    .object({
        admission_number: requiredText,
        password: requiredText.min(6, 'Password must be at least 6 characters.'),
        confirm_password: requiredText,
    })
    .refine(data => data.password === data.confirm_password, {
        message: "Passwords don't match.",
        path: ['confirm_password'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;