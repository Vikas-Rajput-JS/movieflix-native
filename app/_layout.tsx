import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux/store";
export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <StatusBar hidden={true} />

        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="movie/[id]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/login/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth/signup/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </Provider>
    </>
  );
}
