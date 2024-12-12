import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { image500 } from "../api/tmdb";

let { width, height } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  const scrollX = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={data}
        renderItem={({ item, index }) => (
          <MovieCard
            item={item}
            index={index}
            scrollX={scrollX}
            handleClick={handleClick}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingLeft: width * 0.1 }}
        snapToInterval={width * 0.62}
        decelerationRate="fast"
      />
    </View>
  );
}

const MovieCard = ({ item, index, scrollX, handleClick }) => {
  const inputRange = [
    (index - 1) * width * 0.62,
    index * width * 0.62,
    (index + 1) * width * 0.62,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Animated.Image
        source={{ uri: image500(item.poster_path) }}
        style={[
          styles.moviePoster,
          { width: width * 0.6, height: height * 0.4, transform: [{ scale }] },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  moviePoster: {
    borderRadius: 25,
    marginRight: 15,
  },
});
