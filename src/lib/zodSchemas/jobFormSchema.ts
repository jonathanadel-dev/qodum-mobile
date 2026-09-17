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
const requiredMobile = requiredText.regex(MOBILE_PATTERN, MOBILE_MSG);

export const jobApplicationSchema = z.object({
    first_name: requiredName,
    middle_name: optionalName,
    last_name: requiredName,
    email: requiredText.email('Please enter a valid email address.'),
    mobile: requiredMobile,
    father_or_spouse_name: requiredName,
    address: requiredText,
    gender: z.enum(['Male', 'Female']),
    date_of_birth: z.date().max(new Date(), {
        message: 'Please enter a valid date of birth.',
    }),
    staff_type: requiredText,
    designation: requiredText,
    department: requiredText,
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;