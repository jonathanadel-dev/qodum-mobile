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
import { colors, metrics } from '../../../styles/theme';
import { JobType, fetchJobOpenings } from '../../../lib/api/jobApi';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import JobCard from '../../../components/jobOpening/JobCard';


// Props
type Props = NativeStackScreenProps<AuthStackParamList, 'JobOpening'>;


// Job opening screen
export default function JobOpeningScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    // Loading jobs
    const loadJobs = async () => {
        try {
            setLoading(true);
            setError('');
            setJobs(await fetchJobOpenings(schoolCode));
        } catch {
            setError('We could not load the available jobs. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadJobs();
    }, [schoolCode]);


    // Handle job press
    const handleJobPress = (job: JobType) => {
        navigation.navigate('JobDescription', { jobId: job.id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title="Job Vacancies" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.heading}>Vacancies</Text>

                {loading ? (
                    <View style={styles.centerState}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : error ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateTitle}>Something went wrong</Text>
                        <Text style={styles.stateDescription}>{error}</Text>
                        <Pressable style={styles.retryButton} onPress={loadJobs}>
                            <Text style={styles.retryButtonText}>Try again</Text>
                        </Pressable>
                    </View>
                ) : jobs.length === 0 ? (
                    <View style={styles.centerState}>
                        <Text style={styles.stateTitle}>No job openings</Text>
                        <Text style={styles.stateDescription}>
                            There are currently no available positions at this school.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.jobsSection}>
                        {jobs.map((job, index) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                schoolCode={schoolCode}
                                index={index}
                                onPress={() => handleJobPress(job)}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollContent: {
        paddingBottom: metrics.xxxl,
    },
    heading: {
        // ...typography.title,
        paddingHorizontal: metrics.xxl,
        marginTop: metrics.xl,
        marginBottom: metrics.lg,
    },
    jobsSection: {
        paddingHorizontal: metrics.xxl,
    },
    centerState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: metrics.xxxl,
        paddingTop: 70,
        paddingBottom: 100,
    },
    stateTitle: {
        // ...typography.title,
        fontSize: 17,
        textAlign: 'center',
        marginBottom: metrics.sm,
    },
    stateDescription: {
        // ...typography.description,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: metrics.xl,
        paddingHorizontal: metrics.xxl,
        paddingVertical: metrics.md,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '800',
    },
});