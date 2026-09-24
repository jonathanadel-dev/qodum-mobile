// src/screens/dashboard/HomeScreen.tsx
import React, { useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import HomeHeader from '../../../components/home/HomeHeader';
import { colors, metrics } from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../../context/AuthContext';
import AppText from '../../../components/AppText';
import { usePressScale } from '../../../hooks/animations/usePressScale';
import { useToggleSpring } from '../../../hooks/animations/useToggleSpring';
import { useAnimatedProgress } from '../../../hooks/animations/useAnimatedProgress';

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
    const { scale, onPressIn, onPressOut } = usePressScale();

    return (
        <Animated.View style={[{ transform: [{ scale }] }, style]}>
            <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                {children}
            </Pressable>
        </Animated.View>
    );
}

function WardAvatar({ avatar, selected, onPress }: { avatar: any; selected: boolean; onPress: () => void }) {
    const badgeAnim = useToggleSpring(selected);

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
    const width = useAnimatedProgress(value);

    return (
        <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width }]} />
        </View>
    );
}

function UpdateCard({ icon, title, count, onDetailsPress }: { icon: any; title: string; count: number; onDetailsPress: () => void }) {
    return (
        <PressableScale onPress={onDetailsPress} style={styles.updateCard}>
            <View style={styles.updateCardBody}>
                <View style={styles.updateIconFrame}>
                    <Image source={icon} style={styles.updateIcon} resizeMode="contain" />
                </View>

                <View style={styles.titleCountRow}>
                    <AppText variant="h3" style={styles.updateTitle}>{title}</AppText>
                    <AppText variant="desc">{count}</AppText>
                </View>
            </View>

            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailsButton}
            >
                <AppText variant="h3" style={styles.detailsButtonText}>Details</AppText>
            </LinearGradient>
        </PressableScale>
    );
}

// AcademicCard — unchanged from before, just confirming for context
function AcademicCard({ icon, title, count, onDetailsPress }: { icon: any; title: string; count: number; onDetailsPress: () => void }) {
    return (
        <PressableScale onPress={onDetailsPress} style={styles.academicWrapper}>
            <View style={styles.academicIconCircle}>
                <Image source={icon} style={styles.academicIcon} resizeMode="contain" />
            </View>

            <View style={styles.academicCard}>
                <View style={styles.academicCardBody}>
                    <AppText variant="h3" style={styles.updateTitle}>{title}</AppText>
                    <AppText variant="desc" style={styles.academicCount}>{count}</AppText>
                </View>

                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.detailsButton}
                >
                    <AppText variant="h3" style={styles.detailsButtonText}>Details</AppText>
                </LinearGradient>
            </View>
        </PressableScale>
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
                            <AppText variant="h3" style={styles.commBadgeText}>{badge}</AppText>
                        </View>
                    )}
                </View>

                <View style={styles.titleCountRow}>
                    <AppText variant="h3" style={styles.updateTitle}>{title}</AppText>
                    <AppText variant="desc">{count}</AppText>
                </View>
            </View>
        </PressableScale>
    );
}

export default function HomeScreen({ navigation }: NativeStackScreenProps<any>) {
    const [selectedWard, setSelectedWard] = useState<string>('w1');
    const { logout } = useAuth();

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
                            <AppText variant="h2" style={styles.progressLabel}>Attendance</AppText>
                            <AppText variant="h3" style={styles.progressValue}>85</AppText>
                        </View>
                        <AnimatedProgressBar value={85} />

                        <View style={[styles.progressRow, { marginTop: metrics.lg }]}>
                            <AppText variant="h2" style={styles.progressLabel}>Fee</AppText>
                            <AppText variant="h3" style={styles.progressValue}>70</AppText>
                        </View>
                        <AnimatedProgressBar value={70} />
                    </View>

                    <Image source={TODO_ILLUSTRATION} style={styles.progressIllustration} resizeMode="contain" />
                </View>

                <AppText variant="h2" style={styles.sectionTitle}>School Updates</AppText>
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

                <AppText variant="h2" style={styles.sectionTitle}>Academics</AppText>
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

                <AppText variant="h2" style={styles.sectionTitle}>Communication</AppText>
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

                <AppText variant="h2" style={styles.sectionTitle}>Edisapp Today</AppText>
                <View style={styles.fiveColRow}>
                    {EDISAPP_TODAY.map((item) => (
                        <PressableScale key={item.id} onPress={() => {}} style={styles.edisappItem}>
                            <View style={styles.edisappIconFrame}>
                                <Image source={item.icon} style={styles.edisappIcon} resizeMode="contain" />
                            </View>
                            <AppText variant="text" style={styles.edisappTitle}>{item.title}</AppText>
                        </PressableScale>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, paddingBottom: metrics.xxxl * 2 },
    scrollContent: {
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.sm,
        paddingBottom: metrics.xxxl,
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
        marginBottom: metrics.xl,
    },
    wardAvatarWrapper: {
        marginRight: metrics.md,
    },
    wardAvatarImage: {
        width: 44,
        height: 44,
        borderRadius: metrics.round,
    },
    wardBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: colors.white,
        borderRadius: metrics.round,
    },
    addWardWrapper: {},
    addWardCircle: {
        width: 58,
        height: 58,
        borderRadius: metrics.round,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Progress card
    progressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.iconBackground,
        borderRadius: metrics.xl,
        padding: metrics.xl,
        marginBottom: metrics.xxl,
    },
    progressColumn: {
        flex: 1,
        marginRight: metrics.md,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.sm,
    },
    progressLabel: {
        fontSize: 15,
    },
    progressValue: {
        fontSize: 13,
    },
    progressTrack: {
        height: 8,
        borderRadius: metrics.round,
        backgroundColor: colors.white,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: metrics.round,
        backgroundColor: colors.gradientEnd,
    },
    progressIllustration: {
        width: 100,
        height: 100,
    },

    sectionTitle: {
        marginBottom: metrics.md,
    },

    // School Updates / Academics shared grid
    threeColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.xxl,
    },
    updateCard: {
        width: '31%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.lg,
        overflow: 'hidden',
    },
    updateCardBody: {
        padding: metrics.md,
        alignItems: 'flex-start',
    },
    updateIconFrame: {
        width: 44,
        height: 44,
        borderRadius: metrics.md,
        backgroundColor: colors.grayBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.sm,
        overflow: 'hidden',
    },
    updateIcon: {
        width: '70%',
        height: '70%',
    },
    updateTitle: {
        fontSize: 13,
    },
    detailsButton: {
        paddingVertical: metrics.sm,
        alignItems: 'center',
    },
    detailsButtonText: {
        fontSize: 13,
        color: colors.white,
    },

    // Academics — icon overlaps card top. These offsets (30, -30, 34)
    // are geometry tied to the icon's fixed 60px size, not spacing —
    // left as literals rather than forced onto the metrics scale.
    academicWrapper: {
        width: '31%',
        marginTop: 30,
    },
    academicIconCircle: {
        width: 60,
        height: 60,
        borderRadius: metrics.round,
        backgroundColor: colors.grayBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -30,
        zIndex: 2,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    academicIcon: {
        width: '65%',
        height: '65%',
    },
    academicCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.lg,
        overflow: 'hidden',
        paddingTop: 34,
    },
    academicCardBody: {
        alignItems: 'center',
        paddingBottom: metrics.md,
    },
    academicCount: {
        marginTop: 2,
    },

    // Communication
    twoColRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.xxl,
    },
    commCardWrapper: {
        width: '48%',
    },
    commCard: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.lg,
        padding: metrics.md,
        alignItems: 'flex-start',
    },
    commIconFrame: {
        width: 44,
        height: 44,
        borderRadius: metrics.md,
        backgroundColor: colors.grayBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.sm,
        position: 'relative',
        overflow: 'visible',
    },
    commBadge: {
        position: 'absolute',
        top: -6,
        right: -6,
        minWidth: 18,
        height: 18,
        borderRadius: metrics.round,
        backgroundColor: colors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: metrics.xs,
    },
    commBadgeText: {
        fontSize: 10,
        color: colors.white,
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
        borderRadius: metrics.md,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.xs,
        backgroundColor: colors.grayBackground,
        overflow: 'hidden',
    },
    edisappIcon: {
        width: '65%',
        height: '65%',
    },
    edisappTitle: {
        fontSize: 11,
    },
});