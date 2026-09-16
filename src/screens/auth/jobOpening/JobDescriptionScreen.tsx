import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SubmitButton from '../../../components/form/SubmitButton';
import CustomStatusBar from '../../../components/CustomStatusBar';
import Header from '../../../components/Header';
import { colors } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import Card from '../../../components/Card';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'JobDescription'>;
type JobInfoProps = {
    icon: string;
    label: string;
    value: string;
};


// Job info
const JobInfo = ({
    icon,
    label,
    value,
}: JobInfoProps) => {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>
                    {icon}
                </Text>
            </View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                    {label}
                </Text>

                <Text style={styles.infoValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
};


// Job description screen
export default function JobDescriptionScreen ({navigation, route}: Props) {

    // State
    const { schoolCode, job } = route.params;


    // Handle apply
    const handleApply = () => {
        navigation.navigate('JobForm', {
            schoolCode,
            jobId: job.id,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomStatusBar />

            {/* Scrollable content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                
                {/* Header */}
                <Header navigation={navigation} title="Job Details"/>


                {/* Job icon */}
                <View style={styles.heroSection}>
                    <View style={styles.jobIconContainer}>
                        <Text style={styles.jobIcon}>
                            💼
                        </Text>
                    </View>

                    <Text style={styles.eyebrow}>
                        JOB OPENING
                    </Text>

                    <Text style={styles.title}>
                        {job.title}
                    </Text>

                    {/* School */}
                    <View style={styles.schoolBadge}>
                        <View style={styles.verifiedIcon}>
                            <Text style={styles.verifiedCheck}>
                                ✓
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.schoolLabel}>
                                SCHOOL CODE
                            </Text>

                            <Text style={styles.schoolCode}>
                                {schoolCode}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Key information */}
                <Card>
                    <JobInfo
                        icon="$"
                        label="Salary"
                        value={job.salary}
                    />

                    <View style={styles.divider} />

                    <JobInfo
                        icon="◷"
                        label="Experience"
                        value={job.experience}
                    />

                    <View style={styles.divider} />

                    <JobInfo
                        icon="◫"
                        label="Last date to apply"
                        value={job.applicationDeadline}
                    />
                </Card>

                {/* Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>
                        About the position
                    </Text>

                    <Text style={styles.description}>
                        {job.description ||
                            `We are looking for a motivated and qualified ${job.title} to join our school team. The successful candidate will contribute to creating a positive learning environment and work collaboratively with students, colleagues, and the wider school community.

The ideal candidate should demonstrate professionalism, strong communication skills, and a genuine commitment to education. They should be able to work effectively in a dynamic school environment and contribute positively to the development of our students.

If you meet the requirements and are interested in joining our team, we encourage you to submit your application before the application deadline.`}
                    </Text>
                </View>

                <SubmitButton
                    style={{marginTop:26}}
                    loading={false}
                    label='Apply for this position'
                    onPress={handleApply}
                />

                {/* Application reminder */}
                <View style={styles.reminderCard}>
                    <View style={styles.reminderIcon}>
                        <Text style={styles.reminderIconText}>
                            !
                        </Text>
                    </View>

                    <View style={styles.reminderContent}>
                        <Text style={styles.reminderTitle}>
                            Application deadline
                        </Text>

                        <Text style={styles.reminderText}>
                            Make sure to submit your application
                            before {job.applicationDeadline}.
                        </Text>
                    </View>
                </View>

                <Text style={styles.bottomHint}>
                    Your application will be submitted to the
                    school.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAFC',
    },


    /* Scroll */
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 30,
    },


    /* Hero */
    heroSection: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 24,
    },
    jobIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 23,
        backgroundColor: '#EAF7FD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    jobIcon: {
        fontSize: 34,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.6,
        color: colors.primary,
        marginBottom: 8,
    },
    title: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
        letterSpacing: -0.7,
        maxWidth: 360,
    },


    /* School badge */
    schoolBadge: {
        marginTop: 18,
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    verifiedIcon: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
    },
    verifiedCheck: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
    },
    schoolLabel: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    schoolCode: {
        fontSize: 14,
        fontWeight: '800',
        color: '#111827',
        letterSpacing: 1,
    },


    /* Information card */
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: '#EAF7FD',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoIconText: {
        fontSize: 17,
        fontWeight: '800',
        color: colors.primary,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        color: '#9CA3AF',
        fontWeight: '600',
        marginBottom: 3,
    },
    infoValue: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '800',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEF0F3',
        marginVertical: 14,
    },


    /* Description */
    descriptionSection: {
        marginTop: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 25,
        color: '#4B5563',
    },


    /* Deadline reminder */

    reminderCard: {
        marginTop: 10,
        padding: 15,
        borderRadius: 18,
        backgroundColor: '#EAF7FD',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    reminderIcon: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },
    reminderIconText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '900',
    },
    reminderContent: {
        flex: 1,
    },
    reminderTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
    },
    reminderText: {
        fontSize: 13,
        lineHeight: 19,
        color: '#5B6470',
    },


    /* Bottom application area */
    bottomHint: {
        textAlign: 'center',
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 8,
    },
}); 