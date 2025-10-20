import { Text, View, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";


export default function LoginActivity() {
    const router = useRouter();

    const handleGoToHome = () => {
        router.push('/home/home-activity');
    }

    return (
        <View style={styles.container}>
            <Text>Login Activity</Text>
            <Button title="Go to Tabs" onPress={handleGoToHome} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});