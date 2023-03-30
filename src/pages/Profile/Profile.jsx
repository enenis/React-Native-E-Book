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
import BookCardProfile from '../../components/BookCardProfile';


function Profile({route}) {
  // const {item} = route.params;
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
  // console.log(item.username);
  
    const pickImage = () => {
      //It sends the photo uploaded by the user to the database.
      const user = auth().currentUser;
      const userId = user.uid;
      const options = {
        title: 'Titlee',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          // showMessage({
          //   message: 'Something went wrong.',
          //   type: 'danger',
          // });
        } else if (response.errorCode) {
          // showMessage({
          //   message: 'Something went wrong.',
          //   type: 'danger',
          // });
        } else {
          const path = response.assets[0].uri;
          setImage(path)
          database().ref(`users/${userId}/photos/profile`).set(path);
        }
      });
    };

    const pickBack = () => {
      //It sends the photo uploaded by the user to the database.
      const user = auth().currentUser;
      const userId = user.uid;
      const options = {
        title: 'Titlee',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          // showMessage({
          //   message: 'Something went wrong.',
          //   type: 'danger',
          // });
        } else if (response.errorCode) {
          // showMessage({
          //   message: 'Something went wrong.',
          //   type: 'danger',
          // });
        } else {
          const path = response.assets[0].uri;
          const tilt=database().ref(`users/${userId}/photos/profile-back`).set(path);
          setImage(tilt)
        }
      });
    };
  
    const deleteImage = async () => {
      const user = auth().currentUser;
      // const storageRef = storage().ref().child(`users/${currentUser.uid}/${user.uid}.jpg`);
      const storageRef = database().ref(`users/${user.uid}/profile/profil_resmi.jpg`).path(fileUri)
      
      try {
        await storageRef.delete();
        console.log("File deleted successfully");
        setImage(null);
      } catch (error) {
        console.log("Error deleting file:", error);
      }
    };

    useEffect(() => {
      //It pull the photos from the database.
      const user = auth().currentUser;
      const userId = user.uid;
      database()
        .ref(`users/${userId}/photos/profile`)
        .on('value', snapshot => {
          setImage(snapshot.val());
        });
    }, []);

    useEffect(() => {
      //It pull the photos from the database.
      const user = auth().currentUser;
      const userId = user.uid;
      database()
        .ref(`users/${userId}/photos/profile-back`)
        .on('value', snapshot => {
          setBack(snapshot.val());
        });
    }, []);

    function onBanane(item) {
      console.log(item.like);
      const user=auth().currentUser
      database().ref(`private-books/${user.uid}/${item.id}`).update({like:item.like+1})
     
      
    }
    
  
    const renderItemShown=({item})=><BookCardProfile item={item} onLike={()=>onBanane(item)} />

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
  
