import React, { useContext, useEffect, useState } from "react";
import { BrandContainer, Button, ButtonText, Buttons, Container, HomeBackground, LineOne, LineTwo, LogoIcon, PrincipalLogo, PrincipalText } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";

export default function Home() {

  const navigation = useNavigation();
  const { loading, activateLoading } = useContext(AppContext);
  
  useEffect(() => {
    activateLoading(true);
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        activateLoading(false);
        navigation.navigate('TabRoutes', { screen: 'Dashboard' })
      } 
      activateLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <Container>
        <HomeBackground source={require('../../images/Background.jpg')}>
          <LogoIcon>
            <Feather name="check-circle" size={120} color="#FF5757" />
          </LogoIcon>

          <Buttons>
            <Button onPress={() => navigation.navigate('Login')}>
              <ButtonText>Login</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate('Register')}>
              <ButtonText>Registrar</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate('TabRoutes', { screen: 'Dashboard' })}>
              <ButtonText>Entra sem uma conta</ButtonText>
            </Button>
          </Buttons>

          <BrandContainer>
            <PrincipalLogo>
              <Feather name="save" size={60} color="#FF5757" />
            </PrincipalLogo>
            <PrincipalText>SAVE LINK</PrincipalText>
            <LineOne />
            <LineTwo />
          </BrandContainer>
        </HomeBackground>
      </Container>
    );
  }
}