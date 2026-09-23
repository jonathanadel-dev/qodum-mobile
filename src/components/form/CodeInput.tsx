import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { colors, metrics } from '../../styles/theme';


// Type
type CodeInputProps = {
    length?: number;
    value: string;
    onChangeText: (value: string) => void;
    error?: string;
    autoFocus?: boolean;
};


// Code input
export default function CodeInput ({ length = 6, value, onChangeText, error, autoFocus = false }: CodeInputProps) {


    const inputRefs = useRef<Array<React.ElementRef<typeof TextInput> | null>>([]);

    const boxes = Array.from({ length }, (_, index) => value[index] ?? '');

    const sanitize = (text: string) => text.replace(/[^0-9]/g, '');

    const focusBox = (index: number) => {
        if (index >= 0 && index < length) {
            inputRefs.current[index]?.focus();
        }
    };

    const handleChangeText = (index: number, text: string) => {
        const cleaned = sanitize(text);

        // Pasted or multi-character input: spread it across the remaining boxes.
        if (cleaned.length > 1) {
            const characters = value.split('');

            cleaned
                .slice(0, length - index)
                .split('')
                .forEach((character, offset) => {
                    characters[index + offset] = character;
                });

            onChangeText(characters.join('').slice(0, length));
            focusBox(Math.min(index + cleaned.length, length - 1));
            return;
        }

        const character = cleaned.charAt(0);
        const characters = value.split('');
        characters[index] = character;

        onChangeText(characters.join('').slice(0, length));

        if (character && index < length - 1) {
            focusBox(index + 1);
        }
    };

    const handleKeyPress = (index: number, event: any) => {
        if (event.nativeEvent.key !== 'Backspace' || boxes[index]) {
            return;
        }

        if (index > 0) {
            const characters = value.split('');
            characters[index - 1] = '';
            onChangeText(characters.join(''));
            focusBox(index - 1);
        }
    };

    return (
        <View>
            <View style={styles.row}>
                {boxes.map((character, index) => (
                    <TextInput
                        key={index}
                        ref={ref => {
                            inputRefs.current[index] = ref;
                        }}
                        value={character}
                        onChangeText={text => handleChangeText(index, text)}
                        onKeyPress={event => handleKeyPress(index, event)}
                        maxLength={length}
                        keyboardType="number-pad"
                        autoCorrect={false}
                        autoFocus={autoFocus && index === 0}
                        returnKeyType="done"
                        selectTextOnFocus
                        style={[
                            styles.box,
                            character.length > 0 && styles.boxFilled,
                            error && styles.boxError,
                        ]}
                    />
                ))}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};


// Styles
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },

    box: {
        width: 48,
        height: 48,
        borderRadius: metrics.md,
        borderWidth: 1.5,
        borderColor: colors.hash,
        backgroundColor: colors.white,
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '700',
        color: colors.text,
        padding: 0,
    },

    boxFilled: {
        borderColor: colors.borderFocused,
        backgroundColor: colors.iconBackground,
    },

    boxError: {
        borderColor: colors.danger,
        backgroundColor: colors.dangerBackground,
    },

    errorText: {
        // ...typography.error,
        marginTop: metrics.sm,
    },
});