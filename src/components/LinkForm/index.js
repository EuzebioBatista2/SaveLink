import React, { useEffect, useState } from "react";
import { Button, ButtonText, InputBox, Label, SelectInput, LinkInput } from "./styles";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from "react-native";

export default function LinkForm({ list, submit }) {

  const [name, setName] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [selectItems, setSelectItems] = useState(null);
  const [containerKey, setContainerKey] = useState('');

  useEffect(() => {
    let optionsList = list.map((value, index) => {
      return <Picker.Item key={index} value={value.key} label={value.title} />
    })
    setSelectItems(optionsList);
    setContainerKey(list[0].key)
  }, [])

  return (
    <InputBox>
      <Label>Nome do container</Label>
      <SelectInput>
        <Picker
          selectedValue={containerKey}
          onValueChange={(value, index) => {
            setContainerKey(value)
          }}
          style={styles.selectInput}
        >
          {selectItems}
        </Picker>
      </SelectInput>
      <Label>Nome do Link</Label>
      <LinkInput
        placeholder="Informe o nome do link..."
        placeholderTextColor="#797B7A"
        onChangeText={(text) => setName(text)}
      />

      <Label>URL do Link</Label>
      <LinkInput
        placeholder="Informe a URL do link..."
        placeholderTextColor="#797B7A"
        onChangeText={(text) => setUrlLink(text)}
      />
      <Button onPress={() => { 
        submit({
          key: containerKey,
          name: name,
          url: urlLink
        }) 
      }}>
        <ButtonText>Inserir</ButtonText>
      </Button>
    </InputBox>
  );
}

const styles = StyleSheet.create({
  selectInput: {
    backgroundColor: '#484A49',
    padding: 10,
    color: '#FFF',
    fontSize: 16,
    borderRadius: 50
  }
})