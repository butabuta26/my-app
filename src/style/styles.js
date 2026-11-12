import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    },
    
    card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    },

    title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    },

    description: {
    fontSize: 16,
    color: 'gray',
    },

    button: {
    backgroundColor: '#3e0094',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    },
      
    buttonText: {
    color: '#fffdfa',
    fontSize: 16,
    },

    formTitle: {
    fontSize: 45,
    textAlign: 'center',
    fontWeight: 'bold',
    },

    input: {
    margin: 7,
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    },

    error: {
    paddingLeft: 15,
    },
});

export default styles;
