import React, { useContext, useState } from "react";
import { BodyItem, LinkText, UrlButton, UrlText } from "./styles";
import { Clipboard, ToastAndroid, View } from "react-native";
import { AppContext } from "../../Context/AppContext";

export default function CardLink({ list }) {

  const { webPage, activateWebPage } = useContext(AppContext);
  const [link, setLink] = useState(list.item[1])

  function handleCopy () {
    Clipboard.setString(link);
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