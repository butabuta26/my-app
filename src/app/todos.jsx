
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';

const GetTodos = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  const data = await response.json();

  return data;
};

const GetTodo = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  const data = await response.json();

  return data;
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

  const data = await response.json();

  return data;
};

export default function Todos() {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  const onClose = () => {
    setVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setId(item.id);
              setVisible(true);
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

      {visible && (
        <TodoModal
          id={id}
          visible={visible}
          onClose={onClose}
          onUpdate={(updatedTodo) => {
            setTodos((prev) =>
              prev.map((item) =>
                item.id === updatedTodo.id ? updatedTodo : item
              )
            );
          }}
        />
      )}
    </View>
  );
}

const TodoModal = ({ id, visible, onClose, onUpdate }) => {
  const [todo, setTodo] = useState({
    title: '',
    completed: false,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => GetTodo(id),
  });

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: () => UpdateTodo({ id: id, todo: todo }),

    onSuccess: (updatedTodo) => {
      onUpdate(updatedTodo);

      Alert.alert(
        'Success',
        'Todo updated successfully',
        [{ text: 'OK', onPress: onClose }]
      );
    },

    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  useEffect(() => {
    if (visible && data) {
      setTodo(data);
    }
  }, [visible, data]);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      {isPending && <Text>Loading...</Text>}

      {isError && <Text>{error.message}</Text>}

      {!isPending && !isError && data && (
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
            style={{
              padding: 10,
              marginBottom: 16,
            }}
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
            onPress={mutate}
            disabled={isPendingUpdate}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {isPendingUpdate ? 'Saving...' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: 12,
          borderRadius: 8,
        }}
        onPress={onClose}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Close Modal
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};
