// screens/Profile/ProfileScreen.tsx
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

import Card from '../../../components/Card';
import CustomModal from '../../../components/CustomModal';
import { colors, fonts, radius, spacing, typography } from '../../../styles/theme';

// Hardcoded per request
const PROFILE = {
    name: 'Danilla Mohamed',
    role: 'Parent',
    handle: '@PR0362',
    location: 'Egypt - Mansoura',
    phone: '+911112778919',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    coverImages: [
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
    ],
};

const WARD_DETAILS = {
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    name: 'Danilla Mohamed',
    dob: '05.Jan.2009',
    className: '11-C',
    rollNo: '20',
    admissionNo: '5326',
    bloodGroup: 'O+',
    house: 'Mansoura',
    aadharNo: '855710505543',
    permanentEducationInfo: '123456789',
};

const WARDS = [
    { id: '1', name: 'Rahul Sharma', className: '12-A' },
    { id: '2', name: 'Ananya Singh', className: '5-B' },
    { id: '3', name: 'Aarav Verma', className: '8-A' },
    { id: '4', name: 'Diya Patel', className: '4-C' },
];

function DetailPair({ label, value }: { label: string; value: string }) {
    return (
        <Text style={styles.detailLine}>
            <Text style={styles.detailLabel}>{label}: </Text>
            <Text style={styles.detailValue}>{value}</Text>
        </Text>
    );
}

export default function ProfileScreen() {
    const [isWardsModalVisible, setIsWardsModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroWrapper}>
                    <View style={styles.heroRow}>
                        {PROFILE.coverImages.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={styles.heroImage} resizeMode="cover" />
                        ))}
                    </View>

                    <Pressable
                        style={styles.infoButton}
                        onPress={() => setIsWardsModalVisible(true)}
                        hitSlop={8}
                    >
                        <Ionicons name="information" size={16} color='transparent' />
                    </Pressable>

                    <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
                </View>

                <View style={styles.infoBlock}>
                    <Text style={styles.name}>{PROFILE.name}</Text>

                    <View style={styles.metaRow}>
                        <Ionicons name="person" size={14} color={colors.textSecondary} />
                        <Text style={styles.metaText}>{PROFILE.role}</Text>

                        <View style={styles.handlePill}>
                            <Text style={[styles.handleText, {fontSize: 12, fontFamily: fonts.semiBold}]}>{PROFILE.handle}</Text>
                        </View>
                    </View>

                    <View style={styles.metaRow}>
                        <Ionicons name="location" size={14} color={colors.textSecondary} />
                        <Text style={styles.metaText}>{PROFILE.location}</Text>
                    </View>

                    <View style={styles.metaRow}>
                        <Ionicons name="call" size={14} color={colors.textSecondary} />
                        <Text style={styles.metaText}>{PROFILE.phone}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Card contentStyle={styles.wardCardContent}>
                        <View style={styles.wardHeader}>
                            <Text style={styles.wardHeaderText}>Ward's Details</Text>
                        </View>

                        <View style={styles.wardBody}>
                            <View style={styles.wardTopRow}>
                                <Image source={{ uri: WARD_DETAILS.photo }} style={styles.wardPhoto} />

                                <View style={styles.wardTopText}>
                                    <DetailPair label="Name" value={WARD_DETAILS.name} />
                                    <DetailPair label="DOB" value={WARD_DETAILS.dob} />
                                </View>
                            </View>

                            <View style={styles.wardTwoCol}>
                                <View style={styles.wardHalf}>
                                    <DetailPair label="Class" value={WARD_DETAILS.className} />
                                </View>
                                <View style={styles.wardHalf}>
                                    <DetailPair label="Roll No" value={WARD_DETAILS.rollNo} />
                                </View>
                            </View>

                            <DetailPair label="Admission No" value={WARD_DETAILS.admissionNo} />
                            <DetailPair label="Blood Group" value={WARD_DETAILS.bloodGroup} />
                            <DetailPair label="House" value={WARD_DETAILS.house} />
                            <DetailPair label="Aadhar Card No" value={WARD_DETAILS.aadharNo} />
                            <DetailPair
                                label="Permanent Education Info"
                                value={WARD_DETAILS.permanentEducationInfo}
                            />
                        </View>
                    </Card>
                </View>
            </ScrollView>

            <CustomModal
                visible={isWardsModalVisible}
                onClose={() => setIsWardsModalVisible(false)}
            >
                <FlatList
                    data={WARDS}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.wardRowDivider} />}
                    renderItem={({ item }) => (
                        <View style={styles.wardRow}>
                            <Image source={{ uri: PROFILE.avatar }} style={styles.wardRowAvatar} />
                            <View>
                                <Text style={styles.wardRowName}>{item.name}</Text>
                                <Text style={styles.wardRowClass}>Class: {item.className}</Text>
                            </View>
                        </View>
                    )}
                    ListFooterComponent={
                        <Pressable style={styles.addWardRow}>
                            <View style={styles.addWardIcon}>
                                <Ionicons name="add" size={20} color={colors.text} />
                            </View>
                            <Text style={styles.addWardText}>Add another ward</Text>
                        </Pressable>
                    }
                />
            </CustomModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: { paddingBottom: 100 },

    heroWrapper: {
        position: 'relative',
    },
    heroRow: {
        flexDirection: 'row',
        height: 230,
    },
    heroImage: {
        flex: 1,
        height: '100%',
    },
    infoButton: {
        position: 'absolute',
        top: spacing.xxxl,
        right: spacing.lg,
        width: 24,
        height: 24,
        borderRadius: radius.round,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        position: 'absolute',
        bottom: -40,
        right: spacing.xl,
        width: 76,
        height: 76,
        borderRadius: radius.round,
        borderWidth: 3,
        borderColor: colors.background,
    },

    infoBlock: {
        paddingHorizontal: spacing.xl,
        paddingTop: 20,
    },
    name: {
        ...typography.title,
        fontSize: 18,
        fontFamily: fonts.bold,
        marginBottom: spacing.md,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs,
    },
    metaText: {
        fontSize: 13,
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
    },
    handlePill: {
        backgroundColor: colors.infoBackground,
        borderRadius: radius.round,
        paddingHorizontal: spacing.md,
        paddingVertical: 2,
        marginLeft: spacing.xs,
    },
    handleText: {
        fontSize: 13,
        color: colors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.lg,
    },

    wardCardContent: {
        padding: 0,
    },
    wardHeader: {
        backgroundColor: colors.infoBackground,
        borderTopLeftRadius: radius.lg,
        borderTopRightRadius: radius.lg,
        paddingVertical: spacing.xs,
        alignItems: 'center',
    },
    wardHeaderText: {
        fontSize: 15,
        fontFamily: fonts.semiBold,
        color: colors.primary,
    },
    wardBody: {
        padding: spacing.sm,
    },
    wardTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
        gap: spacing.lg,
    },
    wardPhoto: {
        width: 56,
        height: 56,
        borderRadius: radius.md,
        borderWidth: 2,
        borderColor: colors.borderFocused,
    },
    wardTopText: {
        flex: 1,
    },
    wardTwoCol: {
        flexDirection: 'row',
    },
    wardHalf: {
        flex: 1,
    },
    detailLine: {
        marginBottom: spacing.xs,
    },
    detailLabel: {
        fontSize: 13,
        fontFamily: fonts.semiBold,
        color: colors.text,
    },
    detailValue: {
        fontSize: 13,
        color: colors.textSecondary,
    },

    // Modal — wards list
    wardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
    },
    wardRowAvatar: {
        width: 46,
        height: 46,
        borderRadius: radius.round,
    },
    wardRowName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 2,
    },
    wardRowClass: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    wardRowDivider: {
        height: 1,
        backgroundColor: colors.border,
    },
    addWardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.xl,
    },
    addWardIcon: {
        width: 36,
        height: 36,
        borderRadius: radius.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addWardText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
});