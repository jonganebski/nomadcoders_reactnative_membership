import React from "react";
import { View, Text, Button } from "react-native";

export default ({ navigation }) => (
  <View>
    <Text>Home</Text>
    <Button
      title="Go to Detail"
      onPress={() => navigation.navigate("Detail")}
    ></Button>
  </View>
);
