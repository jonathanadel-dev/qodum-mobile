import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Dropdown, { DropdownOption } from '../../components/Dropdown';
import SegmentedTabs from '../../components/SegmentedTabs';
import { colors, metrics } from '../../styles/theme';
import AppText from '../../components/AppText';

type Tab = 'pay' | 'receipt';

const STUDENT_PHOTO = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';

const STUDENT = {
    name: 'Test Hw',
    admissionNo: '5364',
    className: '11-C',
};

const FEE_TYPE_OPTIONS: DropdownOption[] = [
    { label: 'Exam Fee', value: 'exam' },
    { label: 'Tuition Fee', value: 'tuition' },
    { label: 'Transport Fee', value: 'transport' },
];

const INSTALLMENT_OPTIONS: DropdownOption[] = [
    { label: 'April-May/June-July', value: 'apr_jul' },
    { label: 'August-Sep/Oct-Nov', value: 'aug_nov' },
    { label: 'Dec-Jan/Feb-Mar', value: 'dec_mar' },
];

const YEAR_OPTIONS: DropdownOption[] = [
    { label: '2024-2025', value: '2024-2025' },
    { label: '2023-2024', value: '2023-2024' },
];

type Receipt = {
    id: string;
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

const RECEIPTS: Receipt[] = [
    {
        id: 'r1',
        date: '01 May, 2025',
        className: '11-C',
        receiptNo: '5342',
        paymentMode: 'Cash',
        paidAmount: '₹18,000.00',
        installment: 'April-May/June-July/Aug-Sep/Oct-Nov',
        transactionId: 'TXN45879632',
        feeType: 'Tuition Fee/Sports Fee/Lab Fee',
        breakdown: {
            tuitionFee: '₹12,000.00',
            labFee: '₹3,000.00',
            examFee: '₹2,000.00',
            sportsFee: '₹1,000.00',
        },
    },
    {
        id: 'r2',
        date: '15-Mar-2025',
        className: '1-A',
        receiptNo: '756',
        paymentMode: 'Online',
        paidAmount: '₹12500.00',
        installment: 'Jan-Feb/Mar-Apr',
        transactionId: 'TXN31204587',
        feeType: 'Tuition Fee/Exam Fee',
        breakdown: {
            tuitionFee: '₹10,000.00',
            labFee: '₹0.00',
            examFee: '₹2,500.00',
            sportsFee: '₹0.00',
        },
    },
    {
        id: 'r3',
        date: '10-Dec-2024',
        className: '1-A',
        receiptNo: '701',
        paymentMode: 'Online',
        paidAmount: '₹12500.00',
        installment: 'Oct-Nov/Dec-Jan',
        transactionId: 'TXN28091144',
        feeType: 'Tuition Fee/Lab Fee',
        breakdown: {
            tuitionFee: '₹10,000.00',
            labFee: '₹2,500.00',
            examFee: '₹0.00',
            sportsFee: '₹0.00',
        },
    },
];

export default function FeeScreen({ navigation }: NativeStackScreenProps<any>) {
    const [activeTab, setActiveTab] = useState<Tab>('pay');
    const [mobile, setMobile] = useState('9889123450');
    const [email, setEmail] = useState('abc@gmail.com');
    const [feeType, setFeeType] = useState<string | null>('exam');
    const [installment, setInstallment] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>('2024-2025');

    const handlePayNow = () => {
        // TODO: wire up real payment flow
    };
    const handleDownloadReceipt = () => {
        // TODO: wire up real download
    };
    const handleViewReceipt = (receipt: Receipt) => {
        navigation.navigate('FeeDetails', { receipt, student: STUDENT });
    };
    const handleDownloadReceiptRow = (receipt: Receipt) => {
        // TODO: wire up real download
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Fee" isStack />

            <SegmentedTabs
                options={[
                    { label: 'Pay', value: 'pay' },
                    { label: 'Receipt', value: 'receipt' },
                ]}
                value={activeTab}
                onChange={setActiveTab}
                style={styles.tabsContainer}
            />

            {activeTab === 'pay' ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Card contentStyle={styles.studentCardContent}>
                        <Image source={{ uri: STUDENT_PHOTO }} style={styles.studentPhoto} />

                        <View style={styles.studentTextBlock}>
                            <AppText variant="h3" style={styles.studentName}>{STUDENT.name}</AppText>
                            <AppText variant="desc">Admission No. {STUDENT.admissionNo}</AppText>
                        </View>

                        <View style={styles.classPill}>
                            <AppText variant="text" style={styles.classPillText}>Class {STUDENT.className}</AppText>
                        </View>
                    </Card>

                    <AppText variant="h3" style={styles.fieldLabel}>Mobile</AppText>
                    <View style={styles.textField}>
                        <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.textFieldIcon} />
                        <TextInput
                            value={mobile}
                            onChangeText={setMobile}
                            keyboardType="phone-pad"
                            style={styles.textFieldInput}
                        />
                    </View>

                    <AppText variant="h3" style={styles.fieldLabel}>Email</AppText>
                    <View style={styles.textField}>
                        <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={styles.textFieldIcon} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.textFieldInput}
                        />
                    </View>

                    <AppText variant="h3" style={styles.fieldLabel}>Fees Type</AppText>
                    <Dropdown
                        options={FEE_TYPE_OPTIONS}
                        value={feeType}
                        onChange={setFeeType}
                        placeholder="Select fee type"
                        icon="create-outline"
                    />

                    <AppText variant="h3" style={styles.fieldLabel}>Installment</AppText>
                    <Dropdown
                        options={INSTALLMENT_OPTIONS}
                        value={installment}
                        onChange={setInstallment}
                        placeholder="None Selected"
                        icon="create-outline"
                    />

                    <Button
                        type="gradient"
                        label="Pay Now"
                        onPress={handlePayNow}
                        style={styles.payNowButton}
                    />

                    <Button
                        type="plain"
                        label="Download Receipt"
                        onPress={handleDownloadReceipt}
                        style={styles.downloadReceiptButton}
                        textStyle={styles.downloadReceiptText}
                    />
                </ScrollView>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <AppText variant="h3" style={styles.fieldLabel}>Select Year</AppText>
                    <Dropdown
                        options={YEAR_OPTIONS}
                        value={year}
                        onChange={setYear}
                        placeholder="Select year"
                        icon="calendar-outline"
                    />

                    <View style={styles.receiptList}>
                        {RECEIPTS.map((receipt) => (
                            <Card key={receipt.id} contentStyle={styles.receiptCardContent}>
                                <View style={styles.receiptTopRow}>
                                    <AppText variant="h3" style={styles.receiptDate}>{receipt.date}</AppText>
                                    <AppText variant="desc">Class: {receipt.className}</AppText>
                                </View>

                                <View style={styles.receiptDivider} />

                                <View style={styles.receiptRow}>
                                    <AppText variant="h3" style={styles.receiptLabel}>
                                        Receipt No: <AppText variant="desc">{receipt.receiptNo}</AppText>
                                    </AppText>
                                    <AppText variant="h3" style={styles.receiptLabel}>
                                        Payment Mode: <AppText variant="desc">{receipt.paymentMode}</AppText>
                                    </AppText>
                                </View>

                                <AppText variant="h3" style={styles.receiptLabel}>
                                    Paid Amount: <AppText variant="desc">{receipt.paidAmount}</AppText>
                                </AppText>
                                <AppText variant="h3" style={styles.receiptLabel}>
                                    Installment: <AppText variant="desc">{receipt.installment}</AppText>
                                </AppText>

                                <View style={styles.receiptActions}>
                                    <Button
                                        type="gradient"
                                        label="View"
                                        icon={<Ionicons name="eye-outline" size={16} color={colors.white} />}
                                        onPress={() => handleViewReceipt(receipt)}
                                        style={styles.receiptActionButton}
                                    />
                                    <Button
                                        type="gradient"
                                        label="Download"
                                        icon={<Ionicons name="arrow-down-outline" size={16} color={colors.white} />}
                                        onPress={() => handleDownloadReceiptRow(receipt)}
                                        style={styles.receiptActionButton}
                                    />
                                </View>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, paddingBottom: metrics.xxxl },
    tabsContainer: {
        marginHorizontal: metrics.xl,
        marginTop: metrics.xl,
        marginBottom: metrics.lg,
    },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingBottom: metrics.xxxl,
        gap: metrics.md,
    },
    studentCardContent: {
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
        backgroundColor: colors.grayBackground,
        borderRadius: metrics.round,
        paddingHorizontal: metrics.md,
        paddingVertical: metrics.xs,
    },
    classPillText: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    fieldLabel: {
        fontSize: 15,
        marginTop: metrics.sm,
    },
    textField: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: metrics.md,
        backgroundColor: colors.grayBackground,
        paddingHorizontal: metrics.lg,
    },
    textFieldIcon: {
        marginRight: metrics.sm,
    },
    textFieldInput: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        padding: 0,
    },
    payNowButton: {
        width: '100%',
        height: 54,
        marginTop: metrics.lg,
    },
    downloadReceiptButton: {
        width: '100%',
        height: 54,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: metrics.md,
    },
    downloadReceiptText: {
        color: colors.primary,
    },
    receiptList: {
        gap: metrics.lg,
        marginTop: metrics.md,
    },
    receiptCardContent: {
        gap: metrics.xs,
    },
    receiptTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.sm,
    },
    receiptDate: {
        fontSize: 15,
        color: colors.primary,
    },
    receiptDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginBottom: metrics.sm,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.xs,
    },
    receiptLabel: {
        fontSize: 13,
        color: colors.text,
    },
    receiptActions: {
        flexDirection: 'row',
        gap: metrics.sm,
        marginTop: metrics.md,
    },
    receiptActionButton: {
        flex: 1,
        height: 44,
        borderRadius: metrics.md,
    },
});