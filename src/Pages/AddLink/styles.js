import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const AddLinkBackground = styled.ImageBackground`
  flex: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Buttons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  width: 100px;
  border-radius: 4px;
  background-color: ${props => props.checked ? '#FF5757' : '#5F6362'};
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF
`;

export const Forms = styled.View`
  width: 100%;
`;