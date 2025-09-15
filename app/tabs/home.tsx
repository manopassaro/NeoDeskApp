import { View, Text } from 'react-native'
import { useRouter } from "expo-router";
import React from 'react'
import  CustomButton  from "../../assets/components/customButton";

const home = () => {

    const router = useRouter()
  return (
    <View>
      <Text>home</Text>
      <CustomButton title="Logout" onPress={() => router.push("/auth")} />
    </View>
  )
}

export default home