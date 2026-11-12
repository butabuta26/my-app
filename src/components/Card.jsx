import { FlatList, Text, View } from 'react-native';
import styles from '../style/styles.js';

export default function Card({ cards }) {
    return (
        <FlatList
            data={cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.email}</Text>
                    <Text style={styles.description}>Age: {item.age} </Text>
                </View>
            )}
        />
    );
}