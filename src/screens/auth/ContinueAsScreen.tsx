// screens/ContinueAs/ContinueAsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius, fonts } from '../../styles/theme';
import BackgroundScreen from '../../components/BackgroundScreen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import toast from '../../lib/toast';

type OptionKey = 'admission' | 'login' | 'jobs';

const OPTIONS: {
    key: OptionKey;
    icon: any;
    title: string;
    description: string;
    nextPage: string;
}[] = [
    {
        key: 'admission',
        icon: require('../../assets/images/continueAs/new-admission.png'),
        title: 'NEW ADMISSION',
        description: 'Apply to get admission at the school for a new academic session!',
        nextPage: 'StudentAdmission',
    },
    {
        key: 'login',
        icon: require('../../assets/images/continueAs/secure-login.png'),
        title: 'SECURE LOGIN',
        description: 'Select to login with your school or college code!',
        nextPage: 'ChooseRole',
    },
    {
        key: 'jobs',
        icon: require('../../assets/images/continueAs/job-openings.png'),
        title: 'JOB OPENINGS',
        description: 'Search for relevant jobs and apply for jobs today!',
        nextPage: 'JobOpening',
    },
];

export default function ContinueAsScreen({ navigation }: any) {
    const [selected, setSelected] = useState<OptionKey | null>(null);

    const handleContinue = () => {
        if (!selected) {
            toast.error('Please select an option to continue');
            return;
        }
        const option = OPTIONS.find((o) => o.key === selected)!;
        navigation.navigate('SchoolCode', { next_page: option.nextPage });
    };

    return (
        <BackgroundScreen navigation={navigation}>
            <View style={styles.content}>
                <Text style={styles.title}>Continue as:</Text>

                <View style={styles.list}>
                    {OPTIONS.map((option) => {
                        const isSelected = selected === option.key;
                        return (
                            <Card
                                key={option.key}
                                contentStyle={styles.cardContent}
                                onPress={() => setSelected(option.key)}
                            >
                                <View style={styles.iconCircle}>
                                    <Image
                                        source={option.icon}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.textBlock}>
                                    <View style={styles.titleRow}>
                                        <Text style={styles.optionTitle}>{option.title}</Text>
                                        <StatusDot selected={isSelected} />
                                    </View>
                                    <Text style={styles.description}>{option.description}</Text>
                                </View>
                            </Card>
                        );
                    })}
                </View>
            </View>

            <View style={styles.fabWrapper}>
                <Button type="arrowRight" onPress={handleContinue} />
            </View>
        </BackgroundScreen>
    );
}

function StatusDot({ selected }: { selected: boolean }) {
    if (selected) {
        return (
            <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
            </View>
        );
    }
    return <View style={styles.radioCircle} />;
}

const styles = StyleSheet.create({
    content:{
        flex: 1
    },
    title: {
        ...typography.title,
        fontSize: 22,
        color: colors.text,
        marginTop: spacing.xxxl,
        marginBottom: spacing.xl,
    },
    list: {
        gap: spacing.lg,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: radius.round,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
    },
    icon: {
        width: 52,
        height: 52,
    },
    textBlock: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionTitle: {
        ...typography.title,
        fontSize: 17,
        color: colors.text,
        letterSpacing: 0.3,
    },
    description: {
        ...typography.description,
        fontFamily: fonts.semiBold,
        maxWidth: 210,
    },
    checkCircle: {
        width: 26,
        height: 26,
        borderRadius: radius.round,
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        color: colors.background,
        fontSize: 14,
        fontWeight: '700',
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: radius.round,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    fabWrapper: {
        marginTop: spacing.xxxl,
        alignItems: 'center',
    },
});