import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from "../theme";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean, tabBarInactiveTintColor: theme.colorGrey }}>
            <Tabs.Screen name="index" options={{
                title: "Shopping List", tabBarIcon: ({ color, size }) => {
                    return <Feather name="list" size={size} color={color} />
                }
            }} />
            <Tabs.Screen name="counter" options={{
                headerShown: false,
                title: "Counter", tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="clockcircleo" size={size} color={color} />
                }
            }} />
            <Tabs.Screen name="idea" options={{
                title: "Idea", tabBarIcon: ({ color, size }) => {
                    return <FontAwesome6 name="lightbulb" size={size} color={color} />
                }
            }} />
        </Tabs>
    )
}