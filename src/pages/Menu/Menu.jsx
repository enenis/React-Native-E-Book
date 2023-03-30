import React from 'react'
import { View,Text,FlatList } from 'react-native'
import FloatingButton from '../../components/FloatingButton'
import Modal from '../../components/Modal';
import styles from './Menu.style';
import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import parsedContentData from '../../utils/parsedContentData';
import BookCard from '../../components/BookCard';
import { useNavigation } from '@react-navigation/native';

function Menu() {
  const navigation = useNavigation();
  const[isModalVisible,setIsModalVisible]=React.useState(false)
  const [contentList,setContentList]=React.useState([])
 const [publicContentList,setPublicContentList]=React.useState([])
  React.useEffect(()=>{
    const user=auth().currentUser
  
    database().ref(`private-books/${user.uid}`).on('value',snapshot=>{
      const contentData=snapshot.val()
      const parsedData=parsedContentData(contentData||{})
      setContentList(parsedData)
    })
  
    database().ref(`public-books/`).on('value', snapshot => {
      const publicContentData = snapshot.val()
      const publicParsedData = parsedContentData(publicContentData || {})
      setPublicContentList(publicParsedData)
    })
  },[])

  function handleInputToggle() {
    setIsModalVisible(!isModalVisible)
  }

  function handleSendContent(bookName,bookDesc,bookWrit,image) {
    console.log(image);
    const user=auth().currentUser
    database().ref(`/books/${user.uid}`)
    sendContent(bookName,bookDesc,bookWrit,image)
  }
  function handleSendContent(bookName,bookDesc,bookWrit,image) {
    console.log(image);
    const user=auth().currentUser
    const currentObj={
      username: user.email.split("@")[0],
      bookName,
      bookDescription: bookDesc,
      bookWriter: bookWrit,
      image: image,
      like:0,
      date: (new Date()).toISOString()
    }
  
    // Özel ID ile kaydet
    database().ref(`private-books/${user.uid}`).push(currentObj)
  
    // Herkese açık kaydet, özel ID altında
    const publicContentObj = {
      ...currentObj,
      uid: user.uid
    }
    database().ref(`public-books/`).push(publicContentObj)
  }
  
  function onBanane(item) {
    console.log(item.like);
    const user=auth().currentUser
    database().ref(`/public-books/${item.id}/`).update({like:item.like+1})
   
    // /private-books/kKhy4XHUDGVVQa4IPMS5NFKMj5P2/-NRhhE3gb6d6eN0MEIjT/like
  }

  const renderItemShown=({item})=><BookCard item={item} onLike={()=>onBanane(item)} />
  
  return (
    <View style={styles.container}>
        {/* <Text>SA</Text> */}
        <FlatList data={publicContentList} renderItem={renderItemShown} numColumns={2}/>
        <FloatingButton onPress={handleInputToggle}/>
        <Modal visible={isModalVisible} onClose={handleInputToggle} onSend={handleSendContent} />
        
    </View>
  )
}

export default Menu