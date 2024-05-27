import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const AccountBackground = styled.ImageBackground`
  flex: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #FFF;
  margin-bottom: 20px;
`;

export const Informations = styled.View`
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export const InfomationsText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 300px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #D23A2E;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
`;
