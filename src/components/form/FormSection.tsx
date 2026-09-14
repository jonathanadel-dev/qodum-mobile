import React, { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Card from '../Card';
import {
    colors,
    radius,
    spacing,
    typography
} from '../../styles/theme';


type FormSectionProps = {
    number: string;
    title: string;
    description: string;
    children: ReactNode;
    style?: ViewStyle;
};


// Form section
export default function FormSection ({ number, title, description, children, style }: FormSectionProps) {
    return (
        <Card style={[styles.card, style]} contentStyle={styles.content}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                    <Text style={styles.sectionNumberText}>{number}</Text>
                </View>

                <View style={styles.sectionHeading}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                    <Text style={styles.sectionDescription}>{description}</Text>
                </View>
            </View>

            <View style={styles.sectionDivider} />

            {children}
        </Card>
    );
};


// Styles
const styles = StyleSheet.create({
    card: {
        marginBottom: spacing.lg,
    },

    content: {
        width: '100%',
        paddingTop: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
    },

    sectionNumber: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        backgroundColor: colors.iconBackground,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },

    sectionNumberText: {
        fontSize: 12,
        fontWeight: '800',
        color: colors.primary,
    },

    sectionHeading: {
        flex: 1,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },

    sectionDescription: {
        ...typography.description,
        marginTop: 2,
    },

    sectionDivider: {
        height: 1,
        backgroundColor: '#EDF2F5',
        marginVertical: spacing.xl,
    }
});