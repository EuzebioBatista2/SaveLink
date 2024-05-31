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

export const ProfileImage = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 1px solid #FFF;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0px;
`;

export const ImageButton = styled.TouchableOpacity`
  height: 40px;
  width: 100px;
  border-radius: 4px;
  background-color: #FF5757;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
`;

export const ImageButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #FFF;
  margin-bottom: 20px;
`;

export const Informations = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;

export const InfomationsText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const InfomationsTextTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 300px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #FF5757;
  border-radius: 4px;
  border: 1px solid #fff;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
`;
