import React, { useContext, useEffect, useRef, useState } from "react";
import { 
  CardBody, 
  CardHeader, 
  ChceckButton, 
  CloseButton, 
  Container, 
  DeleteButton, 
  EditButton, 
  HeaderText, 
  HeaderTextInput, 
  LinkEmpty, 
  Options, 
  TextEmpty, 
  ToogleButton 
} from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import { Alert, FlatList } from "react-native";
import CardLink from "../CardLink";
import firebase from "../../database/firebase";
import { ref, remove, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { AppContext } from "../../Context/AppContext";

export default function CardItem({ list }) {

  const database = firebase.database;

  const { 
    getSelect, 
    handleSetOption, 
    getLinks, 
    activateLoading 
  } = useContext(AppContext);

  const [links, setLinks] = useState(list.links);
  const [toogloButton, setToogleButton] = useState('chevron-down');
  const [cardHeight, setCardHeight] = useState(0);
  const [editOptions, setEditOptions] = useState(false);
  const [containerText, setContainerText] = useState(list.name);

  const headerText = useRef(null);

  function displayLinks() {
    toogloButton === 'chevron-down' ?
      setToogleButton('chevron-up') : setToogleButton('chevron-down')

    toogloButton === 'chevron-down' ?
      setCardHeight('fit-content') : setCardHeight(0)
  }

  function updateContainer() {
    const capitalizeTitle = containerText.charAt(0).toUpperCase() + containerText.slice(1);
    const userUid = getAuth().currentUser.uid
    const dbRef = ref(database, `${userUid}/links/${list.key}`);
    update(dbRef, {
      title: capitalizeTitle
    })
    setEditOptions(false);
    getSelect();
    handleSetOption('');
    setContainerText(capitalizeTitle);
  }

  function deleteContainer() {
    const userUid = getAuth().currentUser.uid
    const dbRef = ref(database, `${userUid}/links/${list.key}`);
    Alert.alert(
      'Ação perigosa',
      'Tem certeza que deseja excluir o container? Os valores contido no CONTAINER podem ser excluídos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => {
            remove(dbRef)
              .then(() => {
                activateLoading(true)
                setEditOptions(false);
                getSelect();
                handleSetOption('');
                getLinks()
                Alert.alert(
                  'Sucesso',
                  'Container excluído.',
                  [
                    {
                      text: 'Confirmar',
                      style: 'default'
                    }
                  ]
                )
              })
          }
        }
      ]
    )
  }

  function closeEditOptions() {
    setEditOptions(!editOptions)
    setContainerText(list.name);
  }

  function displayEditOptions() {
    setEditOptions(!editOptions)
  }

  useEffect(() => {
    if (editOptions && headerText.current) {
      headerText.current.focus();
    }
  }, [editOptions]);

  useEffect(() => {
    function getAllLinks() {
      if (list.links !== undefined) {
        const objectArray = Object.entries(list.links)

        objectArray.map((index, value) => {
          // Add key in each value
          return index[2] = list.key
        })

        setLinks(objectArray)
      } else {
        setLinks([])
      }
    }

    getAllLinks()
  }, [])

  return (
    <Container>
      <CardHeader>
        {editOptions ? (
          <HeaderTextInput
            value={containerText}
            onChangeText={(text) => setContainerText(text)}
            ref={headerText}
          />
        ) : (
          <HeaderText>{containerText}</HeaderText>
        )}

        {editOptions ? (
          <Options>
            <CloseButton onPress={closeEditOptions}>
              <Feather name="x" color="#FF1A0E" size={22} />
            </CloseButton>
            <ChceckButton onPress={updateContainer}>
              <Feather name="check" color="#279846" size={22} />
            </ChceckButton>
            <DeleteButton onPress={deleteContainer}>
              <Feather name="trash" color="#DA3E31" size={18} />
            </DeleteButton>
          </Options>
        ) : (
          <Options>
            <EditButton onPress={displayEditOptions}>
              <Feather name="edit-2" color="#FCC522" size={18} />
            </EditButton>

            <ToogleButton onPress={displayLinks}>
              <Feather name={toogloButton} color="#FFF" size={25} />
            </ToogleButton>
          </Options>
        )}
      </CardHeader>

      <CardBody cardHeight={cardHeight}>
        <FlatList
          data={links}
          keyExtractor={(item) => item[0]}
          renderItem={(item) => (<CardLink list={item} />)}
          ListEmptyComponent={() => (
            <LinkEmpty>
              <TextEmpty>Não há items registrados.</TextEmpty>
            </LinkEmpty>
          )}
        />
      </CardBody>
    </Container>
  );
}