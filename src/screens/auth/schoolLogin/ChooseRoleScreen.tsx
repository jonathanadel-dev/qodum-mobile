import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Card from '../../../components/Card';
import { colors } from '../../../styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context'
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


// Role
type Role = 'student' | 'teacher';
type Props = NativeStackScreenProps<AuthStackParamList, 'ChooseRole'>;


// Choose role screen
export default function ChooseRoleScreen({ navigation, route }: Props) {

    // School code
    const { schoolCode } = route.params || {};


    // Press handler
    const handleRolePress = (role: Role) => {
        navigation.navigate('Login', {
            schoolCode,
            role
        });
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Decorative background */}
            <View style={styles.backgroundCircleTop} />
            <View style={styles.backgroundCircleBottom} />


            {/* Header */}
            <View style={styles.header}>

                <Text style={styles.eyebrow}>
                    SCHOOL LOGIN
                </Text>

                <Text style={styles.title}>
                    Who are you?
                </Text>

                <Text style={styles.description}>
                    Choose your role to continue
                    to your school account.
                </Text>

            </View>


            {/* Verified school */}
            <Card
                style={styles.schoolCard}
                contentStyle={styles.schoolCardContent}
            >
                <View style={styles.schoolIcon}>
                    <Text style={styles.schoolIconText}>
                        ✓
                    </Text>
                </View>

                <View style={styles.schoolContent}>
                    <Text style={styles.schoolLabel}>
                        SCHOOL CODE
                    </Text>

                    <Text style={styles.schoolCode}>
                        {schoolCode || '------'}
                    </Text>
                </View>

                <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>
                        Verified
                    </Text>
                </View>
            </Card>


            {/* Role cards */}
            <View style={styles.rolesContainer}>

                {/* Student */}
                <Card
                    onPress={() => handleRolePress('student')}
                    contentStyle={styles.roleCardContent}
                >
                    <View
                        style={[
                            styles.roleIconContainer,
                            styles.studentIconContainer,
                        ]}
                    >
                        <Text style={styles.roleIcon}>
                            🎓
                        </Text>
                    </View>

                    <View style={styles.roleContent}>
                        <Text style={styles.roleTitle}>
                            Student
                        </Text>

                        <Text style={styles.roleDescription}>
                            Login to access your classes,
                            assignments, fees, results
                            and more.
                        </Text>
                    </View>

                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </View>
                </Card>


                {/* Teacher */}
                <Card
                    onPress={() => handleRolePress('teacher')}
                    contentStyle={styles.roleCardContent}
                >
                    <View
                        style={[
                            styles.roleIconContainer,
                            styles.teacherIconContainer,
                        ]}
                    >
                        <Text style={styles.roleIcon}>
                            👨‍🏫
                        </Text>
                    </View>

                    <View style={styles.roleContent}>
                        <Text style={styles.roleTitle}>
                            Teacher
                        </Text>

                        <Text style={styles.roleDescription}>
                            Login to manage your classes,
                            students, assignments
                            and school activities.
                        </Text>
                    </View>

                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </View>
                </Card>

            </View>


            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Select your role to continue
                </Text>
            </View>

        </SafeAreaView>
    );
};


// Styles
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        overflow: 'hidden',
    },


    /* Background */
    backgroundCircleTop: {
        position: 'absolute',
        width: 330,
        height: 330,
        borderRadius: 165,
        backgroundColor: '#EAF8FE',
        top: -190,
        right: -150,
        opacity: 0.8,
    },

    backgroundCircleBottom: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#F2FAFD',
        bottom: -180,
        left: -160,
    },


    /* Header */
    header: {
        paddingTop: 35,
        alignItems: 'center',
    },

    eyebrow: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.6,
        color: colors.primary,
        marginBottom: 12,
    },

    title: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '800',
        color: '#17232C',
        textAlign: 'center',
        letterSpacing: -0.7,
    },

    description: {
        fontSize: 15,
        lineHeight: 23,
        color: '#71808A',
        textAlign: 'center',
        marginTop: 12,
        maxWidth: 340,
    },


    /* School */
    schoolCard: {
        marginTop: 30,
    },

    schoolCardContent: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    schoolIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E2F5FC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    schoolIconText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: '800',
    },

    schoolContent: {
        flex: 1,
    },

    schoolLabel: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.2,
        color: '#8A969D',
        marginBottom: 3,
    },

    schoolCode: {
        fontSize: 15,
        fontWeight: '800',
        color: '#34424B',
        letterSpacing: 1.2,
    },

    verifiedBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#E7F8EF',
    },

    verifiedText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#2C8A59',
    },


    /* Roles */
    rolesContainer: {
        marginTop: 25,
        gap: 15,
    },

    roleCardContent: {
        minHeight: 145,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    roleIconContainer: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },

    studentIconContainer: {
        backgroundColor: '#EAF8FE',
    },

    teacherIconContainer: {
        backgroundColor: '#F1F7FB',
    },

    roleIcon: {
        fontSize: 28,
    },

    roleContent: {
        flex: 1,
        paddingRight: 8,
    },

    roleTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#17232C',
        marginBottom: 6,
    },

    roleDescription: {
        fontSize: 12.5,
        lineHeight: 19,
        color: '#71808A',
    },

    arrowContainer: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F3F8FA',
        alignItems: 'center',
        justifyContent: 'center',
    },

    arrow: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.primary,
        marginTop: -2,
    },


    /* Footer */
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 25,
    },

    footerText: {
        fontSize: 12,
        color: '#A0ABB1',
    },

});