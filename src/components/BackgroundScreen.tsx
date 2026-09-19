import { ReactNode } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import Button from './Button';

export default function BackgroundScreen({ children, navigation }: { children: ReactNode, navigation: any }) {
    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <StatusBar barStyle='dark-content'/>
            <View style={styles.content}>
                <Button
                    type='arrowLeft'
                    onPress={() => navigation.goBack()}
                />
                {children}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
});