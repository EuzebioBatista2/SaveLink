import React, { useContext, useEffect, useState } from "react";
import {
  CloseButton,
  Container,
  DashboardBackground,
  MessegeContainer,
  MessegeEmpty,
  ErrorPage,
  ErrorMessage
} from "./styles";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";
import { FlatList, View } from "react-native";
import CardItem from "../../components/CardItem";
import { WebView } from "react-native-webview";
import Feather from 'react-native-vector-icons/Feather'

export default function Dashboard() {

  const [errorPage, setErrorPage] = useState(false);

  const {
    getUser,
    loading,
    activateLoading,
    webPage,
    activateWebPage,
    urlPage,
    getLinks,
    data
  } = useContext(AppContext);

  function handleCloseButton() {
    activateWebPage(false)
    setErrorPage(false);
  }

  useEffect(() => {
    activateLoading(true);
    getUser();
    activateLoading(true);
    getLinks();
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  else if (webPage) {
    return (
      <>
        {errorPage ? (
          <ErrorPage>
            <ErrorMessage>
              Conteúdo não encontrado, página web não existe.
            </ErrorMessage>
            <CloseButton onPress={handleCloseButton}>
              <Feather name="x" color="#FFF" size={25} />
            </CloseButton>
          </ErrorPage>
        ) : (
          <View style={{ flex: 1, position: 'relative' }}>
            <WebView
              source={{ uri: urlPage }}
              onError={() => setErrorPage(true)}
            />
            <CloseButton onPress={handleCloseButton}>
              <Feather name="x" color="#FFF" size={25} />
            </CloseButton>
          </View>
        )}
      </>
    );
  }
  else {
    return (
      <Container>
        <DashboardBackground source={require('../../images/Background2.jpg')}>
          {data.length === 0 ? (
            <MessegeContainer>
              <MessegeEmpty>
                Não há nenhum item registrado no momento.
              </MessegeEmpty>
            </MessegeContainer>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <CardItem list={item} />
              )}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
            />
          )}
        </DashboardBackground>
      </Container>
    );
  }

}

