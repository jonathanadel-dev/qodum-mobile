import { z } from 'zod';
import {
    NAME_PATTERN,
    MOBILE_PATTERN,
    REQUIRED_MSG,
    NAME_MSG,
    MOBILE_MSG,
} from '../validationPatterns';

const requiredName = z.string().trim().min(1, REQUIRED_MSG).regex(NAME_PATTERN, NAME_MSG);
const optionalName = z.string().trim().regex(NAME_PATTERN, NAME_MSG).optional().or(z.literal(''));
const requiredText = z.string().trim().min(1, REQUIRED_MSG);
const optionalText = z.string().trim().optional().or(z.literal(''));
const requiredMobile = requiredText.regex(MOBILE_PATTERN, MOBILE_MSG);

const currentYear = new Date().getFullYear();
const YEAR_PATTERN = /^(19|20)\d{2}$/;

export const alumniSchema = z.object({
    image: optionalText,

    name: requiredName,
    middle_name: optionalName,
    last_name: requiredName,
    email: requiredText.email('Please enter a valid email address.'),
    phone: requiredMobile,

    graduation_year: requiredText
        .regex(YEAR_PATTERN, 'Please enter a valid 4-digit year.')
        .refine(value => Number(value) <= currentYear, {
            message: 'Graduation year cannot be in the future.',
        }),
    last_class: requiredText,

    current_occupation: requiredText,
    company_name: optionalText,
    city: requiredText,
    country: requiredText,
    linkedin_url: z
        .string()
        .trim()
        .url('Please enter a valid URL.')
        .optional()
        .or(z.literal('')),

    message: optionalText,
});

export type AlumniFormData = z.infer<typeof alumniSchema>;