import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { 
  BrandContainer, 
  Container, 
  LineOne, 
  LineTwo, 
  PrincipalLogo, 
  PrincipalText,
  SignBackground 
} from "./styles";
import Feather from 'react-native-vector-icons/Feather';
import SignIn from "../../components/SignIn";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";

export default function Login() {

  const { loading } = useContext(AppContext);


  if(loading) {
    return(
      <Loading />
    )
  } else {
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
}