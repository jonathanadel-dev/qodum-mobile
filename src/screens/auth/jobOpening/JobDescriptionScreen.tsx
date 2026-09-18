import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import { colors, fonts, radius, spacing, typography } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import { fetchJobById, JobType } from '../../../lib/api/jobApi';
import toast from '../../../lib/toast';
import JobCard from '../../../components/jobOpening/JobCard';


// Props
type Props = NativeStackScreenProps<AuthStackParamList, 'JobDescription'>;


// Text formatting
function parseDescription(text: string) {
    const paragraphs: string[] = [];
    const bullets: string[] = [];

    text.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        if (trimmed.startsWith('- ')) {
            bullets.push(trimmed.slice(2));
        } else {
            paragraphs.push(trimmed);
        }
    });

    return { paragraphs, bullets };
}


// Job description screen
export default function JobDescriptionScreen({ navigation, route }: Props) {

    // State
    const { jobId } = route.params;
    const [job, setJob] = useState<JobType | null>(null);
    const [loadingJob, setLoadingJob] = useState(true);


    // Handle apply
    const handleApply = () => {
        navigation.navigate('JobForm', { jobId });
    };


    // Handle
    const handleShare = async () => {
        if (!job) return;
        try {
            await Share.share({
                message: `${job.title} at ${job.schoolCode} — apply before ${job.applicationDeadline}.`,
            });
        } catch {
            // user dismissed the share sheet — nothing to do
        }
    };


    // Fetching job dat
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
    if (loadingJob || !job) {
        return (
            <SafeAreaView style={[styles.container, styles.centerFill]}>
                <ActivityIndicator size="small" color={colors.primary} />
            </SafeAreaView>
        );
    }


    // Formatted text
    const { paragraphs, bullets } = parseDescription(job.description);

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} title="Job Detail" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                <JobCard
                    index={1}
                    job={job}
                    schoolCode={job.schoolCode}
                    onPress={() => ''}
                    isDesc={true}
                />

                {paragraphs.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Job Description</Text>
                        {paragraphs.map((line, index) => (
                            <Text key={index} style={styles.description}>
                                {line}
                            </Text>
                        ))}
                    </View>
                )}

                {bullets.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Responsibilities</Text>
                        {bullets.map((item, index) => (
                            <View key={index} style={styles.bulletRow}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.bulletText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.scrollSpacer} />
            </ScrollView>

            <View style={styles.actionBar}>
                <View style={styles.applyWrapper}>
                    <Button type="gradient" label="Apply Now" onPress={handleApply} style={styles.applyButton} />
                </View>

                <Button
                    label='Share'
                    onPress={handleShare}
                    type='white'
                    style={[
                        {
                            borderWidth:2,
                            borderColor: colors.primary,
                        },
                        styles.applyButton
                    ]}
                    textStyle={{
                        color: colors.primary,
                        fontFamily: fonts.bold,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerFill: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.xl,
    },
    section: {
        marginBottom: spacing.xxl,
    },
    sectionTitle: {
        ...typography.title,
        fontSize: 19,
        marginBottom: spacing.md,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    bulletDot: {
        fontSize: 15,
        color: colors.textSecondary,
        marginRight: spacing.sm,
        lineHeight: 23,
    },
    bulletText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
    },
    scrollSpacer: {
        height: 90,
    },
    actionBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingHorizontal: spacing.xxl,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    applyWrapper: {
        flex: 1,
    },
    applyButton: {
        height: 52,
        borderRadius: radius.lg,
    }
});