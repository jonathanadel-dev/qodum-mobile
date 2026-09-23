import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../../../components/Header';
import { colors, metrics } from '../../../../styles/theme';
import { AuthStackParamList } from '../../../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'AdmissionDetails'>;

function DetailRow({ label, value }: { label: string; value?: string }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value || '-'}</Text>
        </View>
    );
}

export default function AdmissionDetailsScreen({ navigation, route }: Props) {
    const { student } = route.params;

    const fullName = [student.name, student.middle_name, student.last_name]
        .filter(Boolean)
        .join(' ');

    const dob =
        student.date_of_birth instanceof Date
            ? student.date_of_birth.toLocaleDateString('en-GB')
            : String(student.date_of_birth);

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Admission Details" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.avatarWrapper}>
                    {student.image ? (
                        <Image source={{ uri: student.image }} style={styles.avatarImage} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={40} color={colors.textSecondary} />
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <DetailRow label="Student Name" value={fullName} />
                    <DetailRow label="Father's Name" value={student.father_name} />
                    <DetailRow label="Mother's Name" value={student.mother_name} />

                    <View style={styles.twoColRow}>
                        <View style={styles.halfCol}>
                            <DetailRow label="Date of Birth" value={dob} />
                        </View>
                        <View style={styles.halfCol}>
                            <DetailRow label="Gender" value={student.gender} />
                        </View>
                    </View>

                    <DetailRow label="Permanent Address" value={student.address} />

                    <View style={styles.twoColRow}>
                        <View style={styles.halfCol}>
                            <DetailRow label="Contact Number" value={student.father_mobile} />
                        </View>
                        <View style={styles.halfCol}>
                            <DetailRow label="Alternate Contact" value={student.mother_mobile} />
                        </View>
                    </View>

                    <DetailRow label="Class" value={student.class_name} />
                    <DetailRow label="Father's Occupation" value={student.father_occupation} />
                    <DetailRow label="Mother's Occupation" value={student.mother_occupation} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.xxl,
        paddingBottom: metrics.xxxl,
    },
    avatarWrapper: {
        alignItems: 'center',
        marginBottom: metrics.xxl,
    },
    avatarImage: {
        width: 110,
        height: 110,
        borderRadius: metrics.round,
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: metrics.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.lg,
        padding: metrics.xl,
    },
    row: {
        marginBottom: metrics.lg,
    },
    twoColRow: {
        flexDirection: 'row',
        gap: metrics.lg,
    },
    halfCol: {
        flex: 1,
    },
    label: {
        // ...typography.title,
        fontSize: 15,
        marginBottom: 2,
    },
    value: {
        // ...typography.description,
        fontSize: 14,
    },
});