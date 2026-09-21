import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import HomeHeader from '../../../components/home/HomeHeader';
import { colors, fonts, radius, spacing, typography } from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../../context/AuthContext';

// image paths corrected
const WARD_AVATAR = { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' };
const HEADER_AVATAR = { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' };
const TODO_ILLUSTRATION = require('../../../assets/images/home/card-logo.png');

const NEWS_ICON = require('../../../assets/images/home/news.png');
const EVENTS_ICON = require('../../../assets/images/home/events.png');
const BULLETIN_ICON = require('../../../assets/images/home/bulletin.png');

const ASSIGNMENTS_ICON = require('../../../assets/images/home/assignments.png');
const ATTENDANCE_ICON = require('../../../assets/images/home/attendance.png');
const FEE_ICON = require('../../../assets/images/home/fee.png');

const CHAT_ICON = require('../../../assets/images/home/chat.png');
const SMS_ICON = require('../../../assets/images/home/sms.png');

const EDU_NEWS_ICON = require('../../../assets/images/home/edu-news.png');
const QUOTE_ICON = require('../../../assets/images/home/quote.png');
const THOUGHT_ICON = require('../../../assets/images/home/thought.png');
const CITY_ICON = require('../../../assets/images/home/city.png');
const WORLD_ICON = require('../../../assets/images/home/world.png');

const WARDS = [
    { id: 'w1', avatar: WARD_AVATAR },
    { id: 'w2', avatar: WARD_AVATAR },
    { id: 'w3', avatar: WARD_AVATAR },
    { id: 'w4', avatar: WARD_AVATAR },
];

const SCHOOL_UPDATES = [
    { id: 'news', icon: NEWS_ICON, title: 'News', count: 3 },
    { id: 'events', icon: EVENTS_ICON, title: 'Events', count: 3 },
    { id: 'bulletin', icon: BULLETIN_ICON, title: 'Bulletin', count: 3 },
];

const ACADEMICS = [
    { id: 'assignments', icon: ASSIGNMENTS_ICON, title: 'Assignments', count: 3 },
    { id: 'attendance', icon: ATTENDANCE_ICON, title: 'Attendance', count: 3 },
    { id: 'fee', icon: FEE_ICON, title: 'Fee', count: 3 },
];

const COMMUNICATION = [
    { id: 'chat', icon: CHAT_ICON, title: 'Chat', count: 3, badge: 0 },
    { id: 'sms', icon: SMS_ICON, title: 'SMS', count: 3, badge: 1 },
];

const EDISAPP_TODAY = [
    { id: 'edu-news', icon: EDU_NEWS_ICON, title: 'Edu-News' },
    { id: 'quote', icon: QUOTE_ICON, title: 'Quote' },
    { id: 'thought', icon: THOUGHT_ICON, title: 'Thought' },
    { id: 'city', icon: CITY_ICON, title: 'City' },
    { id: 'world', icon: WORLD_ICON, title: 'World' },
];

function PressableScale({
    onPress,
    children,
    style,
}: {
    onPress?: () => void;
    children: React.ReactNode;
    style?: any;
}) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 35, bounciness: 0 }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 25, bounciness: 5 }).start();
    };

    return (
        <Animated.View style={[{ transform: [{ scale }] }, style]}>
            <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                {children}
            </Pressable>
        </Animated.View>
    );
}

function WardAvatar({ avatar, selected, onPress }: { avatar: any; selected: boolean; onPress: () => void }) {
    const badgeAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(badgeAnim, {
            toValue: selected ? 1 : 0,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
    }, [selected]);

    return (
        <PressableScale onPress={onPress} style={styles.wardAvatarWrapper}>
            <Image source={avatar} style={styles.wardAvatarImage} />
            <Animated.View
                style={[
                    styles.wardBadge,
                    {
                        opacity: badgeAnim,
                        transform: [{ scale: badgeAnim }],
                    },
                ]}
            >
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            </Animated.View>
        </PressableScale>
    );
}

function AnimatedProgressBar({ value }: { value: number }) {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: value,
            duration: 900,
            useNativeDriver: false, // width can't use the native driver
        }).start();
    }, [value]);

    return (
        <View style={styles.progressTrack}>
            <Animated.View
                style={[
                    styles.progressFill,
                    {
                        width: widthAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                        }),
                    },
                ]}
            />
        </View>
    );
}

// HomeScreen.tsx — updated card components only; everything above (imports, data arrays, PressableScale, WardAvatar, AnimatedProgressBar) stays exactly as you have it

function UpdateCard({ icon, title, count, onDetailsPress }: { icon: any; title: string; count: number; onDetailsPress: () => void }) {
    return (
        <PressableScale onPress={onDetailsPress} style={styles.updateCard}>
            <View style={styles.updateCardBody}>
                <View style={styles.updateIconFrame}>
                    <Image source={icon} style={styles.updateIcon} resizeMode="contain" />
                </View>

                <View style={styles.titleCountRow}>
                    <Text style={styles.updateTitle}>{title}</Text>
                    <Text style={styles.updateCount}>{count}</Text>
                </View>
            </View>

            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailsButton}
            >
                <Text style={styles.detailsButtonText}>Details</Text>
            </LinearGradient>
        </PressableScale>
    );
}

function AcademicCard({ icon, title, count, onDetailsPress }: { icon: any; title: string; count: number; onDetailsPress: () => void }) {
    return (
        <View style={styles.academicWrapper}>
            <View style={styles.academicIconCircle}>
                <Image source={icon} style={styles.academicIcon} resizeMode="contain" />
            </View>

            <PressableScale onPress={onDetailsPress} style={styles.academicCard}>
                <View style={styles.academicCardBody}>
                    <View style={styles.titleCountRow}>
                        <Text style={styles.updateTitle}>{title}</Text>
                        <Text style={styles.updateCount}>{count}</Text>
                    </View>
                </View>

                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.detailsButton}
                >
                    <Text style={styles.detailsButtonText}>Details</Text>
                </LinearGradient>
            </PressableScale>
        </View>
    );
}

function CommunicationCard({ icon, title, count, badge, onPress }: { icon: any; title: string; count: number; badge: number; onPress: () => void }) {
    return (
        <PressableScale onPress={onPress} style={styles.commCardWrapper}>
            <View style={styles.commCard}>
                <View style={styles.commIconFrame}>
                    <Image source={icon} style={styles.updateIcon} resizeMode="contain" />
                    {badge > 0 && (
                        <View style={styles.commBadge}>
                            <Text style={styles.commBadgeText}>{badge}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.titleCountRow}>
                    <Text style={styles.updateTitle}>{title}</Text>
                    <Text style={styles.updateCount}>{count}</Text>
                </View>
            </View>
        </PressableScale>
    );
}

export default function HomeScreen({ navigation }: NativeStackScreenProps<any>) {
    const [selectedWard, setSelectedWard] = useState<string>('w1');
    const {logout} = useAuth();

    return (
        <View style={styles.container}>
            <HomeHeader
                name="Danilla"
                grade="Grade-IX-A"
                role="Student"
                avatar={HEADER_AVATAR}
                onLogoutPress={logout}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.wardsRow}>
                    {WARDS.map((ward) => (
                        <WardAvatar
                            key={ward.id}
                            avatar={ward.avatar}
                            selected={selectedWard === ward.id}
                            onPress={() => setSelectedWard(ward.id)}
                        />
                    ))}

                    <PressableScale onPress={() => {}} style={styles.addWardWrapper}>
                        <View style={styles.addWardCircle}>
                            <Ionicons name="add" size={24} color={colors.primary} />
                        </View>
                    </PressableScale>
                </View>

                <View style={styles.progressCard}>
                    <View style={styles.progressColumn}>
                        <View style={styles.progressRow}>
                            <Text style={styles.progressLabel}>Attendance</Text>
                            <Text style={styles.progressValue}>85</Text>
                        </View>
                        <AnimatedProgressBar value={85} />

                        <View style={[styles.progressRow, { marginTop: spacing.lg }]}>
                            <Text style={styles.progressLabel}>Fee</Text>
                            <Text style={styles.progressValue}>70</Text>
                        </View>
                        <AnimatedProgressBar value={70} />
                    </View>

                    <Image source={TODO_ILLUSTRATION} style={styles.progressIllustration} resizeMode="contain" />
                </View>

                <Text style={styles.sectionTitle}>School Updates</Text>
                <View style={styles.threeColRow}>
                    {SCHOOL_UPDATES.map((item) => (
                        <UpdateCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            count={item.count}
                            onDetailsPress={() => {}}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Academics</Text>
                <View style={styles.threeColRow}>
                    {ACADEMICS.map((item) => (
                        <AcademicCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            count={item.count}
                            onDetailsPress={() => {}}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Communication</Text>
                <View style={styles.twoColRow}>
                    {COMMUNICATION.map((item) => (
                        <CommunicationCard
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            count={item.count}
                            badge={item.badge}
                            onPress={() => {}}
                        />
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Edisapp Today</Text>
                <View style={styles.fiveColRow}>
                    {EDISAPP_TODAY.map((item) => (
                        <PressableScale key={item.id} onPress={() => {}} style={styles.edisappItem}>
                            <View style={styles.edisappIconFrame}>
                                <Image source={item.icon} style={styles.edisappIcon} resizeMode="contain" />
                            </View>
                            <Text style={styles.edisappTitle}>{item.title}</Text>
                        </PressableScale>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingBottom: spacing.xxxl * 2 },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.sm,
        paddingBottom: spacing.xxxl,
    },
    titleCountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
  },

    // Wards row
    wardsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    wardAvatarWrapper: {
        marginRight: spacing.md,
    },
    wardAvatarImage: {
        width: 44,
        height: 44,
        borderRadius: radius.round,
    },
    wardBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: colors.background,
        borderRadius: radius.round,
    },
    addWardWrapper: {},
    addWardCircle: {
        width: 58,
        height: 58,
        borderRadius: radius.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Progress card
    progressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.iconBackground,
        borderRadius: radius.xl,
        padding: spacing.xl,
        marginBottom: spacing.xxl,
    },
    progressColumn: {
        flex: 1,
        marginRight: spacing.md,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressLabel: {
        fontSize: 15,
        fontFamily: fonts.bold,
        color: colors.text,
    },
    progressValue: {
        fontSize: 13,
        fontFamily: fonts.semiBold,
        color: colors.text,
    },
    progressTrack: {
        height: 8,
        borderRadius: radius.round,
        backgroundColor: colors.background,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: radius.round,
        backgroundColor: colors.gradientEnd,
    },
    progressIllustration: {
        width: 100,
        height: 100,
    },

    sectionTitle: {
        ...typography.title,
        fontSize: 20,
        marginBottom: spacing.md,
    },

    // School Updates / Academics shared grid
    threeColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xxl,
    },
    updateCard: {
        width: '31%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    updateCardBody: {
        padding: spacing.md,
        alignItems: 'flex-start',
    },
    updateIconFrame: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        backgroundColor: colors.iconFrameBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        overflow: 'hidden',
    },
    updateIcon: {
        width: '70%',
        height: '70%',
    },
    updateTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.text,
    },
    updateCount: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    detailsButtonWrapper: {},
    detailsButton: {
        paddingVertical: spacing.sm,
        alignItems: 'center',
    },
    detailsButtonText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.background,
    },

    // Academics — icon overlaps card top
    academicWrapper: {
        width: '31%',
        alignItems: 'center',
        marginTop: 30,
    },
    academicIconCircle: {
        width: 60,
        height: 60,
        borderRadius: radius.round,
        backgroundColor: colors.sectionBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -30,
        zIndex: 2,
        overflow: 'hidden',
    },
    academicIcon: {
        width: '65%',
        height: '65%',
    },
    academicCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        overflow: 'hidden',
        paddingTop: 34,
    },
    academicCardBody: {
        alignItems: 'center',
        paddingBottom: spacing.md,
    },

    // Communication
    twoColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xxl,
    },
    commCardWrapper: {
        width: '48%',
    },
    commCard: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing.md,
        alignItems: 'flex-start',
    },
    commIconFrame: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        backgroundColor: colors.iconFrameBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        position: 'relative',
        overflow: 'visible',
    },
    commBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        minWidth: 18,
        height: 18,
        borderRadius: radius.round,
        backgroundColor: colors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    commBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.background,
    },

    // Edisapp Today
    fiveColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    edisappItem: {
        alignItems: 'center',
        width: '18%',
    },
    edisappIconFrame: {
        width: 52,
        height: 52,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
        backgroundColor: colors.iconFrameBackground,
        overflow: 'hidden',
    },
    edisappIcon: {
        width: '65%',
        height: '65%',
    },
    edisappTitle: {
        fontSize: 11,
        color: colors.text,
        textAlign: 'center',
    },
});