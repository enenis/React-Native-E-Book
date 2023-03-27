import React from 'react'
import { View,TextInput } from 'react-native'
import styles from "./Input.style"
function Input({value,onType,placeholder,isSecure}) {
  return (
    <View style={styles.container}>
        <TextInput value={value} onChangeText={onType} placeholder={placeholder} secureTextEntry={isSecure}/>
    </View>
  )
}

export default Input