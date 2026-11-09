import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import Form from '../../components/Form';

export default function HomeScreen() {
  const [cards, setCards] = useState([]);

  function addCard(values) {
    console.log('Adding card:', values);
    setCards([...cards, values]);
}
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Form onAddCard={addCard}/>
                <Card cards={cards}/>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}