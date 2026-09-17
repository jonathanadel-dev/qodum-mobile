import React from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibrary } from 'react-native-image-picker';

import toast from '../../../lib/toast';
import FormField from '../../../components/form/input/FormField';
import FormSection from '../../../components/form/FormSection';
import SubmitButton from '../../../components/form/SubmitButton';
import { alumniSchema, AlumniFormData } from '../../../lib/zodSchemas/alumniFormSchema';
import { formStyles as styles } from '../../../styles/common';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Header from '../../../components/Header';
import { addAlumni } from '../../../lib/api/alumniApi';


// Alumni form screen
export default function AlumniFormScreen({ navigation }: any) {

    // Form
    const defaultValues: AlumniFormData = {
        image: '',
        name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone: '',
        graduation_year: '',
        last_class: '',
        current_occupation: '',
        company_name: '',
        city: '',
        country: '',
        linkedin_url: '',
        message: '',
    };
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = useForm<AlumniFormData>({
        resolver: zodResolver(alumniSchema),
        defaultValues,
    });


    // Image
    const image = watch('image');
    const selectImage = async () => {
        const response = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 0.8,
        });

        if (response.didCancel) return;

        if (response.errorCode) {
            toast.error(response.errorMessage || 'Unable to select the image.');
            return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
            setValue('image', uri, { shouldValidate: true });
        }
    };
    const removeImage = () => setValue('image', '', { shouldValidate: true });


    // Submit handlers
    const onSubmit = async (data: AlumniFormData) => {
        try {
            await addAlumni(data);
            navigation.navigate('AlumniAdded');
        } catch {
            toast.error('Something went wrong. Please try again.');
        }
    };
    const onInvalid = () => {
        toast.error('Please correct the highlighted fields.');
    };

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
                    <Header navigation={navigation}  />

                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.eyebrow}>ALUMNI NETWORK</Text>
                            <Text style={styles.title}>Join the Alumni Network</Text>
                            <Text style={styles.subtitle}>
                                Reconnect with your school and fellow graduates.
                            </Text>
                        </View>
                    </View>

                    <FormSection
                        number="01"
                        title="Personal information"
                        description="Basic information about you."
                        style={styles.sectionCard}
                    >
                        <View style={styles.photoSection}>
                            <View>
                                <Pressable style={styles.photo} onPress={selectImage}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={styles.photoImage} />
                                    ) : (
                                        <>
                                            <Text style={styles.photoIcon}>+</Text>
                                            <Text style={styles.photoText}>Add photo</Text>
                                        </>
                                    )}
                                </Pressable>

                                {image && (
                                    <Pressable style={styles.removePhotoButton} onPress={removeImage}>
                                        <Text style={styles.removePhotoText}>Remove</Text>
                                    </Pressable>
                                )}
                            </View>

                            <View style={styles.photoDescription}>
                                <Text style={styles.photoTitle}>Profile photo</Text>
                                <Text style={styles.photoHint}>Optional — helps other alumni recognize you.</Text>
                            </View>
                        </View>

                        <FormField control={control} name="name" label="First name" placeholder="Enter first name" />
                        <FormField control={control} name="middle_name" label="Middle name" placeholder="Enter middle name (optional)" />
                        <FormField control={control} name="last_name" label="Last name" placeholder="Enter last name" />

                        <FormField control={control} name="email" label="Email address" placeholder="you@example.com" keyboardType="email-address" />
                        <FormField control={control} name="phone" label="Mobile number" placeholder="e.g. +201XXXXXXXXX" keyboardType="phone-pad" />
                    </FormSection>

                    <FormSection
                        number="02"
                        title="Education background"
                        description="Tell us about your time at the school."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="last_class" label="Last class attended" placeholder="e.g. Grade 12" />
                        <FormField control={control} name="graduation_year" label="Graduation year" placeholder="e.g. 2018" keyboardType="numeric" />
                    </FormSection>

                    <FormSection
                        number="03"
                        title="Current details"
                        description="What you're up to now."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="current_occupation" label="Current occupation" placeholder="e.g. Software Engineer" />
                        <FormField control={control} name="company_name" label="Company / organization" placeholder="Enter company name (optional)" />

                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <FormField control={control} name="city" label="City" placeholder="City" />
                            </View>
                            <View style={styles.halfInput}>
                                <FormField control={control} name="country" label="Country" placeholder="Country" />
                            </View>
                        </View>

                        <FormField
                            control={control}
                            name="linkedin_url"
                            label="LinkedIn profile"
                            placeholder="https://linkedin.com/in/... (optional)"
                            keyboardType="url"
                            autoCapitalize="none"
                        />
                    </FormSection>

                    <FormSection
                        number="04"
                        title="Anything else?"
                        description="Optional — share a message with the alumni team."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="message" label="Message" placeholder="Write a short message (optional)" multiline />
                    </FormSection>

                    <View style={styles.submitSection}>
                        <Text style={styles.submitHint}>
                            Please make sure all information is accurate before submitting.
                        </Text>
                        <SubmitButton
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit, onInvalid)}
                            label="Join alumni network"
                            loadingLabel="Submitting..."
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}