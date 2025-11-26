import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#a9b7c7ff",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
