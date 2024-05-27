import React from "react";
import { Button, ButtonText, Container, Input, InputBox, Label, Title } from "./styles";

export default function SignIn() {
  return (
    <Container>
      <Title>Login</Title>

      <InputBox>
        <Label>Email:</Label>
        <Input
          placeholder="Your email..."
          placeholderTextColor="#797B7A"
        />

        <Label>Password:</Label>
        <Input
          placeholder="Your password..."
          placeholderTextColor="#797B7A"
        />

        <Button onPress={() => navigation.navigate('Login')}>
          <ButtonText>Login</ButtonText>
        </Button>
      </InputBox>
    </Container>
  );
}