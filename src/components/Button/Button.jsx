import React from 'react'
import { View,TouchableOpacity, Text } from 'react-native'
import styles from "./Button.style"
function Input({onPress,placeholder}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{placeholder}</Text>
    </TouchableOpacity>
  )
}

export default Input