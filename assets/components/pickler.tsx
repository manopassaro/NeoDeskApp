import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type Props = {
  selectedValue: string | number;
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
  items: { label: string; value: string | number }[];
};

export default function CustomPicker({
  selectedValue,
  onValueChange,
  items,
}: Props) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginVertical: 8,
        overflow: "hidden", // garante bordas arredondadas
      }}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
        dropdownIconColor="#555" // opcional, muda a cor da setinha
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
