import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    Pressable,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BackgroundScreen from '../../../components/BackgroundScreen';
import FormInput from '../../../components/form/input/FormInput';
import { colors, radius, spacing, typography } from '../../../styles/theme';
import { AuthStackParamList } from '../../../navigation/AuthStack';
import toast from '../../../lib/toast';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'NumberValidation'>;


// Track application screen
export default function NumberValidationScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [number, setNumber] = useState('');


    // Handlers
    const handleNumberChange = (value: string) => {
        setNumber(value);
    };
    const handleSearch = () => {
        Keyboard.dismiss();

        if (!number) {
            toast.error('Please enter a valid number');
            return;
        }

        navigation.navigate('ChooseAction', {schoolCode});
    };


    return (
        <BackgroundScreen navigation={navigation}>
            <View style={styles.screen}>
                <View style={styles.content}>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        style={styles.seal}
                        resizeMode="contain"
                    />

                    <Text style={styles.label}>Enter Your Adm No. / Employee ID</Text>

                    <View style={styles.inputWrapper}>
                        <FormInput
                            value={number}
                            onChangeText={handleNumberChange}
                            placeholder="Enter your number"
                            style={styles.input}
                        />
                    </View>

                    <Pressable style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.searchText}>Search</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Powered By</Text>
                    <Image
                        source={require('../../../assets/images/logo.png')}
                        style={styles.footerLogo}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </BackgroundScreen>
    );
}


// Styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
        marginTop: '25%',
    },
    seal: {
        width: 150,
        height: 150,
        marginBottom: spacing.xxl,
    },
    label: {
        ...typography.label,
        fontSize: 15,
        marginBottom: spacing.lg,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: spacing.xxl,
    },
    input: {
        width: '100%',
        borderWidth:1,
        borderColor: '#000',
        backgroundColor:colors.iconBackground
    },
    searchButton: {
        width: '70%',
        height: 50,
        borderRadius: radius.round,
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.iconBackground
    },
    searchText: {
        color: colors.primary,
        fontSize: 16
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingBottom: spacing.xl,
    },
    footerText: {
        fontSize: 13,
        color: colors.inactive,
    },
    footerLogo: {
        width: 90,
        height: 28,
    }
});