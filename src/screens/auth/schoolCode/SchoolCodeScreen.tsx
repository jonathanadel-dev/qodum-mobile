import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../../navigation/AuthStack';

import CodeInput from '../../../components/form/CodeInput';
import BackgroundScreen from '../../../components/BackgroundScreen';
import Button from '../../../components/Button';
import { colors, spacing, typography, radius } from '../../../styles/theme';
import { SchoolType, verifySchoolCode } from '../../../lib/api/schoolApi';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'SchoolCode'>;
type CodeError = 'empty' | 'invalid' | 'not_found' | 'server' | '';


// School code screen
export default function SchoolCodeScreen({ navigation, route }: Props) {
    
    // State
    const nextPage = route.params.next_page;
    const CODE_LENGTH = 6;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CodeError>('');


    // Handlers
    const handleCodeChange = (value: string) => {
        setError('');
        setCode(value);
    };
    const handleReset = () => {
        setCode('');
        setError('');
    };
    const handleSchoolSelected = (school: SchoolType) => {
        const schoolCode = school.code
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '')
            .slice(0, CODE_LENGTH);
        setCode(schoolCode);
        setError('');
    };
    const handleSubmit = async () => {
        Keyboard.dismiss();
        setError('');

        if (!code) {
            setError('empty');
            return;
        }
        if (code.length !== CODE_LENGTH || !/^[A-Z0-9]{6}$/.test(code)) {
            setError('invalid');
            return;
        }

        setLoading(true);
        try {
            const school = await verifySchoolCode(code);
            if (!school) {
                setError('not_found');
                return;
            }
            if (nextPage === 'StudentAdmission') {
                navigation.navigate('StudentAdmission', { schoolCode: school.code });
            } else if (nextPage === 'ChooseRole') {
                navigation.navigate('ChooseRole', { schoolCode: school.code });
            } else if (nextPage === 'JobOpening') {
                navigation.navigate('JobOpening', { schoolCode: school.code });
            }
        } catch {
            setError('server');
        } finally {
            setLoading(false);
        }
    };
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

    return (
        <BackgroundScreen navigation={navigation}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Enter School Code</Text>

                    <CodeInput
                        length={CODE_LENGTH}
                        value={code}
                        onChangeText={handleCodeChange}
                        error={getErrorMessage()}
                    />


                    <Button
                        label='Reset'
                        icon='↻'
                        onPress={handleReset}
                        type='plain'
                        textStyle={{ color: colors.primary }}
                    />


                    <Button
                        label='Find Your School or college Code ?'
                        onPress={() => 
                            navigation.navigate('SchoolSearch', {
                                onSelect: handleSchoolSelected,
                            })
                        }
                        type='plain'
                        textStyle={{ color: colors.primary }}
                    />

                    <View style={styles.submitWrapper}>
                        <Button
                            type="arrowRight"
                            onPress={handleSubmit}
                            loading={loading}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Powered By</Text>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        style={styles.footerLogo}
                        resizeMode="contain"
                    />
                </View>
            </KeyboardAvoidingView>
        </BackgroundScreen>
    );
}


// Styles
const styles = StyleSheet.create({
    flex: { flex: 1 },
    content: {
        flex: 1,
        alignItems: 'center',
        gap: spacing.md,
        paddingTop: spacing.xxxl * 2,
    },
    title: {
        ...typography.title,
        fontSize: 22,
        marginBottom: spacing.xxl,
    },
    submitWrapper: {
        marginTop: spacing.xxxl,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: spacing.xl,
    },
    footerText: {
        fontSize: 13,
        color: colors.inactive,
        marginBottom: spacing.xs,
    },
    footerLogo: {
        width: 90,
        height: 28,
    },
});