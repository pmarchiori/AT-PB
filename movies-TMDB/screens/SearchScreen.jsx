import { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { XMarkIcon } from "react-native-heroicons/outline";

import { debounce } from "lodash";

import Loading from "../components/Loading";

import { image185, searchMovies } from "../api/tmdb";

let { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (value) => {
    console.log("value: ", value);
    if (value && value.length > 1) {
      setIsLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setIsLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={styles.searchBar}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.closeIconContainer}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text style={styles.resultsText}>Results ({results.length})</Text>
          <View style={styles.resultsContainer}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={styles.posterContainer}>
                    <Image
                      style={styles.moviePoster}
                      source={{ uri: image185(item?.poster_path) }}
                    />
                    <Text style={styles.movieName}>
                      {item?.title &&
                        (item.title.length > 22
                          ? item.title.slice(0, 22) + "..."
                          : item.title)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text style={styles.resultsText}>No movie found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
  searchBarContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
  },
  searchBar: {
    paddingBottom: 10,
    paddingLeft: 12,
    flex: 1,
    color: "white",
    fontWeight: "600",
  },
  closeIconContainer: {
    padding: 10,
    margin: 3,
  },
  resultsText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  moviePoster: {
    borderRadius: 20,
    width: width * 0.44,
    height: height * 0.3,
  },
  posterContainer: {
    marginVertical: 8,
  },
  movieName: {
    marginLeft: 2,
    color: "grey",
  },
});
