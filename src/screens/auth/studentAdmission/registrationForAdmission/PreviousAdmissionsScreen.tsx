import React, { useCallback, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';

import Header from '../../../../components/Header';
import Card from '../../../../components/Card';
import Button from '../../../../components/Button';
import { colors, radius, spacing, typography } from '../../../../styles/theme';
import { getMyAdmittedStudents, StudentRecord } from '../../../../lib/localDB';

export default function PreviousAdmissionsScreen({ navigation, route }: NativeStackScreenProps<any>) {
    const { schoolCode } = route.params as { schoolCode: string };
    const [students, setStudents] = useState<StudentRecord[]>([]);

    // Re-fetch every time the screen regains focus, so a newly-added
    // student shows up immediately after "New Registration" completes.
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            getMyAdmittedStudents().then((result) => {
                if (isActive) setStudents(result);
            });
            return () => {
                isActive = false;
            };
        }, []),
    );

    const handleViewStudent = (student: StudentRecord) => {
        navigation.navigate('AdmissionDetails', {
            schoolCode,
            admissionId: student.admissionNo,
            student,
        });
    };

    const handlePayFee = (student: StudentRecord) => {
        navigation.navigate('Fee', {student});
    };

    const handleNewRegistration = () => {
        navigation.navigate('StudentAdmissionForm', { schoolCode });
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Previous Admissions" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {students.map((student) => {
                    const fullName = [student.name, student.middle_name, student.last_name]
                        .filter(Boolean)
                        .join(' ');

                    return (
                        <Card
                            key={student.admissionNo}
                            onPress={() => handleViewStudent(student)}
                            contentStyle={styles.studentCardContent}
                        >
                            {student.image ? (
                                <Image source={{ uri: student.image }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <Ionicons name="person" size={24} color={colors.textSecondary} />
                                </View>
                            )}

                            <View style={styles.studentTextBlock}>
                                <Text style={styles.studentName}>Name: <Text style={styles.studentValue}>{fullName}</Text></Text>
                                <Text style={styles.studentName}>Applied For: <Text style={styles.studentValue}>{student.class_name}</Text></Text>
                                <Text style={styles.studentName}>Admission No.: <Text style={styles.studentValue}>{student.admissionNo}</Text></Text>

                                <Button
                                    type="plain"
                                    label="Pay Fee"
                                    onPress={() => handlePayFee(student)}
                                    style={styles.payFeeButton}
                                    textStyle={styles.payFeeText}
                                />
                            </View>
                        </Card>
                    );
                })}

                <Button
                    type="plain"
                    label="New Registration"
                    icon={<Ionicons name="person-add-outline" size={18} color={colors.primary} />}
                    onPress={handleNewRegistration}
                    style={styles.newRegistrationButton}
                    textStyle={styles.newRegistrationText}
                />
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
        gap: spacing.lg,
    },
    studentCardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: radius.round,
        marginRight: spacing.lg,
    },
    avatarPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: radius.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
    },
    studentTextBlock: {
        flex: 1,
    },
    studentName: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    studentValue: {
        fontWeight: '400',
        color: colors.textSecondary,
    },
    payFeeButton: {
        alignSelf: 'flex-start',
        height: 34,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.round,
        backgroundColor: colors.infoBackground,
        marginTop: spacing.xs,
    },
    payFeeText: {
        fontSize: 13,
        color: colors.primary,
    },
    newRegistrationButton: {
        width: '100%',
        height: 54,
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: radius.md,
        marginTop: spacing.sm,
    },
    newRegistrationText: {
        color: colors.primary,
        fontSize: 15,
    },
});