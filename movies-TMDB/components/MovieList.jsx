import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";

import { image185 } from "../api/tmdb";

let { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See All</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  style={[
                    styles.moviePoster,
                    { width: width * 0.33, height: height * 0.22 },
                  ]}
                />
                <Text style={styles.movieName}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 12,
    marginBottom: 12,
  },
  seeMoreText: {
    color: "blue",
    fontSize: 16,
  },
  textContainer: {
    marginRight: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  movieName: {
    color: "white",
    textAlign: "center",
  },
  imageContainer: {
    marginRight: 8,
  },
  moviePoster: {
    borderRadius: 20,
  },
});
