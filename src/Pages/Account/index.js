import React, { useContext } from "react";
import { AccountBackground, ButtonText, Container, InfomationsText, Informations, LogoutButton, Title } from "./styles";
import { AppContext } from "../../Context/AppContext";

export default function Account () {

  const { auth, handleLogout } = useContext(AppContext);

  return (
    <Container>
      <AccountBackground source={require('../../images/Background.jpg')}>
        <Title>Conta</Title>
        <Informations>
          <InfomationsText>
            Name: { auth && auth.name }
          </InfomationsText>
          <InfomationsText>
            Email: { auth && auth.email }
          </InfomationsText>
        </Informations>
        <LogoutButton onPress={handleLogout}>
          <ButtonText>Logout</ButtonText>
        </LogoutButton>
      </AccountBackground>
    </Container>
  );
}