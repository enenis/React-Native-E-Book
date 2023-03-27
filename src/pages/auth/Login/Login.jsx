import React from 'react'
import { View,Text, } from 'react-native'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import auth from "@react-native-firebase/auth"
import { Formik } from 'formik'

function Login({navigation}) {

    const initalFormValues={
        usermail:"",
        password:"",
    }

   async function handleFormSubmit(formValues) {
        try {
            await auth().signInWithEmailAndPassword(formValues.usermail,formValues.password)
            navigation.navigate("ProfilePage")
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <View>
        <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit}>
        {({values,handleChange,handleSubmit})=>(
        <>
        <Input value={values.usermail} onType={handleChange("usermail")} placeholder="email"/>
        <Input value={values.password} onType={handleChange("password")} placeholder="password"/>
        <Button placeholder="login" onPress={handleSubmit}/>
        </>
        )}
        </Formik>
    </View>
  )
}

export default Login