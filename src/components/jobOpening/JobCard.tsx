import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { colors, metrics } from '../../styles/theme';
import { JobType } from '../../lib/api/jobApi';
import Card from '../Card';
import AppText from '../AppText';


// Props
type JobCardProps = {
    job: JobType;
    schoolCode: string;
    index: number;
    onPress: () => void;
    isDesc?: boolean
};


// Job card
export default function JobCard({ job, onPress, isDesc = false }: JobCardProps) {
    return (
        <Card onPress={onPress} style={styles.card}>
            <View style={styles.topRow}>
                <AppText variant="h2" style={styles.title} numberOfLines={2}>
                    {job.title}
                </AppText>

                <View style={styles.logoBadge}>
                    <Image
                        source={require('../../assets/images/app-icon-master.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <AppText style={styles.subtitle}>{job.classRange}</AppText>

            <View style={styles.metaRow}>
                <Ionicons name="briefcase-outline" size={15} color={colors.textSecondary} />
                <AppText style={styles.metaText}>
                    {job.experience} | {job.employmentType}
                </AppText>
            </View>

            {!isDesc && (
                <View style={styles.metaRow}>
                    <Ionicons name="document-text-outline" size={15} color={colors.textSecondary} />
                    <AppText style={styles.metaText} numberOfLines={1}>
                        {job.description}
                    </AppText>
                </View>
            )}

            <View style={styles.divider} />

            <AppText style={styles.footerText}>
                Posted: {job.postedDaysAgo} Day{job.postedDaysAgo !== 1 ? 's' : ''} ago
                {'  |  '}
                <AppText style={styles.footerStrong}>Openings: </AppText>
                <AppText style={styles.footerStrong}>{job.openings}</AppText>
            </AppText>
        </Card>
    );
}


// Styles
const styles = StyleSheet.create({
    card: {
        marginBottom: metrics.lg,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        // ...typography.title,
        flex: 1,
        marginBottom: 0,
        marginRight: metrics.md,
    },
    logoBadge: {
        width: 46,
        height: 46,
        borderRadius: metrics.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    subtitle: {
        // ...typography.description,
        marginTop: 0,
        marginBottom: metrics.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: metrics.sm,
        gap: metrics.sm,
    },
    metaText: {
        // ...typography.description,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginTop: metrics.xs,
        marginBottom: metrics.md,
    },
    footerText: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    footerStrong: {
        fontWeight: '800',
        color: colors.text,
    },
});