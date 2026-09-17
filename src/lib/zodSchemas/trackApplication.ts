import { z } from 'zod';
import { REQUIRED_MSG } from '../validationPatterns';

const requiredText = z.string().trim().min(1, REQUIRED_MSG);

export const trackApplicationSchema = z.object({
    registration_number: requiredText,
});

export type TrackApplicationFormData = z.infer<
    typeof trackApplicationSchema
>;