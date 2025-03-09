import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { loginService } from "@/services/api";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/Slice/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setErrors] = useState("");
  const handleLogin = async () => {
    try {
      setLoading(true);
      let res = await loginService({ email, password });
      if (res.user) {
        dispatch(loginUser(res.user));
        setLoading(false);
        router.push("/(tabs)/profile");
      }
    } catch (error: any) {
      setLoading(false);
      setErrors(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={icons.person} style={styles.image} />
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        )}
        <View style={styles.footer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text
              onPress={() => router.push("/auth/signup")}
              style={styles.signUpText}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1, // Add this line to define the border width
    borderColor: "black", // Set the border color to black
    backgroundColor: "", // Set background color to white
    fontSize: 16,
    color: "black",
  },
  loginButton: {
    backgroundColor: "#03dac6",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#fff",
  },
  signUpText: {
    color: "#03dac6",
    fontWeight: "bold",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 18,
    marginBottom: 30,
  },
  errorBox: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default Login;
