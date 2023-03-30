import React from 'react'
import Modal from "react-native-modal";
import { View,TextInput,Text,Image,TouchableOpacity } from 'react-native'
import styles from './ContentInputModal.style';
import Button from '../Button';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


function ContentInputModal({visible,onClose,onSend}) {
    const [image,setImage]=React.useState("")
    const [bookName,setBookName]=React.useState()
    const [bookDesc,setBookDesc]=React.useState()
    const [bookWrit,setBookWrit]=React.useState()




    function handleBookSend(content) {
        if(!bookName||!bookDesc||!bookWrit){
            console.log("Empty Space");
            return
        }
        
        // console.log(imageUrl);
        onSend(bookName,bookDesc,bookWrit,image)
        setBookName(null)
        setBookDesc(null)
        setBookWrit(null)
        setImage(null)
    }

    const pickImage=async()=>{
        let result=await ImagePicker.launchImageLibrary({
          allowsEditing:true,
          aspect:[4,3],
          quality:1,
        })
        console.log(result);
      
        if(!result.didCancel){
          const user = auth().currentUser;
          const number=1
          const fileUri = result.assets[0].uri;
          setImage(fileUri);
          const fileName = 'image.jpg';
            const imageUrl=bookName.split(" ").join("")
          const storageRef = storage().ref().child(`users/books/${imageUrl}`);
          storageRef.putFile(fileUri).then((snapshot) => {
            console.log('Uploaded file successfully!');
            
          }).catch((error) => {
            console.error(error);
          });
        }
      }

    //   React.useEffect(() => {
    //     const user = auth().currentUser;
    //     const storageRef = storage().ref().child(`users/${user.uid}/books/booksImage/`);
    //     storageRef.getDownloadURL().then((url) => {
    //       setImage(url);
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //   }, []);

  return (
    <Modal
    style={styles.modal}
    isVisible={visible}
    onSwipeComplete={onClose} 
    onBackdropPress={onClose}
    onBackButtonPress={onClose}
    swipeDirection="down"
    >
        <View style={styles.container}>
            {/* //box */}
            {
                bookName?<TouchableOpacity style={styles.box} onPress={pickImage}>
                {
                    image?<Image style={{width:95,height:145}} source={{uri:image}} />:<Text style={styles.text}>+</Text>
                }
            </TouchableOpacity>:<Text style={{fontSize:20,textAlign:"center",color:"black"}}>First enter Book Name!</Text>
            }
            
            <View style={styles.inputs}>
            <TextInput style={styles.input} placeholderTextColor={"black"} value={bookName} maxLength={50} placeholder='Book Name..' onChangeText={setBookName} />
            <TextInput style={styles.input} value={bookDesc}  placeholderTextColor={"black"} placeholder='Book Description..' onChangeText={setBookDesc}/>
            <TextInput style={styles.input} value={bookWrit} placeholderTextColor={"black"} placeholder='Book Writer..' onChangeText={setBookWrit}/>
            </View>
            <Button placeholder="Send" onPress={handleBookSend} />
        </View>
    </Modal>
  )
}

export default ContentInputModal