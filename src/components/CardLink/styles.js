import styled from "styled-components/native";

export const BodyItem = styled.View`
  min-height: 50px;
  background-color: #5F6362;
  padding: 10px;
  border-bottom-width: 2px;
  border-color: #7B7D7D;
  justify-content: center;
`;

export const LinkText = styled.Text`
  font-size: 16px;
  color: #FFF;
`;

export const UrlButton = styled.TouchableOpacity`
  width: 70%;
`;

export const UrlText = styled.Text`
  width: 90%;
  font-size: 16px;
  color: #027CC1;
  text-decoration: underline;
  word-break: normal;
`;

export const Inputs = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
`;

export const LinkTextInput = styled.TextInput`
  font-size: 16px;
  color: #FFF;
  margin: 0px;
  padding: 0px;
`;

export const UrlTextInput = styled.TextInput`
  font-size: 16px;
  color: #027CC1;
  text-decoration: underline;
  word-break: normal;
  margin: 0px;
  padding: 0px;
`;

export const Options = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

export const EditButton = styled.TouchableOpacity``;

export const CloseButton = styled.TouchableOpacity``;
export const ChceckButton = styled.TouchableOpacity``;
export const DeleteButton = styled.TouchableOpacity``;
