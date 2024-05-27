import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #FFF;
  margin-bottom: 18px;
`;

export const InputBox = styled.View`
  width: 100%;
  gap: 6px;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #FFF;
`;

export const Input = styled.TextInput`
  height: 50px;
  background-color: #484A49;
  padding: 10px;
  color: #FFF;
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 16px;

`;

export const Button = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #FF5757;
  border-radius: 4px;
  margin-top: 6px;

`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
`;