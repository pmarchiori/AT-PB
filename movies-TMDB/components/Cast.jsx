import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import { image185 } from "../api/tmdb";

export default function Cast({ cast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <View key={index}>
                <View style={styles.castContainer}>
                  <Image
                    source={{ uri: image185(person?.profile_path) }}
                    style={styles.castImage}
                  />
                  <Text style={styles.personNameText}>
                    {person?.original_name.length > 10
                      ? person?.original_name.slice(0, 10) + "..."
                      : person?.original_name}
                  </Text>
                  <Text style={styles.characterNameText}>
                    {person?.character.length > 10
                      ? person?.character.slice(0, 10) + "..."
                      : person?.character}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 18,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  castContainer: {
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
  },
  characterNameText: {
    color: "grey",
    margin: 4,
    fontSize: 12,
  },
  personNameText: {
    color: "white",
    margin: 4,
  },
  castImage: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
});
