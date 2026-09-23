import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import { colors, metrics } from '../../../styles/theme';
import AppText from '../../../components/AppText';

type Message = {
    id: string;
    text: string;
    fromMe: boolean;
};

export default function ChatScreen({
    navigation,
    route,
}: NativeStackScreenProps<any>) {
    const { name, avatar } = route.params as {
        name: string;
        avatar: string;
    };

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! How can I help you today?',
            fromMe: false,
        },
        {
            id: '2',
            text: 'I have a question regarding my admission.',
            fromMe: true,
        },
    ]);

    const [draft, setDraft] = useState('');

    const flatListRef = useRef<FlatList<Message>>(null);

    // Keyboard height animation
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    // Send button press animation
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const showEvent =
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

        const hideEvent =
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const keyboardShowListener = Keyboard.addListener(
            showEvent,
            event => {
                const height = event.endCoordinates.height;

                Animated.timing(keyboardHeight, {
                    toValue: height,
                    duration: Platform.OS === 'ios' ? event.duration : 220,
                    useNativeDriver: true,
                }).start();

                scrollToBottom();
            },
        );

        const keyboardHideListener = Keyboard.addListener(
            hideEvent,
            event => {
                Animated.timing(keyboardHeight, {
                    toValue: 0,
                    duration: Platform.OS === 'ios' ? event.duration : 220,
                    useNativeDriver: true,
                }).start();
            },
        );

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            flatListRef.current?.scrollToEnd({
                animated: true,
            });
        });
    };

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
            speed: 35,
            bounciness: 0,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 25,
            bounciness: 5,
        }).start();
    };

    const handleSend = () => {
        const trimmed = draft.trim();

        if (!trimmed) {
            return;
        }

        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                text: trimmed,
                fromMe: true,
            },
        ]);

        setDraft('');

        requestAnimationFrame(() => {
            flatListRef.current?.scrollToEnd({
                animated: true,
            });
        });
    };

    return (
        <View style={styles.container}>
            <Header
                navigation={navigation}
                title={name}
                image={{ uri: avatar }}
            />

            <View style={styles.flex}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={scrollToBottom}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.bubble,
                                item.fromMe
                                    ? styles.bubbleSent
                                    : styles.bubbleReceived,
                            ]}
                        >
                            <AppText
                                style={
                                    item.fromMe
                                        ? styles.bubbleTextSent
                                        : styles.bubbleTextReceived
                                }
                            >
                                {item.text}
                            </AppText>
                        </View>
                    )}
                />

                {/* 
                 * The composer is translated by exactly the
                 * keyboard height, so it sits directly above it.
                 */}
                <Animated.View
                    style={[
                        styles.inputContainer,
                        {
                            transform: [
                                {
                                    translateY: Animated.multiply(
                                        keyboardHeight,
                                        -1,
                                    ),
                                },
                            ],
                        },
                    ]}
                >
                    <View style={styles.inputRow}>
                        <TextInput
                            value={draft}
                            onChangeText={setDraft}
                            placeholder="Type a message"
                            placeholderTextColor={colors.hash}
                            style={styles.input}
                            multiline
                            textAlignVertical="center"
                        />

                        <Animated.View
                            style={{
                                transform: [{ scale }],
                            }}
                        >
                            <Pressable
                                style={styles.sendButton}
                                onPress={handleSend}
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}
                            >
                                <Ionicons
                                    name="send"
                                    size={20}
                                    color={colors.white}
                                />
                            </Pressable>
                        </Animated.View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    flex: {
        flex: 1,
    },

    messageList: {
        flexGrow: 1,
        padding: metrics.xl,
        gap: metrics.md,
        paddingBottom: metrics.xl + 70,
    },

    bubble: {
        maxWidth: '80%',
        borderRadius: metrics.lg,
        paddingHorizontal: metrics.lg,
        paddingVertical: metrics.md,
    },

    bubbleReceived: {
        alignSelf: 'flex-start',
        backgroundColor: colors.iconBackground,
    },

    bubbleSent: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
    },

    bubbleTextReceived: {
        fontSize: 15,
        color: colors.text,
    },

    bubbleTextSent: {
        fontSize: 15,
        color: colors.white,
    },

    inputContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.white,
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: metrics.xl,
        paddingTop: metrics.sm,
        paddingBottom: metrics.xl,
        gap: metrics.md,
    },

    input: {
        flex: 1,
        minHeight: 50,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: metrics.round,
        paddingHorizontal: metrics.lg,
        paddingVertical: metrics.md,
        fontSize: 15,
        color: colors.text,
    },

    sendButton: {
        width: 50,
        height: 50,
        borderRadius: metrics.round,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});