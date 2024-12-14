import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";

import Loading from "../components/Loading";

export default function Favorites() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Movies</Text>
        </View>
      </SafeAreaView>
      {/* {isLoading ? (
        <Loading />
      ) : (
        
      )} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Text style={styles.title}>Favorites</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
  safeContainer: {
    marginBottom: 3,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 12,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
