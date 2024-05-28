import React, { useContext, useEffect } from "react";
import { Container, Title } from "./styles";
import { AppContext } from "../../Context/AppContext";
import Loading from "../../components/Loading";

export default function Dashboard () {

  const { getUser, loading, activateLoading } = useContext(AppContext);

  useEffect(() => {
    activateLoading(true);
    getUser();
  }, [])

  if(loading) {
    return(
      <Loading />
    )
  } else {
    return (
      <Container>
        <Title>Conta</Title>
      </Container>
    );
  }

}