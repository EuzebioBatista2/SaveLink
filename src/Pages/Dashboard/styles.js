import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const DashboardBackground = styled.ImageBackground`
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
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #E33C2F;
  border: 1px solid #FFF;
  right: 20px;
  top: 20px;
  z-index: 10;
`;