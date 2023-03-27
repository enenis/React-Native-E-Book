import React, {useState,useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './Profile.style';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import * as ImagePicker from 'react-native-image-picker';
import {Avatar} from "react-native-paper"
import { utils } from '@react-native-firebase/app';
import Button from '../../components/Button';
import parsedContentData from '../../utils/parsedContentData';
import BookCard from '../../components/BookCard';


function Profile() {
    const [back, setBack] = useState("");
    const [image, setImage] = useState("");
    const [contentList,setContentList]=React.useState([])

    // const reference = storage().ref().child(`images/${fileName}`);
    
    
    React.useEffect(()=>{
      const user=auth().currentUser
    
      database().ref(`private-books/${user.uid}`).on('value',snapshot=>{
        const contentData=snapshot.val()
        const parsedData=parsedContentData(contentData||{})
        setContentList(parsedData)
      })
    
      
    },[])
  
  
    const pickImage=async()=>{
      let result=await ImagePicker.launchImageLibrary({
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      })
      console.log(result);
    
      if(!result.didCancel){
        const user = auth().currentUser;
        const fileUri = result.assets[0].uri;
        setImage(fileUri);
        const fileName = 'image.jpg';
        const storageRef = storage().ref().child(`users/${user.uid}/profile/profil_resmi.jpg`);
        storageRef.putFile(fileUri).then((snapshot) => {
          console.log('Uploaded file successfully!');
        }).catch((error) => {
          console.error(error+" kapaaannn");
        });
      }
    }

    const pickBack=async()=>{
      let result=await ImagePicker.launchImageLibrary({
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      })
      console.log(result);
    
      if(!result.didCancel){
        const user = auth().currentUser;
        const fileUri = result.assets[0].uri;
        setBack(fileUri);
        const fileName = 'image.jpg';
        const storageRef = storage().ref().child(`users/${user.uid}/profile/back.jpg`);
        storageRef.putFile(fileUri).then((snapshot) => {
          console.log('Uploaded file successfully!');
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  
    const deleteImage = async () => {
      const user = auth().currentUser;
      // const storageRef = storage().ref().child(`users/${currentUser.uid}/${user.uid}.jpg`);
      const storageRef = storage().ref().child(`users/${user.uid}/profile/profil_resmi.jpg`);
      
      try {
        await storageRef.delete();
        console.log("File deleted successfully");
        setImage(null);
      } catch (error) {
        console.log("Error deleting file:", error);
      }
    };

    useEffect(() => {
      const user = auth().currentUser;
      const storageRef = storage().ref().child(`users/${user.uid}/profile/profil_resmi.jpg`);
      storageRef.getDownloadURL().then((url) => {
        setImage(url);
      }).catch((error) => {
        console.log(error);
      });
    }, []);

    useEffect(() => {
      const user = auth().currentUser;
      const storageRef = storage().ref().child(`users/${user.uid}/profile/back.jpg`);
      storageRef.getDownloadURL().then((url) => {
        setBack(url);
      }).catch((error) => {
        console.log(error);
      });
    }, []);
    
  
    const renderItemShown=({item})=><BookCard item={item} />

    return (
  
      <View style={styles.container}>
          {/* {
            image&& <Button placeholder="Delete" onPress={deleteImage} />
          } */}
          
           <FlatList data={contentList} renderItem={renderItemShown} numColumns={2} ListHeaderComponent={

            <View>
              <TouchableOpacity style={styles.bck_container} onPress={pickBack}>
        {
          back?<Image style={styles.back} source={{ uri: back }} /> :<Text>add image</Text>
        }
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.img_container} onPress={pickImage}>
        {
          image?<Image style={{width:100,height:100,borderRadius:50,}} source={{ uri: image }} /> :<Text>add image</Text>
        }
        </TouchableOpacity>

            </View>

           }/>
      </View>
    );
  }
  
  export default Profile;
  
