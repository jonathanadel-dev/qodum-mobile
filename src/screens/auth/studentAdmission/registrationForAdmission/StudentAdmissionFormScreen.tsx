import React from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibrary } from 'react-native-image-picker';

import toast from '../../../../lib/toast';
import FormField from '../../../../components/form/input/FormField';
import FormDateField from '../../../../components/form/datePicker/FormDateField';
import FormSection from '../../../../components/form/FormSection';
import SubmitButton from '../../../../components/Button';
import { admissionSchema, AdmissionFormData } from '../../../../lib/zodSchemas/admissionFormSchema';
import { formStyles as styles } from '../../../../styles/common';
import CustomStatusBar from '../../../../components/CustomStatusBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../navigation/AuthStack';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'StudentAdmissionForm'>;


// Student admission form screen
export default function StudentAdmissionFormScreen({ navigation, route }: Props) {

    // Form
    const {schoolCode} = route.params;
    const defaultValues: AdmissionFormData = {
        image: '',
        name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: new Date(),
        class_name: '',
        gender: 'Male',
        email: '',
        address: '',
        city: '',
        state: '',
        last_school_name: '',
        last_class: '',
        father_name: '',
        father_occupation: '',
        father_annual_income: '',
        father_mobile: '',
        mother_name: '',
        mother_occupation: '',
        mother_annual_income: '',
        mother_mobile: '',
    };
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AdmissionFormData>({
        resolver: zodResolver(admissionSchema),
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
    const onSubmit = async (data: AdmissionFormData) => {
        try {
            await new Promise((resolve:any) => setTimeout(resolve, 1200));
            navigation.navigate('StudentAdmitted', {schoolCode})
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
            <Header navigation={navigation} title="New Admission"/>

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
                    <View style={styles.header}>

                        <View style={styles.headerText}>
                            <Text style={styles.eyebrow}>STUDENT ADMISSION</Text>
                            <Text style={styles.title}>Admission Application</Text>
                            <Text style={styles.subtitle}>
                                Tell us about yourself and your educational background.
                            </Text>
                        </View>
                    </View>

                    <FormSection
                        number="01"
                        title="Personal information"
                        description="Basic information about the student."
                        style={styles.sectionCard}
                    >
                        <View style={styles.photoSection}>
                            <View>
                                <Pressable
                                    style={[styles.photo, errors.image && styles.photoError]}
                                    onPress={selectImage}
                                >
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
                                <Text style={styles.photoHint}>Choose a clear photo of the student.</Text>
                                {errors.image && (
                                    <Text style={styles.errorText}>{errors.image.message}</Text>
                                )}
                            </View>
                        </View>

                        <FormField control={control} name="name" label="First name" placeholder="Enter first name" />
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

                        <FormField control={control} name="email" label="Email address" placeholder="student@example.com" keyboardType="email-address" />
                        <FormField control={control} name="address" label="Address" placeholder="Enter residential address" multiline />

                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <FormField control={control} name="city" label="City" placeholder="City" />
                            </View>
                            <View style={styles.halfInput}>
                                <FormField control={control} name="state" label="State" placeholder="State" />
                            </View>
                        </View>
                    </FormSection>

                    <FormSection
                        number="02"
                        title="Education"
                        description="Tell us about your previous school."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="last_school_name" label="Last school attended" placeholder="Enter school name" />
                        <FormField control={control} name="last_class" label="Last class completed" placeholder="e.g. Grade 8" />
                        <FormField control={control} name="class_name" label="Applying for" placeholder="e.g. Grade 9" />
                    </FormSection>

                    <FormSection
                        number="03"
                        title="Father / guardian"
                        description="Parent or guardian information."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="father_name" label="Full name" placeholder="Enter full name" />
                        <FormField control={control} name="father_occupation" label="Occupation" placeholder="Enter occupation" />
                        <FormField control={control} name="father_annual_income" label="Annual income" placeholder="Enter annual income" keyboardType="numeric" />
                        <FormField control={control} name="father_mobile" label="Mobile number" placeholder="e.g. +201XXXXXXXXX" keyboardType="phone-pad" />
                    </FormSection>

                    <FormSection
                        number="04"
                        title="Mother / guardian"
                        description="Parent or guardian information."
                        style={styles.sectionCard}
                    >
                        <FormField control={control} name="mother_name" label="Full name" placeholder="Enter full name" />
                        <FormField control={control} name="mother_occupation" label="Occupation" placeholder="Enter occupation" />
                        <FormField control={control} name="mother_annual_income" label="Annual income" placeholder="Enter annual income" keyboardType="numeric" />
                        <FormField control={control} name="mother_mobile" label="Mobile number" placeholder="e.g. +201XXXXXXXXX" keyboardType="phone-pad" />
                    </FormSection>

                    <View style={styles.submitSection}>
                        <Text style={styles.submitHint}>
                            Please make sure all information is accurate before submitting.
                        </Text>
                        <Button
                            loading={isSubmitting}
                            onPress={handleSubmit(onSubmit, onInvalid)}
                            type='gradient'
                            style={{height: 50}}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}