import React,{useState,useEffect} from 'react'
import { View,Text, Image, ActivityIndicator } from 'react-native'
import styles from './BookCard.style';
import storage from "@react-native-firebase/storage"
import auth from "@react-native-firebase/auth"
function BookCard({item}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [images,setImages]=useState()

  useEffect(() => {
    const user = auth().currentUser;
    setImageLoaded(true)
    const storageRef = storage().ref().child(`/users/books/${item.image}`);
    storageRef.getDownloadURL().then((url) => {
      setImages(url);
      setImageLoaded(false)
    }).catch((error) => {
      // console.log(error);
    });
  }, []);
  
  // console.log(item.image);
 

  return (
    
    <View style={styles.container}>
        <Text style={styles.title}>{item.username}</Text>
        <View style={styles.box}>
          {
            imageLoaded?<ActivityIndicator size={40} color="white" style={{marginTop:60}} />:<Image style={{width:100,height:150}} source={{uri:images}} />
          }
          
        </View>
        <View style={styles.inner_container}>
        <Text style={styles.name} >{item.bookName}</Text>
         {
        item.bookDescription.length>20?<Text style={styles.desc} >{item.bookDescription.split("",39)}...</Text>:<Text style={styles.desc} >{item.bookDescription}</Text>
        } 
        
        <Text style={styles.writ} >{item.bookWriter}</Text>
        </View>
    </View>
  )
}

export default BookCard

