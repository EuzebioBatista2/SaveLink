import React, { useEffect, useState } from "react";
import { CardBody, CardHeader, Container, HeaderText, LinkEmpty, TextEmpty, ToogleButton } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import { FlatList, Text } from "react-native";
import CardLink from "../CardLink";

export default function CardItem({list}) {

  const [links, setLinks] = useState(list.links);
  const [toogloButton, setToogleButton] = useState('chevron-down');
  const [cardHeight, setCardHeight] = useState(0);

  function displayLinks() {
    toogloButton === 'chevron-down' ? 
    setToogleButton('chevron-up') : setToogleButton('chevron-down')

    toogloButton === 'chevron-down' ?
    setCardHeight('fit-content') : setCardHeight(0)
  }

  useEffect(() => {
    async function getLinks() {
      if(list.links !== undefined) {
        const objectArray = await Object.entries(list.links)
        setLinks(objectArray)
      } else {
        setLinks([])
      }
    }

    getLinks()
  }, [])

  return(
    <Container>
      <CardHeader>
        <HeaderText>{list.name}</HeaderText>
        <ToogleButton onPress={displayLinks}>
          <Feather name={toogloButton} color="#FFF" size={25} />
        </ToogleButton>
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