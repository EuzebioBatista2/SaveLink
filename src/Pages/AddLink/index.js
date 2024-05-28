import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";
import { AddLinkBackground, Button, ButtonText, Buttons, Container } from "./styles";

export default function AddLink () {

  const { getUser, loading, activateLoading } = useContext(AppContext);

  const [ option, setOption ] = useState('');

  function buttonToggle(option) {
    setOption(option)
  }


  useEffect(() => {
    activateLoading(true);
    getUser();
  }, [])

  if(loading) {
    return(
      <Loading />
    )
  } else {
    return (
      <Container>
        <AddLinkBackground source={require('../../images/Background.jpg')}>
          <Buttons>
            <Button
              checked={option === 'Container' ? true : false}
              onPress={() => buttonToggle('Container')}
            >
              <ButtonText>Container</ButtonText>
            </Button>

            <Button
              checked={option === 'Link' ? true : false}
              onPress={() => buttonToggle('Link')}
            >
              <ButtonText>Link</ButtonText>
            </Button>
          </Buttons>
        </AddLinkBackground>
      </Container>
    );
  }

}