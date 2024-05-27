import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HomeBackground = styled.ImageBackground`
  flex: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 20px;
`;

export const LogoIcon = styled.View`
  align-items: center;
  justify-content: center;
  margin: 80px 0px;
`;

export const Buttons = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const Button = styled.TouchableOpacity`
  width: 300px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #FF5757;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
`;

export const BrandContainer = styled.View`
  flex: 1;
  width: 200px;
  justify-content: flex-end;
`;

export const PrincipalLogo = styled.View`
  justify-content: center;
  align-items: center;
`;

export const PrincipalText = styled.Text`
  font-size: 40px;
  color: #FFF;
  font-weight: 400;
`;

export const LineOne = styled.View`
  width: 140px;
  border: 2px solid #FFF;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const LineTwo = styled.View`
  width: 100px;
  border: 1.5px solid #FFF;
  margin-bottom: 10px;
  border-radius: 4px;
`;