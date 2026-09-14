import { StatusBar, View } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import Snackbar from './src/components/Snackbar';
import { snackbarRef } from './src/lib/toast';


// App
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='light-content' />
      <View style={{flex: 1}}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </View>
      <Snackbar ref={snackbarRef} />
    </SafeAreaProvider>
  );
}