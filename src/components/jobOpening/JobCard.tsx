import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { colors } from '../../styles/theme';
import { JobOpening } from '../../lib/types/job';
import Card from '../Card';


// Type
type JobCardProps = {
    job: JobOpening;
    schoolCode: string;
    index: number;
    onPress: () => void;
};


// Job detail
export const JobDetail = ({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) => {
    return (
        <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
                <Text style={styles.detailIconText}>
                    {icon}
                </Text>
            </View>

            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>
                    {label}
                </Text>

                <Text style={styles.detailValue}>
                    {value}
                </Text>
            </View>
        </View>
    );
};


// Job card
export default function JobCard ({ job, schoolCode, index, onPress }: JobCardProps) {
    return (
        <Card onPress={onPress} key={index} style={{marginVertical:6}}>
            {/* Top row */}
            <View style={styles.cardHeader}>
                <View style={styles.jobIconContainer}>
                    <Text style={styles.jobIcon}>
                        💼
                    </Text>
                </View>
            </View>

            {/* School code */}
            <View style={styles.schoolCodeBadge}>
                <View style={styles.verifiedDot}>
                    <Text style={styles.verifiedCheck}>
                        ✓
                    </Text>
                </View>

                <Text style={styles.schoolCodeLabel}>
                    School
                </Text>

                <Text style={styles.schoolCodeValue}>
                    {schoolCode}
                </Text>
            </View>

            {/* Job title */}
            <Text
                style={styles.jobTitle}
                numberOfLines={2}
            >
                {job.title}
            </Text>

            {/* Job details */}
            <View style={styles.detailsContainer}>
                <JobDetail
                    icon="$"
                    label="Salary"
                    value={job.salary}
                />

                <JobDetail
                    icon="◷"
                    label="Experience"
                    value={job.experience}
                />

                <JobDetail
                    icon="◫"
                    label="Apply before"
                    value={job.applicationDeadline}
                />
            </View>

            {/* Footer */}
            <View style={styles.cardFooter}>
                <Text style={styles.viewDetails}>
                    View job details
                </Text>

                <Text style={styles.footerArrow}>
                    →
                </Text>
            </View>
        </Card>
    );
};


// Styles
const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    jobIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#EAF7FD',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobIcon: {
        fontSize: 23,
    },

    /* School code inside the job card */
    schoolCodeBadge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F9FC',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 9,
        marginBottom: 12,
    },
    verifiedDot: {
        width: 19,
        height: 19,
        borderRadius: 9.5,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    verifiedCheck: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '900',
    },
    schoolCodeLabel: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: '600',
        marginRight: 5,
    },
    schoolCodeValue: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    jobTitle: {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 18,
    },
    detailsContainer: {
        gap: 12,
        paddingBottom: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#EEF0F3',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#F7F8FA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    detailIconText: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primary,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 11,
        color: '#9CA3AF',
        fontWeight: '600',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '700',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 14,
    },
    viewDetails: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.primary,
    },
    footerArrow: {
        fontSize: 17,
        fontWeight: '700',
        color: colors.primary,
    }
});