// import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite"
import { initializeDatabase } from "../services/neoDb"

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="neo.db" onInit={initializeDatabase}>
      <Stack screenOptions={{ headerShown: false}}/>
    </SQLiteProvider>
);
}
