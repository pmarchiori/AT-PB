import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/tmdb";

let { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setIsLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    >
      <View>
        <SafeAreaView style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size={30} color={isFavorite ? "blue" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
              style={styles.moviePoster}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={styles.gradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      <View style={styles.movieDetailsContainer}>
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        {movie?.id ? (
          <Text style={styles.movieDetailsText}>
            {movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        <View style={styles.movieGenresContainer}>
          {movie?.genres?.map((genre, index) => {
            let showBar = index + 1 != movie.genres.length;
            return (
              <Text key={index} style={styles.movieDetailsText}>
                {" "}
                {genre?.name} {showBar ? "|" : null}
              </Text>
            );
          })}
        </View>

        <Text style={styles.movieDescription}>{movie?.overview}</Text>
      </View>

      {cast.length > 0 && <Cast cast={cast} />}

      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,1)",
  },
  iconContainer: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  moviePoster: {
    width,
    height: height * 0.55,
  },
  gradient: {
    width: "100%",
    height: height * 0.4,
    position: "absolute",
    bottom: 0,
  },
  movieDetailsContainer: {
    marginTop: -(height * 0.09),
  },
  movieTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  movieDetailsText: {
    color: "grey",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },
  movieGenresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "12",
  },
  movieDescription: {
    color: "grey",
    marginHorizontal: 12,
    textAlign: "center",
    marginTop: 12,
  },
});
