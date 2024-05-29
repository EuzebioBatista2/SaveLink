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
  width: 80%;
`;

export const UrlText = styled.Text`
  font-size: 16px;
  color: #027CC1;
  text-decoration: underline;
  word-break: normal;
`;
