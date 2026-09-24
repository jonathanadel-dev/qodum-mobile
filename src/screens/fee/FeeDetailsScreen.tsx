// src/screens/dashboard/FeeDetailsScreen.tsx
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import AppText from '../../components/AppText';
import Card from '../../components/Card';
import { colors, metrics } from '../../styles/theme';

function SummaryRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
    return (
        <View style={styles.summaryRow}>
            <AppText variant="h3" style={styles.summaryLabel}>{label}</AppText>
            <AppText variant="text" style={styles.summaryColon}>:</AppText>
            <AppText
                variant={bold ? 'h3' : 'text'}
                style={[styles.summaryValue, bold && styles.summaryValueBold]}
                numberOfLines={2}
            >
                {value}
            </AppText>
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
                            <AppText variant="h3" style={styles.studentName}>{student.name}</AppText>
                            <AppText variant="desc">Admission No. {student.admissionNo}</AppText>
                        </View>

                        <View style={styles.classPill}>
                            <AppText variant="text" style={styles.classPillText}>Class {student.className}</AppText>
                        </View>
                    </View>

                    <View style={styles.headerMetaRow}>
                        <AppText variant="text" style={styles.headerMetaText}>
                            <AppText variant="h3" style={styles.headerMetaLabel}>Pay Date: </AppText>
                            {receipt.date}
                        </AppText>
                        <AppText variant="text" style={styles.headerMetaText}>
                            <AppText variant="h3" style={styles.headerMetaLabel}>Paid Amt: </AppText>
                            {receipt.paidAmount}
                        </AppText>
                    </View>

                    <View style={styles.headerMetaRow}>
                        <AppText variant="text" style={styles.headerMetaText}>
                            <AppText variant="h3" style={styles.headerMetaLabel}>Receipt No: </AppText>
                            {receipt.receiptNo}
                        </AppText>
                        <AppText variant="text" style={styles.headerMetaText}>
                            <AppText variant="h3" style={styles.headerMetaLabel}>Payment Mode: </AppText>
                            {receipt.paymentMode}
                        </AppText>
                    </View>
                </Card>

                <AppText variant="h2" style={styles.sectionTitle}>Fee Summary</AppText>
                <Card contentStyle={styles.summaryCardContent}>
                    <SummaryRow label="Receipt No" value={receipt.receiptNo} />
                    <SummaryRow label="Amount Paid" value={receipt.paidAmount} />
                    <SummaryRow label="Date of Payment" value={receipt.date} />
                    <SummaryRow label="Installment" value={receipt.installment} />
                    <SummaryRow label="Fee Type" value={receipt.feeType} />
                    <SummaryRow label="Payment Mode" value={receipt.paymentMode} />
                    <SummaryRow label="Transaction ID" value={receipt.transactionId} />
                </Card>

                <AppText variant="h2" style={styles.sectionTitle}>Amount Summary</AppText>
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
    container: { flex: 1, backgroundColor: colors.white },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.xl,
        paddingBottom: metrics.xxxl,
        gap: metrics.md,
    },
    headerCardContent: {
        gap: metrics.md,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    studentPhoto: {
        width: 46,
        height: 46,
        borderRadius: metrics.md,
        marginRight: metrics.md,
    },
    studentTextBlock: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        marginBottom: 2,
    },
    classPill: {
        backgroundColor: colors.iconBackground,
        borderRadius: metrics.round,
        paddingHorizontal: metrics.md,
        paddingVertical: metrics.xs,
    },
    classPillText: {
        fontSize: 13,
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
        fontSize: 14,
        color: colors.text,
    },
    sectionTitle: {
        fontSize: 19,
        marginTop: metrics.sm,
    },
    summaryCardContent: {
        gap: metrics.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    summaryLabel: {
        fontSize: 15,
        width: 130,
    },
    summaryColon: {
        fontSize: 15,
        color: colors.text,
        marginRight: metrics.sm,
    },
    summaryValue: {
        flex: 1,
        fontSize: 15,
        color: colors.textSecondary,
    },
    summaryValueBold: {
        color: colors.primary,
    },
});