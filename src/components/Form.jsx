import { Formik } from 'formik';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import styles from '../style/styles.js';


const FormSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    age: Yup.string().required('Required')
})

export default function Form({onAddCard}) {

    return (
        <Formik
            initialValues={{ name: '', email: '', age: ''}}
            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values)
                onAddCard(values);
                resetForm();
            }}
        >
            {({handleChange, handleSubmit, values, errors}) => (
                <>
                <Text style={styles.formTitle}>Form :D</Text>
                <View style={styles.card}>
                    <TextInput style={styles.input} 
                        value={values.name} 
                        onChangeText={handleChange('name')} 
                        placeholder="Enter Your Name" 
                        placeholderTextColor="#999999"
                    />
                    <View style={styles.error}>
                        <Text>{errors.name}</Text>
                    </View>

                    <TextInput style={styles.input} 
                        value={values.email} 
                        onChangeText={handleChange('email')} 
                        placeholder="Enter Your Email" 
                        placeholderTextColor="#999999"
                    />
                    <View style={styles.error}>
                        <Text>{errors.email}</Text>
                    </View>

                    <TextInput style={styles.input} 
                        value={values.age} 
                        onChangeText={handleChange('age')} 
                        placeholder="Enter Your Age" 
                        placeholderTextColor="#999999"
                    />
                    <View style={styles.error}> 
                        <Text>{errors.age}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText} >Submit</Text>
                    </TouchableOpacity>
                </View>
                </>
            )}
        </Formik>
    )
}