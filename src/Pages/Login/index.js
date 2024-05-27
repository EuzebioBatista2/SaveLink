import React from "react";
import { ScrollView, Text, View } from "react-native";
import { BrandContainer, Container, LineOne, LineTwo, PrincipalLogo, PrincipalText, ScrollContainer, SignBackground } from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import SignIn from "../../components/SignIn";

export default function Login() {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ minHeight: '100%' }}>
        <SignBackground source={require('../../images/SignBackground.jpg')}>
          <BrandContainer>
            <PrincipalLogo>
              <Feather name="save" size={50} color="#FF5757" />
            </PrincipalLogo>
            <View>
              <PrincipalText>SAVE LINK</PrincipalText>
              <LineOne />
              <LineTwo />
            </View>
          </BrandContainer>

          <SignIn />
        </SignBackground >
      </ScrollView>
    </Container >
  );
}