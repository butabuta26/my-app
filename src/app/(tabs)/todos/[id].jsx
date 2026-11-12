import { useQuery, useMutation, useQueryClient, } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetTodo = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todo');
  }

  return await response.json();
};

const UpdateTodo = async ({ id, todo }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return await response.json();
};

export default function Todo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [todo, setTodo] = useState({
    title: '',
    completed: false,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => GetTodo(id),
  });

  useEffect(() => {
    if (data) {
      setTodo(data);
    }
  }, [data]);

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: () => UpdateTodo({ id, todo }),

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos', id], updatedTodo);

      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos?.map((item) =>
          item.id === updatedTodo.id ? updatedTodo : item
        )
      );

      Alert.alert(
        'Success',
        'Todo updated successfully',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    },

    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Todo ID: {data.id}</Text>

        <TextInput
          value={todo.title}
          onChangeText={(text) =>
            setTodo((prev) => ({
              ...prev,
              title: text,
            }))
          }
          placeholder="Todo title"
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            marginVertical: 16,
          }}
        />

        <TouchableOpacity
          onPress={() =>
            setTodo((prev) => ({
              ...prev,
              completed: !prev.completed,
            }))
          }
          style={{ padding: 10, marginBottom: 16 }}
        >
          <Text>
            {todo.completed ? 'Completed ✓' : 'Not completed'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#5C4D3F',
            padding: 12,
            borderRadius: 8,
          }}
          onPress={() => mutate()}
          disabled={isPendingUpdate}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {isPendingUpdate ? 'Saving...' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}