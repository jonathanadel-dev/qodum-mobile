import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import { colors, radius, spacing, typography } from '../../styles/theme';
import { JobType } from '../../lib/api/jobApi';
import Card from '../Card';


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
                <Text style={styles.title} numberOfLines={2}>
                    {job.title}
                </Text>

                <View style={styles.logoBadge}>
                    <Image
                        source={require('../../assets/images/app-icon-master.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <Text style={styles.subtitle}>{job.classRange}</Text>

            <View style={styles.metaRow}>
                <Ionicons name="briefcase-outline" size={15} color={colors.textSecondary} />
                <Text style={styles.metaText}>
                    {job.experience} | {job.employmentType}
                </Text>
            </View>

            {!isDesc && (
                <View style={styles.metaRow}>
                    <Ionicons name="document-text-outline" size={15} color={colors.textSecondary} />
                    <Text style={styles.metaText} numberOfLines={1}>
                        {job.description}
                    </Text>
                </View>
            )}

            <View style={styles.divider} />

            <Text style={styles.footerText}>
                Posted: {job.postedDaysAgo} Day{job.postedDaysAgo !== 1 ? 's' : ''} ago
                {'  |  '}
                <Text style={styles.footerStrong}>Openings: </Text>
                <Text style={styles.footerStrong}>{job.openings}</Text>
            </Text>
        </Card>
    );
}


// Styles
const styles = StyleSheet.create({
    card: {
        marginBottom: spacing.lg,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        ...typography.title,
        flex: 1,
        marginBottom: 0,
        marginRight: spacing.md,
    },
    logoBadge: {
        width: 46,
        height: 46,
        borderRadius: radius.md,
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
        ...typography.description,
        marginTop: 0,
        marginBottom: spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    metaText: {
        ...typography.description,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginTop: spacing.xs,
        marginBottom: spacing.md,
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