import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import Card from '../../components/Card';
import { colors, radius, spacing, typography } from '../../styles/theme';

function SummaryRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
    return (
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryColon}>:</Text>
            <Text style={[styles.summaryValue, bold && styles.summaryValueBold]} numberOfLines={2}>
                {value}
            </Text>
        </View>
    );
}

export default function FeeDetailsScreen({ navigation, route }: NativeStackScreenProps<any>) {
    const { receipt, student } = route.params as {
        receipt: {
            date: string;
            className: string;
            receiptNo: string;
            paymentMode: string;
            paidAmount: string;
            installment: string;
            transactionId: string;
            feeType: string;
            breakdown: {
                tuitionFee: string;
                labFee: string;
                examFee: string;
                sportsFee: string;
            };
        };
        student: {
            name: string;
            admissionNo: string;
            className: string;
        };
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Fee Detail" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Card contentStyle={styles.headerCardContent}>
                    <View style={styles.headerTopRow}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }}
                            style={styles.studentPhoto}
                        />

                        <View style={styles.studentTextBlock}>
                            <Text style={styles.studentName}>{student.name}</Text>
                            <Text style={styles.studentAdmission}>Admission No. {student.admissionNo}</Text>
                        </View>

                        <View style={styles.classPill}>
                            <Text style={styles.classPillText}>Class {student.className}</Text>
                        </View>
                    </View>

                    <View style={styles.headerMetaRow}>
                        <Text style={styles.headerMetaText}>
                            <Text style={styles.headerMetaLabel}>Pay Date: </Text>
                            {receipt.date}
                        </Text>
                        <Text style={styles.headerMetaText}>
                            <Text style={styles.headerMetaLabel}>Paid Amt: </Text>
                            {receipt.paidAmount}
                        </Text>
                    </View>

                    <View style={styles.headerMetaRow}>
                        <Text style={styles.headerMetaText}>
                            <Text style={styles.headerMetaLabel}>Receipt No: </Text>
                            {receipt.receiptNo}
                        </Text>
                        <Text style={styles.headerMetaText}>
                            <Text style={styles.headerMetaLabel}>Payment Mode: </Text>
                            {receipt.paymentMode}
                        </Text>
                    </View>
                </Card>

                <Text style={styles.sectionTitle}>Fee Summary</Text>
                <Card contentStyle={styles.summaryCardContent}>
                    <SummaryRow label="Receipt No" value={receipt.receiptNo} />
                    <SummaryRow label="Amount Paid" value={receipt.paidAmount} />
                    <SummaryRow label="Date of Payment" value={receipt.date} />
                    <SummaryRow label="Installment" value={receipt.installment} />
                    <SummaryRow label="Fee Type" value={receipt.feeType} />
                    <SummaryRow label="Payment Mode" value={receipt.paymentMode} />
                    <SummaryRow label="Transaction ID" value={receipt.transactionId} />
                </Card>

                <Text style={styles.sectionTitle}>Amount Summary</Text>
                <Card contentStyle={styles.summaryCardContent}>
                    <SummaryRow label="Tuition Fee" value={receipt.breakdown.tuitionFee} />
                    <SummaryRow label="Lab Fee" value={receipt.breakdown.labFee} />
                    <SummaryRow label="Exam Fee" value={receipt.breakdown.examFee} />
                    <SummaryRow label="Sports Fee" value={receipt.breakdown.sportsFee} />
                    <SummaryRow label="Total Paid" value={receipt.paidAmount} bold />
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxxl,
        gap: spacing.md,
    },
    headerCardContent: {
        gap: spacing.md,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    studentPhoto: {
        width: 46,
        height: 46,
        borderRadius: radius.md,
        marginRight: spacing.md,
    },
    studentTextBlock: {
        flex: 1,
    },
    studentName: {
        ...typography.title,
        fontSize: 16,
        marginBottom: 2,
    },
    studentAdmission: {
        ...typography.description,
    },
    classPill: {
        backgroundColor: colors.iconBackground,
        borderRadius: radius.round,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
    },
    classPillText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    headerMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerMetaText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    headerMetaLabel: {
        fontWeight: '700',
        color: colors.text,
    },
    sectionTitle: {
        ...typography.title,
        fontSize: 19,
        marginTop: spacing.sm,
    },
    summaryCardContent: {
        gap: spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    summaryLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
        width: 130,
    },
    summaryColon: {
        fontSize: 15,
        color: colors.text,
        marginRight: spacing.sm,
    },
    summaryValue: {
        flex: 1,
        fontSize: 15,
        color: colors.textSecondary,
    },
    summaryValueBold: {
        fontWeight: '700',
        color: colors.primary,
    },
});