import React, {useContext, useEffect, useState} from 'react';
import {
  AccountBackground,
  ButtonText,
  ButtonsContainer,
  Container,
  ImageButton,
  ImageButtonText,
  InfomationsText,
  InfomationsTextTitle,
  Informations,
  LogoutButton,
  ProfileImage,
  Title,
} from './styles';
import {AppContext} from '../../Context/AppContext';
import Loading from '../../components/Loading';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firebase from '../../database/firebase';
import {deleteObject, getDownloadURL, ref} from 'firebase/storage';
import {uploadBytes} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {Alert} from 'react-native';

export default function Account() {
  const [userUid, setUserUid] = useState('');

  const storage = firebase.storage;
  const storageRef = ref(storage, `${userUid}/profile/userPhoto.jpg`);

  const {auth, handleLogout, getUser, loading, activateLoading} =
    useContext(AppContext);

  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/savelink-5bc16.appspot.com/o/default%2FUnknownProfile.png?alt=media&token=69121cba-a26c-42e6-a331-a16c320b15a3',
  );

  const options = {
    type: 'photo',
    quality: 1,
    selectionLimit: 1,
  };

  function uploadPhoto(fileUri) {
    fetch(fileUri)
      .then(response => response.blob())
      .then(async blob => {
        await uploadBytes(storageRef, blob).then(() => {
          Alert.alert('Sucesso', 'Upload de imagem realizado com sucesso', [
            {
              text: 'Confirmar',
              style: 'default',
            },
          ]);
        });

        await activateLoading(false);
      });
  }

  function photoAlbum() {
    activateLoading(true);
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      }

      const fileUri = response.assets[0].uri;
      const uid = getAuth().currentUser.uid;
      setUserUid(uid);

      await getDownloadURL(storageRef)
        .then(async () => {
          await deleteObject(storageRef).then(() => {
            uploadPhoto(fileUri);
          });
        })
        .catch(() => {
          uploadPhoto(fileUri);
        });

      setImage(fileUri);
    });
  }

  function getPhotoByCamera() {
    activateLoading(true);
    launchCamera(options, async response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      }

      const fileUri = response.assets[0].uri;
      const uid = getAuth().currentUser.uid;
      setUserUid(uid);

      await getDownloadURL(storageRef)
        .then(async () => {
          await deleteObject(storageRef).then(() => {
            uploadPhoto(fileUri);
          });
        })
        .catch(() => {
          uploadPhoto(fileUri);
        });

      setImage(fileUri);
    });
  }

  async function getImage() {
    activateLoading(true);
    const uid = getAuth().currentUser.uid;
    setUserUid(uid);
    const storageRef = ref(storage, `users/${uid}/profile/userPhoto.jpg`);
    await getDownloadURL(storageRef)
      .then(async url => {
        setImage(url);
      })
      .catch(async () => {
        const defaultRef = ref(storage, 'default/UnknownProfile.png');
        await getDownloadURL(defaultRef).then(url => {
          setImage(url);
        });
      });
  }

  useEffect(() => {
    activateLoading(true);
    getImage();
    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container>
        <AccountBackground source={require('../../images/Background2.jpg')}>
          <Title>Dados do usuário</Title>

          <ProfileImage source={{uri: image}} />
          <ButtonsContainer>
            <ImageButton onPress={photoAlbum}>
              <ImageButtonText>Álbum</ImageButtonText>
            </ImageButton>
            <ImageButton onPress={getPhotoByCamera}>
              <ImageButtonText>Câmera</ImageButtonText>
            </ImageButton>
          </ButtonsContainer>

          <Informations>
            <InfomationsTextTitle>Nome: </InfomationsTextTitle>
            <InfomationsText>{auth && auth.name}</InfomationsText>
          </Informations>

          <Informations>
            <InfomationsTextTitle>Email: </InfomationsTextTitle>
            <InfomationsText>{auth && auth.email}</InfomationsText>
          </Informations>

          <LogoutButton onPress={handleLogout}>
            <ButtonText>Sair</ButtonText>
          </LogoutButton>
        </AccountBackground>
      </Container>
    );
  }
}
