import React, { useRef, useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Dropdown, { DropdownOption } from '../../../components/Dropdown';
import { colors, radius, spacing, typography } from '../../../styles/theme';

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

// Receipt type — extended
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

// RECEIPTS — extended with the new fields
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

  // State
  const [activeTab, setActiveTab] = useState<Tab>('pay');
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [mobile, setMobile] = useState('9889123450');
  const [email, setEmail] = useState('abc@gmail.com');
  const [feeType, setFeeType] = useState<string | null>('exam');
  const [installment, setInstallment] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>('2024-2025');

  const pillWidth = containerWidth ? containerWidth / 2 : 0;


  // Handlers
  const handleTabPress = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === 'pay' ? 0 : 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
};
  const handlePayNow = () => {
      // TODO: wire up real payment flow
  };
  const handleDownloadReceipt = () => {
      // TODO: wire up real download
  };
  // handleViewReceipt — corrected route name, now passes student too
  const handleViewReceipt = (receipt: Receipt) => {
      navigation.navigate('FeeDetails', { receipt, student: STUDENT });
  };
  const handleDownloadReceiptRow = (receipt: Receipt) => {
      // TODO: wire up real download
  };

  return (
      <View style={styles.container}>
          <Header navigation={navigation} title="Fee" isStack />

          <View
              style={styles.tabsContainer}
              onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          >
              {containerWidth > 0 && (
                  <Animated.View
                      style={[
                          styles.tabPill,
                          {
                              width: pillWidth,
                              transform: [
                                  {
                                      translateX: slideAnim.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [0, pillWidth],
                                      }),
                                  },
                              ],
                          },
                      ]}
                  />
              )}

              <Pressable style={styles.tabButton} onPress={() => handleTabPress('pay')}>
                  <Text style={[styles.tabText, activeTab === 'pay' && styles.tabTextActive]}>Pay</Text>
              </Pressable>

              <Pressable style={styles.tabButton} onPress={() => handleTabPress('receipt')}>
                  <Text style={[styles.tabText, activeTab === 'receipt' && styles.tabTextActive]}>
                      Receipt
                  </Text>
              </Pressable>
          </View>

          {activeTab === 'pay' ? (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                  <Card contentStyle={styles.studentCardContent}>
                      <Image source={{ uri: STUDENT_PHOTO }} style={styles.studentPhoto} />

                      <View style={styles.studentTextBlock}>
                          <Text style={styles.studentName}>{STUDENT.name}</Text>
                          <Text style={styles.studentAdmission}>Admission No. {STUDENT.admissionNo}</Text>
                      </View>

                      <View style={styles.classPill}>
                          <Text style={styles.classPillText}>Class {STUDENT.className}</Text>
                      </View>
                  </Card>

                  <Text style={styles.fieldLabel}>Mobile</Text>
                  <View style={styles.textField}>
                      <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.textFieldIcon} />
                      <TextInput
                          value={mobile}
                          onChangeText={setMobile}
                          keyboardType="phone-pad"
                          style={styles.textFieldInput}
                      />
                  </View>

                  <Text style={styles.fieldLabel}>Email</Text>
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

                  <Text style={styles.fieldLabel}>Fees Type</Text>
                  <Dropdown
                      options={FEE_TYPE_OPTIONS}
                      value={feeType}
                      onChange={setFeeType}
                      placeholder="Select fee type"
                      icon="create-outline"
                  />

                  <Text style={styles.fieldLabel}>Installment</Text>
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
                  <Text style={styles.fieldLabel}>Select Year</Text>
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
                                  <Text style={styles.receiptDate}>{receipt.date}</Text>
                                  <Text style={styles.receiptClass}>Class: {receipt.className}</Text>
                              </View>

                              <View style={styles.receiptDivider} />

                              <View style={styles.receiptRow}>
                                  <Text style={styles.receiptLabel}>Receipt No: <Text style={styles.receiptValue}>{receipt.receiptNo}</Text></Text>
                                  <Text style={styles.receiptLabel}>Payment Mode: <Text style={styles.receiptValue}>{receipt.paymentMode}</Text></Text>
                              </View>

                              <Text style={styles.receiptLabel}>
                                  Paid Amount: <Text style={styles.receiptValue}>{receipt.paidAmount}</Text>
                              </Text>
                              <Text style={styles.receiptLabel}>
                                  Installment: <Text style={styles.receiptValue}>{receipt.installment}</Text>
                              </Text>

                              <View style={styles.receiptActions}>
                                    <Button
                                        type="gradient"
                                        label="View"
                                        icon={<Ionicons name="eye-outline" size={16} color={colors.background} />}
                                        onPress={() => handleViewReceipt(receipt)}
                                        style={styles.receiptActionButton}
                                    />
                                    <Button
                                        type="gradient"
                                        label="Download"
                                        icon={<Ionicons name="arrow-down-outline" size={16} color={colors.background} />}
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
    container: { flex: 1, backgroundColor: colors.background, paddingBottom: spacing.xxxl },
    tabsContainer: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: colors.inputBackground,
        borderRadius: radius.round,
        marginHorizontal: spacing.xl,
        marginTop: spacing.xl,
        marginBottom: spacing.lg,
        height: 52,
        overflow: 'hidden',
    },
    tabPill: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        backgroundColor: colors.primary,
        borderRadius: radius.round,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.background,
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
        gap: spacing.md,
    },
    studentCardContent: {
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
        backgroundColor: colors.inputBackground,
        borderRadius: radius.round,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
    },
    classPillText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    fieldLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
        marginTop: spacing.sm,
    },
    textField: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: spacing.lg,
    },
    textFieldIcon: {
        marginRight: spacing.sm,
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
        marginTop: spacing.lg,
    },
    downloadReceiptButton: {
        width: '100%',
        height: 54,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: radius.md,
    },
    downloadReceiptText: {
        color: colors.primary,
    },
    receiptList: {
        gap: spacing.lg,
        marginTop: spacing.md,
    },
    receiptCardContent: {
        gap: spacing.xs,
    },
    receiptTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    receiptDate: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.primary,
    },
    receiptClass: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    receiptDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginBottom: spacing.sm,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    receiptLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
    },
    receiptValue: {
        fontWeight: '400',
        color: colors.textSecondary,
    },
receiptActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
},

receiptActionButton: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
},
});