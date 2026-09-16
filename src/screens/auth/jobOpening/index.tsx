import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import CustomStatusBar from '../../../components/CustomStatusBar';
import { colors } from '../../../styles/theme';
import { JobOpening } from '../../../lib/types/job';
import { fetchJobOpenings } from '../../../lib/api/jobApi';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import JobCard from '../../../components/jobOpening/JobCard';


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'JobOpening'>;


// Job opening screen
export default function JobOpeningScreen ({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [jobs, setJobs] = useState<JobOpening[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    // Load jobs
    const loadJobs = async () => {
        try {
            setLoading(true);
            setError('');

            await new Promise((resolve:any) =>
                setTimeout(resolve, 900),
            );

            const jobRes:JobOpening[] = await fetchJobOpenings();
            setJobs(jobRes);
        } catch (err) {
            setError('We could not load the available jobs. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadJobs();
    }, [schoolCode]);


    // Handle job press
    const handleJobPress = (job: JobOpening) => {
        navigation.navigate('JobDescription', {
            schoolCode,
            job
        });
    };

    return (
        <SafeAreaView style={styles.container}>

            <CustomStatusBar />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Header */}
                <View style={styles.header}>
                    <Header navigation={navigation}/>

                    <View style={styles.headerContent}>
                        <Text style={styles.eyebrow}>
                            JOB OPENINGS
                        </Text>

                        <Text style={styles.headerTitle}>
                            Find your next opportunity
                        </Text>

                        <Text style={styles.headerDescription}>
                            Explore the positions currently available
                            at this school.
                        </Text>
                    </View>
                </View>
    

                {/* Content */}
                {loading ? (
                    <View style={styles.centerState}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />

                        <Text style={styles.stateTitle}>
                            Loading available jobs...
                        </Text>

                        <Text style={styles.stateDescription}>
                            We're checking the latest openings
                            for this school.
                        </Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerState}>
                        <View style={styles.errorIcon}>
                            <Text style={styles.errorIconText}>
                                !
                            </Text>
                        </View>

                        <Text style={styles.stateTitle}>
                            Something went wrong
                        </Text>

                        <Text style={styles.stateDescription}>
                            {error}
                        </Text>

                        <Pressable
                            style={styles.retryButton}
                            onPress={loadJobs}
                        >
                            <Text style={styles.retryButtonText}>
                                Try again
                            </Text>
                        </Pressable>
                    </View>
                ) : jobs.length === 0 ? (
                    <View style={styles.centerState}>
                        <View style={styles.emptyIcon}>
                            <Text style={styles.emptyIconText}>
                                💼
                            </Text>
                        </View>

                        <Text style={styles.stateTitle}>
                            No job openings
                        </Text>

                        <Text style={styles.stateDescription}>
                            There are currently no available
                            positions at this school.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.jobsSection}>
                        {/* Results header */}
                        <View style={styles.resultsHeader}>
                            <Text style={styles.resultsTitle}>
                                Available positions
                            </Text>

                            <View style={styles.countBadge}>
                                <Text style={styles.countText}>
                                    {jobs.length}
                                </Text>
                            </View>
                        </View>

                        {/* Jobs */}
                        {jobs.map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                schoolCode={schoolCode}
                                index={index}
                                onPress={() =>
                                    handleJobPress(job)
                                }
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    headerContent: {
        marginBottom: 14,
    },
    eyebrow: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: colors.primary,
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        letterSpacing: -0.6,
        marginBottom: 8,
    },
    headerDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: '#6B7280',
        maxWidth: 340,
    },


    /* Jobs */
    jobsSection: {
        paddingHorizontal: 20,
    },
    resultsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultsTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#111827',
    },
    countBadge: {
        minWidth: 26,
        height: 26,
        paddingHorizontal: 7,
        borderRadius: 13,
        backgroundColor: '#EAF7FD',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    countText: {
        fontSize: 12,
        fontWeight: '800',
        color: colors.primary,
    },

    /* Loading / error / empty states */
    centerState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingTop: 70,
        paddingBottom: 100,
    },
    stateTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
        marginTop: 18,
        marginBottom: 8,
    },
    stateDescription: {
        fontSize: 14,
        lineHeight: 21,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: 320,
    },
    emptyIcon: {
        width: 76,
        height: 76,
        borderRadius: 24,
        backgroundColor: '#EAF7FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyIconText: {
        fontSize: 32,
    },
    errorIcon: {
        width: 70,
        height: 70,
        borderRadius: 23,
        backgroundColor: '#FEF2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorIconText: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.danger,
    },
    retryButton: {
        marginTop: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
    },
});