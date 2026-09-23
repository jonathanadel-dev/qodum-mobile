import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { colors, metrics } from '../../styles/theme';
import AppText from '../AppText';

type Props = {
    routeName: string;
    onPress: () => void;
};

export default function RouteSelectorButton({ routeName, onPress }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Ionicons 
                    name="git-pull-request" 
                    size={20} 
                    color={colors.primary}
                />
                
                <AppText style={styles.routeName} numberOfLines={1}>
                    {routeName}
                </AppText>
                
                <Ionicons 
                    name="chevron-down" 
                    size={20} 
                    color={colors.textSecondary}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: colors.white,
        borderRadius: metrics.md,
        paddingHorizontal: metrics.lg,
        paddingVertical: metrics.md,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.md,
        flex: 1
    },
    routeName: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
    },
});