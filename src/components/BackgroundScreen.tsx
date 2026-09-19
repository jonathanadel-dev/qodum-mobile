import { ReactNode } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import Button from './Button';
import Header from './Header';

export default function BackgroundScreen({ children, navigation, isHeader = false, title='' }: { children: ReactNode, navigation: any, isHeader?: boolean, title?: string }) {
    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <StatusBar barStyle='dark-content'/>
            {isHeader ? (
                <Header title={title} navigation={navigation}/>
            ) : (
                <View style={styles.backButtonWrapper}>
                    <Button
                        type='arrowLeft'
                        onPress={() => navigation.goBack()}
                    />
                </View>
            )}
            <View style={styles.content}>
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
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  backButtonWrapper:{
    paddingVertical: 40, 
    paddingHorizontal: 20
  }
});