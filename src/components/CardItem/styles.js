import styled from "styled-components/native";

export const Container = styled.View`
  width: 300px;
  border: 1px solid #2B2C32;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  margin-bottom: 4px;
`;

export const CardHeader = styled.View`
  background-color: #2B2C32;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-height: 50px;
`;

export const HeaderText = styled.Text`
  width: 70%;
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
`;

export const HeaderTextInput = styled.TextInput`
  width: 70%;
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
  margin: 0px;
  padding: 0px;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const EditButton = styled.TouchableOpacity``;
export const ToogleButton = styled.TouchableOpacity``;

export const CloseButton = styled.TouchableOpacity``;
export const ChceckButton = styled.TouchableOpacity``;
export const DeleteButton = styled.TouchableOpacity``;

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