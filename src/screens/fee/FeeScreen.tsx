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

import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Dropdown, { DropdownOption } from '../../components/Dropdown';
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
                  <AppText style={[styles.tabText, activeTab === 'pay' && styles.tabTextActive]}>Pay</AppText>
              </Pressable>

              <Pressable style={styles.tabButton} onPress={() => handleTabPress('receipt')}>
                  <AppText style={[styles.tabText, activeTab === 'receipt' && styles.tabTextActive]}>
                      Receipt
                  </AppText>
              </Pressable>
          </View>

          {activeTab === 'pay' ? (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                  <Card contentStyle={styles.studentCardContent}>
                      <Image source={{ uri: STUDENT_PHOTO }} style={styles.studentPhoto} />

                      <View style={styles.studentTextBlock}>
                          <AppText style={styles.studentName}>{STUDENT.name}</AppText>
                          <AppText style={styles.studentAdmission}>Admission No. {STUDENT.admissionNo}</AppText>
                      </View>

                      <View style={styles.classPill}>
                          <AppText style={styles.classPillText}>Class {STUDENT.className}</AppText>
                      </View>
                  </Card>

                  <AppText style={styles.fieldLabel}>Mobile</AppText>
                  <View style={styles.textField}>
                      <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.textFieldIcon} />
                      <TextInput
                          value={mobile}
                          onChangeText={setMobile}
                          keyboardType="phone-pad"
                          style={styles.textFieldInput}
                      />
                  </View>

                  <AppText style={styles.fieldLabel}>Email</AppText>
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

                  <AppText style={styles.fieldLabel}>Fees Type</AppText>
                  <Dropdown
                      options={FEE_TYPE_OPTIONS}
                      value={feeType}
                      onChange={setFeeType}
                      placeholder="Select fee type"
                      icon="create-outline"
                  />

                  <AppText style={styles.fieldLabel}>Installment</AppText>
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
                  <AppText style={styles.fieldLabel}>Select Year</AppText>
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
                                  <AppText style={styles.receiptDate}>{receipt.date}</AppText>
                                  <AppText style={styles.receiptClass}>Class: {receipt.className}</AppText>
                              </View>

                              <View style={styles.receiptDivider} />

                              <View style={styles.receiptRow}>
                                  <AppText style={styles.receiptLabel}>Receipt No: <AppText style={styles.receiptValue}>{receipt.receiptNo}</AppText></AppText>
                                  <AppText style={styles.receiptLabel}>Payment Mode: <AppText style={styles.receiptValue}>{receipt.paymentMode}</AppText></AppText>
                              </View>

                              <AppText style={styles.receiptLabel}>
                                  Paid Amount: <AppText style={styles.receiptValue}>{receipt.paidAmount}</AppText>
                              </AppText>
                              <AppText style={styles.receiptLabel}>
                                  Installment: <AppText style={styles.receiptValue}>{receipt.installment}</AppText>
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
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: colors.grayBackground,
        borderRadius: metrics.round,
        marginHorizontal: metrics.xl,
        marginTop: metrics.xl,
        marginBottom: metrics.lg,
        height: 52,
        overflow: 'hidden',
    },
    tabPill: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        backgroundColor: colors.primary,
        borderRadius: metrics.round,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.white,
        fontWeight: '700',
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
        // ...typography.title,
        fontSize: 16,
        marginBottom: 2,
    },
    studentAdmission: {
        // ...typography.description,
    },
    classPill: {
        backgroundColor: colors.grayBackground,
        borderRadius: metrics.round,
        paddingHorizontal: metrics.md,
        paddingVertical: metrics.xs,
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
        marginBottom: metrics.sm,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.xs,
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
    gap: metrics.sm,
    marginTop: metrics.md,
},

receiptActionButton: {
    flex: 1,
    height: 44,
    borderRadius: metrics.md,
},
});