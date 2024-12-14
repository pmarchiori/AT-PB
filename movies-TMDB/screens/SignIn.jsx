import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../services/supabase";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please, fill all the fields.");
      return false;
    }
    return true;
  };

  async function signInWithEmail() {
    if (!validateFields()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Erro no login:", error.message);
    } else {
      //Alert.alert("Log in successfull!");
      navigation.navigate("Home");
    }
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!validateFields()) return;

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Sign up successfull!");
    }
    // if (!session) Alert.alert("Please check your inbox to confirm email!");
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Please log in or register to continue.
        </Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="E-mail"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text style={styles.buttonTitle}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.signUpButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text style={styles.signUpTitle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#121212",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 6,
    marginVertical: 10,
    fontSize: 16,
    height: 50,
  },
  buttonGroup: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  signUpTitle: {
    color: "#007BFF",
    fontSize: 16,
  },
});
