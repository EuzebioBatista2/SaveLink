import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function Loading() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFE4E8'}}>
      <ActivityIndicator color="#E64032" size={45} />
    </SafeAreaView>
  );
}