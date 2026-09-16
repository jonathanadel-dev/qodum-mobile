import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from '../../../lib/toast';
import FormField from '../../../components/form/input/FormField';
import FormDateField from '../../../components/form/datePicker/FormDateField';
import FormSection from '../../../components/form/FormSection';
import SubmitButton from '../../../components/form/SubmitButton';
import Header from '../../../components/Header';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { jobApplicationSchema, JobApplicationFormData } from '../../../lib/zodSchemas/jobFormSchema';
import { formStyles as styles } from '../../../styles/common';
import { JobOpening } from '../../../lib/types/job';
import { fetchJobById } from '../../../lib/api/jobApi';
import { colors } from '../../../styles/theme';


// Job application form screen
export default function JobApplicationFormScreen({ navigation, route }: any) {

    const { jobId, schoolCode } = route.params;

    // Job lookup
    const [job, setJob] = useState<JobOpening | null>(null);
    const [loadingJob, setLoadingJob] = useState(true);

    useEffect(() => {
        let isActive = true;

        const loadJob = async () => {
            try {
                const result = await fetchJobById(jobId);

                if (!isActive) return;

                if (!result) {
                    toast.error('This job posting is no longer available.');
                    navigation.goBack();
                    return;
                }

                setJob(result);
            } catch {
                if (isActive) {
                    toast.error('Unable to load this job. Please try again.');
                    navigation.goBack();
                }
            } finally {
                if (isActive) setLoadingJob(false);
            }
        };

        loadJob();

        return () => {
            isActive = false;
        };
    }, [jobId]);


    // Form
    const defaultValues: JobApplicationFormData = {
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        mobile: '',
        father_or_spouse_name: '',
        address: '',
        gender: 'Male',
        date_of_birth: new Date(),
        staff_type: '',
        designation: '',
        department: '',
    };
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<JobApplicationFormData>({
        resolver: zodResolver(jobApplicationSchema),
        defaultValues,
    });


    // Submit handlers
    const onSubmit = async (data: JobApplicationFormData) => {
        try {
            await new Promise((resolve: any) => setTimeout(resolve, 1200));
            navigation.navigate('JobApplied');
        } catch {
            toast.error('Something went wrong. Please try again.');
        }
    };
    const onInvalid = () => {
        toast.error('Please correct the highlighted fields.');
    };

    if (loadingJob || !job) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* Status bar */}
            <CustomStatusBar />

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <Header navigation={navigation} title="Apply" />

                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.eyebrow}>JOB APPLICATION</Text>
                            <Text style={styles.title}>{job.title}</Text>
                            <Text style={styles.subtitle}>
                                Fill in your details to apply for this position.
                            </Text>
                        </View>
                    </View>

                    <FormSection
                        number="01"
                        title="Personal information"
                        description="Basic information about you."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="first_name" label="First name" placeholder="Enter first name" />
                        <FormField control={control} name="middle_name" label="Middle name" placeholder="Enter middle name (optional)" />
                        <FormField control={control} name="last_name" label="Last name" placeholder="Enter last name" />

                        <FormDateField control={control} name="date_of_birth" label="Date of birth" maximumDate={new Date()} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gender</Text>
                            <Controller
                                control={control}
                                name="gender"
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.genderContainer}>
                                        {(['Male', 'Female'] as const).map(gender => (
                                            <Pressable
                                                key={gender}
                                                style={[styles.genderOption, value === gender && styles.genderOptionActive]}
                                                onPress={() => onChange(gender)}
                                            >
                                                <View style={[styles.radio, value === gender && styles.radioActive]} />
                                                <Text style={[styles.genderText, value === gender && styles.genderTextActive]}>
                                                    {gender}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )}
                            />
                        </View>

                        <FormField control={control} name="father_or_spouse_name" label="Father's / spouse's name" placeholder="Enter full name" />
                        <FormField control={control} name="address" label="Address" placeholder="Enter residential address" multiline />
                        <FormField control={control} name="email" label="Email address" placeholder="you@example.com" keyboardType="email-address" />
                        <FormField control={control} name="mobile" label="Mobile number" placeholder="e.g. +201XXXXXXXXX" keyboardType="phone-pad" />
                    </FormSection>

                    <FormSection
                        number="02"
                        title="Position details"
                        description="Details about the role you're applying for."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="staff_type" label="Staff type" placeholder="e.g. Teaching / Non-teaching" />
                        <FormField control={control} name="designation" label="Designation" placeholder="Enter designation" />
                        <FormField control={control} name="department" label="Department" placeholder="Enter department" />
                    </FormSection>

                    <View style={styles.submitSection}>
                        <Text style={styles.submitHint}>
                            Please make sure all information is accurate before submitting.
                        </Text>
                        <SubmitButton
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit, onInvalid)}
                            label="Submit application"
                            loadingLabel="Submitting..."
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}