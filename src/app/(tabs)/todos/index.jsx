import { useQuery } from '@tanstack/react-query';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetTodos = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
};

export default function Todos() {
  const router = useRouter();

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: GetTodos,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/todos/[id]',
                params: { id: item.id.toString() },
              })
            }
            style={{
              padding: 16,
              backgroundColor: 'white',
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#dddddd',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {item.title}
            </Text>

            <Text style={{ color: '#666666', marginTop: 8 }}>
              {item.completed ? 'Completed' : 'Not completed'}
            </Text>
          </TouchableOpacity>
        )}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </SafeAreaView>
  );
}