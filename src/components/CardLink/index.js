import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  BodyItem,
  ChceckButton,
  CloseButton,
  DeleteButton,
  EditButton,
  Inputs,
  LinkText,
  Options,
  UrlButton,
  UrlText,
  UrlTextInput,
} from './styles';
import {Alert, ToastAndroid, View} from 'react-native';
import {AppContext} from '../../Context/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import {getAuth} from 'firebase/auth';
import firebase from '../../database/firebase';
import {ref, remove, update} from 'firebase/database';

export default function CardLink({list}) {
  const database = firebase.database;

  const urlLink = useRef(null);

  const {
    webPage,
    activateWebPage,
    getSelect,
    handleSetOption,
    activateLoading,
    getLinks,
  } = useContext(AppContext);

  const [linkName, setLinkName] = useState(list.item[0]);
  const [linkUrl, setLinkUrl] = useState(list.item[1]);
  const [editOptions, setEditOptions] = useState(false);

  function handleCopy() {
    Clipboard.setString(linkUrl);
    ToastAndroid.show('Texto copiado!', ToastAndroid.SHORT);
  }

  function handleEdit() {
    setEditOptions(true);
  }

  function handleClose() {
    setEditOptions(false);
    setLinkUrl(list.item[1]);
  }

  function handleRemover() {
    const userUid = getAuth().currentUser.uid;
    const dbRef = ref(
      database,
      `users/${userUid}/links/${list.item[2]}/items/${list.item[0]}`,
    );
    Alert.alert('Ação perigosa', 'Tem certeza que deseja excluir o link?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => {
          remove(dbRef).then(() => {
            activateLoading(true);
            setEditOptions(false);
            getLinks();
            getSelect();
            handleSetOption('');
            Alert.alert('Sucesso', 'Link excluído.', [
              {
                text: 'Confirmar',
                style: 'default',
              },
            ]);
          });
        },
      },
    ]);
  }

  function handleCheck() {
    const lowerTitle = linkUrl.charAt(0).toLowerCase() + linkUrl.slice(1);

    const userUid = getAuth().currentUser.uid;

    const dbRef = ref(
      database,
      `users/${userUid}/links/${list.item[2]}/items/`,
    );

    update(dbRef, {
      [linkName]: linkUrl,
    });
    setEditOptions(false);
    getSelect();
    handleSetOption('');
    getLinks();
    setLinkUrl(lowerTitle);
  }

  useEffect(() => {
    if (editOptions && urlLink.current) {
      urlLink.current.focus();
    }
  }, [editOptions]);

  return (
    <BodyItem>
      <View style={{flexDirection: 'row'}}>
        {editOptions ? (
          <Inputs>
            <LinkText>{linkName}: </LinkText>
            <UrlTextInput
              onChangeText={text => setLinkUrl(text)}
              value={linkUrl}
              ref={urlLink}
            />
          </Inputs>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <LinkText>{linkName}: </LinkText>

            <UrlButton
              onPress={() => activateWebPage(!webPage, linkUrl)}
              onLongPress={() => handleCopy()}>
              <UrlText>{linkUrl}</UrlText>
            </UrlButton>
          </View>
        )}

        {editOptions ? (
          <Options>
            <CloseButton onPress={handleClose}>
              <Feather name="x" color="#FF1A0E" size={22} />
            </CloseButton>
            <ChceckButton onPress={handleCheck}>
              <Feather name="check" color="#279846" size={22} />
            </ChceckButton>
            <DeleteButton onPress={handleRemover}>
              <Feather name="trash" color="#FFF" size={18} />
            </DeleteButton>
          </Options>
        ) : (
          <Options>
            <EditButton onPress={handleEdit}>
              <Feather name="edit-2" color="#FBC219" size={18} />
            </EditButton>
          </Options>
        )}
      </View>
    </BodyItem>
  );
}
