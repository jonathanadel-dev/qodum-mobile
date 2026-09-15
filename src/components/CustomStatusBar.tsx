import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../styles/theme";

export default function CustomStatusBar(){

     const insets = useSafeAreaInsets();

    return(
        <>
            <StatusBar
                barStyle='light-content'
            />
            <View style={{ height: insets.top, backgroundColor: colors.primary }} />
        </>
    )
}