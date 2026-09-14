import { z } from 'zod';
import {
    NAME_PATTERN,
    MOBILE_PATTERN,
    INCOME_PATTERN,
    REQUIRED_MSG,
    NAME_MSG,
    MOBILE_MSG,
    INCOME_MSG,
} from '../lib/validationPatterns';

const requiredName = z
    .string()
    .trim()
    .min(1, REQUIRED_MSG)
    .regex(NAME_PATTERN, NAME_MSG);

const optionalName = z
    .string()
    .trim()
    .regex(NAME_PATTERN, NAME_MSG)
    .optional()
    .or(z.literal(''));

const requiredText = z.string().trim().min(1, REQUIRED_MSG);

const requiredMobile = requiredText.regex(MOBILE_PATTERN, MOBILE_MSG);
const requiredIncome = requiredText.regex(INCOME_PATTERN, INCOME_MSG);

export const admissionSchema = z.object({
    image: requiredText.refine(v => v.length > 0, {
        message: 'Please select a profile photo.',
    }),

    name: requiredName,
    middle_name: optionalName,
    last_name: requiredName,
    date_of_birth: z.date().max(new Date(), {
        message: 'Please enter a valid date of birth.',
    }),
    class_name: requiredText,
    gender: z.enum(['Male', 'Female']),
    email: requiredText.email('Please enter a valid email address.'),
    address: requiredText,
    city: requiredText,
    state: requiredText,

    last_school_name: requiredText,
    last_class: requiredText,

    father_name: requiredName,
    father_occupation: requiredText,
    father_annual_income: requiredIncome,
    father_mobile: requiredMobile,

    mother_name: requiredName,
    mother_occupation: requiredText,
    mother_annual_income: requiredIncome,
    mother_mobile: requiredMobile,
});

export type AdmissionFormData = z.infer<typeof admissionSchema>;