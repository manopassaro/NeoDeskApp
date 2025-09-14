import { View, Text, Button } from 'react-native'
import { useRouter } from "expo-router";
import React from 'react'
import  CustomButton  from "../../assets/components/customButton";

const home = () => {

    const router = useRouter()
  return (
    <View>
      <Text>home</Text>
      <CustomButton title="Voltar" onPress={() => router.back()} />
    </View>
  )
}

export default home