import React from "react";
import { Button, ButtonText, Container, Input, InputBox, Label, Title } from "./styles";

export default function SignUp() {
  return (
    <Container>
      <Title>Register</Title>

      <InputBox>
        <Label>Name:</Label>
        <Input
          placeholder="Your name..."
          placeholderTextColor="#797B7A"
        />

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
          <ButtonText>Register</ButtonText>
        </Button>
      </InputBox>
    </Container>
  );
}