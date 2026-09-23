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

import BackgroundScreen from '../../../../components/BackgroundScreen';
import FormInput from '../../../../components/form/input/FormInput';
import { colors, metrics } from '../../../../styles/theme';
import { AuthStackParamList } from '../../../../navigation/AuthStack';
import toast from '../../../../lib/toast';
import AppText from '../../../../components/AppText';


// Type
type Props = NativeStackScreenProps<AuthStackParamList, 'TrackApplication'>;


// Track application screen
export default function TrackApplicationScreen({ navigation, route }: Props) {

    // State
    const { schoolCode } = route.params;
    const [regNo, setRegNo] = useState('');


    // Handlers
    const handleRegNoChange = (value: string) => {
        setRegNo(value);
    };
    const handleSearch = () => {
        Keyboard.dismiss();

        if (!regNo) {
            toast.error('Please enter a valid registration number');
            return;
        }

        navigation.navigate('ApplicationStatus', {status: 'submitted'});
    };


    return (
        <BackgroundScreen navigation={navigation}>
            <View style={styles.screen}>
                <View style={styles.content}>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
                        style={styles.seal}
                        resizeMode="contain"
                    />

                    <AppText style={styles.label}>Enter Your Registration No.</AppText>

                    <View style={styles.inputWrapper}>
                        <FormInput
                            value={regNo}
                            onChangeText={handleRegNoChange}
                            placeholder="Enter your number"
                            style={styles.input}
                        />
                    </View>

                    <Pressable style={styles.searchButton} onPress={handleSearch}>
                        <AppText style={styles.searchText}>Search</AppText>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <AppText style={styles.footerText}>Powered By</AppText>
                    <Image
                        source={require('../../../../assets/images/logo.png')}
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
        marginBottom: metrics.xxl,
    },
    label: {
        // ...typography.title,
        fontSize: 18,
        marginBottom: metrics.lg,
    },
    inputWrapper: {
        width: '100%',
        marginBottom: metrics.xxl,
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
        borderRadius: metrics.round,
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
        gap: metrics.sm,
        paddingBottom: metrics.xl,
    },
    footerText: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    footerLogo: {
        width: 90,
        height: 28,
    }
});