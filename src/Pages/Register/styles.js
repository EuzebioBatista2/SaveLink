import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const SignBackground = styled.ImageBackground`
  flex: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 30px;
  min-height: inherit;
`;

export const BrandContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 120px;
`;

export const PrincipalLogo = styled.View`
  justify-content: center;
  align-items: center;
`;

export const PrincipalText = styled.Text`
  font-size: 35px;
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
  align-self: self-start;
`;