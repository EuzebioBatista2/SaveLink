import React, { useState } from "react";
import { Button, ButtonText, InputBox, Label, TitlteInput } from "./styles";

export default function ContainerForm({submit}) {

  const [title, setTitle] = useState('');

  return (
    <InputBox>
      <Label>Nome do container</Label>
      <TitlteInput
        placeholder="Informe o nome do container..."
        placeholderTextColor="#797B7A"
        onChangeText={(text) => setTitle(text)}
      />
      <Button onPress={() => { submit(title) }}>
        <ButtonText>Inserir</ButtonText>
      </Button>
    </InputBox>
  );
}

