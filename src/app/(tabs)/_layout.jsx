import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
      <Tabs safeAreaInsets={{bottom: 50}} screenOptions={{headerShown: false}}>
        <Tabs.Screen name="index" options={{
          title: 'Home',
          tabBarIcon : ({color}) => (
            <FontAwesome name="home" size={25} color={color}/>
          )
        }}/>
        <Tabs.Screen name="todos" options={{
          title: 'Todos',
          tabBarIcon : ({color}) => (
            <FontAwesome name="list" size={25} color={color}/>
          )
        }}/>
      </Tabs>
  );
}