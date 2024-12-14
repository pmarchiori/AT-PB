import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { View, ActivityIndicator, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PrivateRoutes({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        navigation.navigate("SignIn");
      }
      setLoading(false);
    };

    checkSession();
  }, [navigation]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return isAuthenticated ? children : null;
}
