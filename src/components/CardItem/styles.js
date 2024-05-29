import styled from "styled-components/native";

export const Container = styled.View`
  width: 300px;
  border: 1px solid #E2E2E2;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  margin-bottom: 4px;
`;

export const CardHeader = styled.View`
  background-color: #FF5757;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 50px;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  color: #FFF;
`;

export const ToogleButton = styled.TouchableOpacity``;

export const CardBody = styled.View`
  width: 100%;
  height: ${props => props.cardHeight};
`;

export const LinkEmpty = styled.View`
  height: 50px;
  background-color: #5F6362;
  justify-content: center;
  align-items: center;
`;

export const TextEmpty = styled.Text`
  font-size: 16px;
  color: #FFF;
`;