import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
// import { useFocusEffect } from 'expo-router';
// import { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GetTodos = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  const data = await response.json();

  return data;
};

export default function Todos() {
  const navigation = useNavigation();

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
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isPending && <Text>Loading...</Text>}

      {isError && <Text>Error: {error.message}</Text>}

      {!isPending && !isError && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('todo', {
                  id: item.id,
                });
              }}
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
      )}
    </SafeAreaView>
  );
}