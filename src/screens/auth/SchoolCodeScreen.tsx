import React, { useState } from 'react';
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

import CodeInput from '../../components/form/CodeInput';
import SubmitButton from '../../components/form/SubmitButton';
import Header from '../../components/Header';
import CustomStatusBar from '../../components/CustomStatusBar';
import SchoolSearchSheet from '../../components/schoolCode/SchoolSearchSheet';
import { colors, radius, spacing, typography } from '../../styles/theme';
import { School } from '../../types/school';
import { verifySchoolCode } from '../../lib/schoolApi';
import OutlineButton from '../../components/OutlineButton';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'SchoolCode'>;
type CodeError =
    | 'empty'
    | 'invalid'
    | 'not_found'
    | 'server'
    | '';


// School code screen
export default function SchoolCodeScreen({ navigation }: Props) {

    // State
    const CODE_LENGTH = 6;
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CodeError>('');
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);


    // Handle code change
    const handleCodeChange = (value: string) => {
        setError('');
        setSelectedSchool(null);
        setCode(value);
    };


    // Handle submit
    const handleSubmit = async () => {

        // Reset state
        Keyboard.dismiss();
        setError('');

        // Validations
        if (!code) {
            setError('empty');
            return;
        }
        if (code.length !== CODE_LENGTH || !/^[A-Z0-9]{6}$/.test(code)) {
            setError('invalid');
            return;
        }

        // Loading state
        setLoading(true);

        // Handing submit
        try {
            const school = await verifySchoolCode(code);
            if (!school) {
                setError('not_found');
                return;
            }
            setSelectedSchool(school);
            navigation.navigate('StudentAdmissionForm', { schoolCode: school.code });
        } catch {
            setError('server');
        } finally {
            setLoading(false);
        }
    };


    // Selecting school
    const handleSchoolSelected = (school: School) => {
        const schoolCode = school.code
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, CODE_LENGTH);

        setCode(schoolCode);
        setSelectedSchool(school);
        setError('');
    };


    // Error message
    const getErrorMessage = () => {
        switch (error) {
            case 'empty':
                return 'Please enter your school code.';
            case 'invalid':
                return 'School codes must contain exactly 6 letters or numbers.';
            case 'not_found':
                return "We couldn't find a school with this code. Please check the code and try again.";
            case 'server':
                return 'Something went wrong while checking the code. Please try again.';
            default:
                return '';
        }
    };
    const errorMessage = getErrorMessage();

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            {/* Custom status bar */}
            <CustomStatusBar />


            {/* Main content */}
            <View style={styles.screen}>

                <Header navigation={navigation} />

                <View style={styles.content}>
                    <View>
                        <View style={styles.iconCircle}>
                            <Text style={styles.bigIcon}>🏫</Text>
                        </View>

                        <Text style={styles.title}>Find your school</Text>

                        <Text style={styles.description}>
                            Enter your school's 6-character code to continue with your admission application.
                        </Text>
                    </View>

                    <View style={styles.codeSection}>
                        <Text style={styles.codeLabel}>School code</Text>

                        <CodeInput
                            length={CODE_LENGTH}
                            value={code}
                            onChangeText={handleCodeChange}
                            error={errorMessage}
                        />

                        {!errorMessage && selectedSchool && (
                            <View style={styles.successContainer}>
                                <Text style={styles.successIcon}>✓</Text>
                                <Text style={styles.successMessage}>{selectedSchool.name}</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: 6 }}>
                        <SubmitButton
                            loading={loading}
                            onPress={handleSubmit}
                            label="Enter school"
                            loadingLabel="Verifying..."
                        />
                    </View>

                    <View style={styles.searchOption}>
                        <View style={styles.divider} />
                        <Text style={styles.orText}>Don't know your code?</Text>

                        <OutlineButton
                            label="Search for my school"
                            icon="🔍"
                            pressHandler={() => setIsSearchVisible(true)}
                        />

                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Your school code is usually provided by your school.
                    </Text>
                </View>
            </View>

            {/* School searching */}
            <SchoolSearchSheet
                visible={isSearchVisible}
                setIsVisible={setIsSearchVisible}
                onSelectSchool={handleSchoolSelected}
            />

        </KeyboardAvoidingView>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    screen: {
        flex: 1,
        paddingHorizontal: spacing.xxl,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 30
    },
    iconCircle: {
        width: 68,
        height: 68,
        borderRadius: radius.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
    },
    bigIcon: {
        fontSize: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.text,
        letterSpacing: -0.8,
        marginBottom: spacing.md,
    },
    description: {
        ...typography.description,
        fontSize: 15,
        lineHeight: 23,
        maxWidth: 360,
    },
    codeSection: {
        marginTop: 40,
    },
    codeLabel: {
        ...typography.label,
        marginBottom: spacing.md,
    },
    successContainer: {
        marginTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    successIcon: {
        width: 18,
        height: 18,
        borderRadius: radius.round,
        backgroundColor: colors.success,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 18,
        fontSize: 12,
        fontWeight: '800',
        marginRight: spacing.sm,
    },
    successMessage: {
        flex: 1,
        fontSize: 13,
        color: colors.success,
        fontWeight: '600',
    },
    searchOption: {
        alignItems: 'center',
        marginTop: 30,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: colors.border,
        marginBottom: spacing.lg,
    },
    orText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    footer: {
        paddingBottom: spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        color: colors.inactive,
        fontSize: 12,
        textAlign: 'center',
    },
});