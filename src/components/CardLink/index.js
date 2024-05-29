import React, { useContext, useState } from "react";
import { BodyItem, LinkText, UrlButton, UrlText } from "./styles";
import { ToastAndroid, View } from "react-native";
import { AppContext } from "../../Context/AppContext";
import Clipboard from "@react-native-clipboard/clipboard";

export default function CardLink({ list }) {

  const { webPage, activateWebPage } = useContext(AppContext);

  function handleCopy () {
    Clipboard.setString(list.item[1]);
    ToastAndroid.show('Texto copiado!', ToastAndroid.SHORT);
  };

  return (
    <BodyItem>
      <View style={{ flexDirection: 'row'}}>
        <LinkText>{list.item[0]}: </LinkText>
        <UrlButton 
          onPress={() => activateWebPage(!webPage, list.item[1])}
          onLongPress={() => handleCopy()}
        >
          <UrlText>{list.item[1]}</UrlText>
        </UrlButton>
      </View>
    </BodyItem>
  );
}