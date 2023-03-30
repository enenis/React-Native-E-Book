import React, {useState,useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList,ActivityIndicator} from 'react-native';
import styles from './ProfileDetail.style';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import * as ImagePicker from 'react-native-image-picker';
import {Avatar} from "react-native-paper"
import { utils } from '@react-native-firebase/app';
import Button from '../../components/Button';
import parsedContentData from '../../utils/parsedContentData';
import BookCard from '../../components/BookCard';





const UserProfile = ({ route }) => {
  const getUserAndBooks = async (uid) => {
    const userDoc = await firestore().collection('users').doc(uid).get();
    const user = userDoc.data();
  
    const booksQuery = await firestore()
    .collection('books')
    .where('visibility', '==', 'public')
    .where('userId', '==', uid)
    .get();
    const books = booksQuery.docs.map((doc) => doc.data());
  
    return {
      user,
      books,
    };
  }



  const { uid } = route.params;
  const [userAndBooks, setUserAndBooks] = useState(null);

  useEffect(() => {
    getUserAndBooks(uid).then((data) => setUserAndBooks(data));
  }, [uid]);

  if (!userAndBooks) {
    return <ActivityIndicator />;
  }

  const { user, books } = userAndBooks;

  return (
    <View>
      <Image source={{ uri: user.photoUrl }} />
      <Text>{user.displayName}</Text>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </View>
  );
}

export default UserProfile;