import { Text, View } from "react-native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


// Types
type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;


// Login Screen
export default function LoginScreen({route}: Props) {

  const schoolCode = route.params.schoolCode;

  return (
    <View>
      <Text>Login Screen</Text>
      <Text>{schoolCode}</Text>
    </View>
  );
}