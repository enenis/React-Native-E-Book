import React,{useState,useEffect} from 'react'
import { View,Text, Image, ActivityIndicator,TouchableOpacity } from 'react-native'
import styles from './BookCard.style';
import storage from "@react-native-firebase/storage"
import auth from "@react-native-firebase/auth"
import { useNavigation } from '@react-navigation/native';
import database from "@react-native-firebase/database"
function BookCard({item,onLike,route}) {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [images,setImages]=useState()
  const navigation=useNavigation()

  // useEffect(() => {
  //   const user = auth().currentUser;
  //   setImageLoaded(true)
  //   const storageRef = database().ref(`/public-books/${item.id}/image`)
  //   console.log(storageRef);
  //   setImages(storageRef)
   
  // }, []);

  useEffect(() => {
    //It pull the photos from the database.
    const user = auth().currentUser;
      const userId = user.uid;
    database()
      .ref(`/private-books/${userId}/${item.id}/image`)
      .on('value', snapshot => {
        
        setImages(snapshot.val());
      });
  }, []);
  
  // console.log(item.image);

  function goToProfile() {
    navigation.navigate('UserProfile', { uid: otherUserId })
  }


  
 

  return (
    
    <View style={styles.container}>
        <View style={styles.row_container}>
          <Text onPress={goToProfile} style={styles.title}>{item.username}</Text>
          <Text >{item.like}</Text>
          <TouchableOpacity onPress={onLike}>
          <Text style={styles.like}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          {
            imageLoaded?<ActivityIndicator size={40} color="white" style={{marginTop:60}} />:<Image style={{width:100,height:150}} source={{uri:images}} />
          }
          
        </View>
        <View style={styles.inner_container}>
        <Text style={styles.name} >{item.bookName}</Text>
         {
        item.bookDescription&&item.bookDescription.length>20?<Text style={styles.desc} >{item.bookDescription.split("",39)}...</Text>:<Text style={styles.desc} >{item.bookDescription}</Text>
        } 
        
        <Text style={styles.writ} >{item.bookWriter}</Text>
        </View>
    </View>
  )
}

export default BookCard

