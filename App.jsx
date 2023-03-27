import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from "@react-native-firebase/auth"
import Login from './src/pages/auth/Login';
import Profile from './src/pages/Profile';
import Menu from './src/pages/Menu';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator()
const Bottom = createBottomTabNavigator()



function App() {
  const [userSession,setUserSession]=useState()

  useEffect(()=>{
    auth().onAuthStateChanged(user=>{
      setUserSession(!!user)
    })
  },[])

  const AuthStack=()=>{
    return(

        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='LoginPage' component={Login} />
        </Stack.Navigator>

    )
  }

  return (
    <NavigationContainer>
      {
      !userSession?<AuthStack />:
      <Bottom.Navigator screenOptions={{headerShown:false}}>
        <Bottom.Screen name='ProfilePage' component={Profile} />
        <Bottom.Screen name='MenuPage' component={Menu} />
      </Bottom.Navigator>
      }
      
    </NavigationContainer>
  )
}

export default App