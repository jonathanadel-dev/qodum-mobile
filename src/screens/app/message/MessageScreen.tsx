import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import { colors, radius, spacing, typography } from '../../../styles/theme';

const AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';

type Conversation = {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
};

// Hardcoded per established pattern
const CONVERSATIONS: Conversation[] = [
    { id: '1', name: 'School Admin', lastMessage: 'Please submit the fees by tomorrow.', time: '10:30 AM', unread: 2 },
    { id: '2', name: 'Class Teacher', lastMessage: 'Homework uploaded for today', time: '09:15 AM', unread: 1 },
    { id: '3', name: 'Accounts Dept', lastMessage: 'Fee receipt has been generated.', time: 'Yesterday', unread: 0 },
    { id: '4', name: 'Transport Office', lastMessage: 'Bus will arrive 10 minutes late', time: 'Yesterday', unread: 3 },
    { id: '5', name: 'Library', lastMessage: 'Please return the issued book', time: 'Monday', unread: 1 },
    { id: '6', name: 'Sports Teacher', lastMessage: 'Practice is cancelled today', time: 'Monday', unread: 0 },
    { id: '7', name: 'Exam Cell', lastMessage: 'Admit card is available now', time: 'Sunday', unread: 4 },
    { id: '8', name: 'Principal Office', lastMessage: 'Parent meeting on Friday', time: 'Sunday', unread: 2 },
];

export default function MessageScreen({ navigation }: NativeStackScreenProps<any>) {
    const handleOpenChat = (conversation: Conversation) => {
        navigation.navigate('Chat', { name: conversation.name, avatar: AVATAR });
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Message" isStack />

            <FlatList
                data={CONVERSATIONS}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({ item }) => (
                    <Pressable style={styles.row} onPress={() => handleOpenChat(item)}>
                        <Image source={{ uri: AVATAR }} style={styles.avatar} />

                        <View style={styles.rowTextBlock}>
                            <Text style={styles.rowName}>{item.name}</Text>
                            <Text style={styles.rowMessage} numberOfLines={1}>
                                {item.lastMessage}
                            </Text>
                        </View>

                        <View style={styles.rowMeta}>
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                            </View>
                            <Text style={styles.rowTime}>{item.time}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    list: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.xxxl,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: radius.round,
        marginRight: spacing.md,
    },
    rowTextBlock: {
        flex: 1,
        marginRight: spacing.sm,
    },
    rowName: {
        ...typography.title,
        fontSize: 16,
        marginBottom: 2,
    },
    rowMessage: {
        ...typography.description,
    },
    rowMeta: {
        alignItems: 'flex-end',
    },
    unreadBadge: {
        minWidth: 22,
        height: 22,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        marginBottom: spacing.xs,
    },
    unreadBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.background,
    },
    rowTime: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
    },
});