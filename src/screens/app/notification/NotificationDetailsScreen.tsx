// screens/Notification/NotificationDetailsScreen.tsx
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import { colors, radius, spacing, typography } from '../../../styles/theme';

export default function NotificationDetailsScreen({ navigation, route }: NativeStackScreenProps<any>) {
    const { notification } = route.params as {
        notification: {
            title: string;
            description: string;
            date: string;
            time: string;
            category: string;
            attachmentName?: string;
        };
    };

    const handleAttachmentPress = () => {
        // Static per request — no real behavior yet
    };

    const handleDownloadPress = () => {
        // Static per request — no real behavior yet
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Notification Details" />

            <ScrollView
                style={styles.scrollArea}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.title}>{notification.title}</Text>
                <Text style={styles.description}>{notification.description}</Text>

                <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                        <Ionicons name="calendar-outline" size={15} color={colors.primary} />
                        <Text style={styles.badgeText} numberOfLines={1}>
                            {notification.date}
                        </Text>
                    </View>

                    <View style={styles.badge}>
                        <Ionicons name="time-outline" size={15} color={colors.primary} />
                        <Text style={styles.badgeText}>{notification.time}</Text>
                    </View>

                    <View style={styles.badge}>
                        <Ionicons name="pricetag-outline" size={15} color={colors.primary} />
                        <Text style={styles.badgeText}>{notification.category}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Attachments</Text>

                {notification.attachmentName ? (
                    <Card onPress={handleAttachmentPress} contentStyle={styles.attachmentContent}>
                        <View style={styles.pdfIcon}>
                            <Ionicons name="document-text" size={18} color={colors.background} />
                        </View>

                        <Text style={styles.attachmentName} numberOfLines={1}>
                            {notification.attachmentName}
                        </Text>

                        <Button
                            type="arrowRight"
                            onPress={handleAttachmentPress}
                            style={styles.attachmentArrow}
                        />
                    </Card>
                ) : (
                    <View style={styles.emptyAttachments}>
                        <Image
                            source={require('../../../assets/images/not-found.png')}
                            style={styles.emptyAttachmentsImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyAttachmentsText}>No attachments available</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    type="gradient"
                    label="Download"
                    onPress={handleDownloadPress}
                    style={styles.downloadButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        paddingBottom: spacing.xl,
    },
    title: {
        ...typography.title,
        fontSize: 22,
        marginBottom: spacing.md,
    },
    description: {
        ...typography.description,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: spacing.xl,
    },
    badgeRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.xxl,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: colors.iconBackground,
        borderRadius: radius.round,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    badgeText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.text,
    },
    sectionTitle: {
        ...typography.title,
        fontSize: 17,
        marginBottom: spacing.md,
    },
    attachmentContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
    },
    pdfIcon: {
        width: 36,
        height: 36,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    attachmentName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    attachmentArrow: {
        width: 40,
        height: 40,
    },
    emptyAttachments: {
        alignItems: 'center',
        paddingVertical: spacing.xxl,
    },
    emptyAttachmentsImage: {
        width: 200,
        height: 200,
        marginBottom: spacing.lg,
    },
    emptyAttachmentsText: {
        fontSize: 15,
        color: colors.textSecondary,
    },
    footer: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
        paddingTop: spacing.md,
    },
    downloadButton: {
        width: '100%',
        height: 54,
    },
});