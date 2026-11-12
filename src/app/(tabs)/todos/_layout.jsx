
import { Stack } from 'expo-router';

export default function TodosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Todo List',
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: 'Todo Details',
        }}
      />
    </Stack>
  );
}