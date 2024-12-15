import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import MovieScreen from "../screens/MovieScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "../api/tmdb";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../api/tmdb", () => ({
  fetchMovieCredits: jest.fn(),
  fetchMovieDetails: jest.fn(),
  fetchSimilarMovies: jest.fn(),
}));

jest.mock("../components/Loading", () => () => <Text>Loading...</Text>);
jest.mock("../components/Cast", () => () => <Text>Cast Component</Text>);
jest.mock("../components/MovieList", () => () => (
  <Text>MovieList Component</Text>
));

describe("MovieScreen", () => {
  const mockedNavigation = { goBack: jest.fn() };
  const mockedRoute = { params: { id: 1 } };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue(mockedNavigation);
    useRoute.mockReturnValue(mockedRoute);
  });

  test("renders loading state initially", async () => {
    fetchMovieDetails.mockResolvedValueOnce(null);
    const { getByText } = render(<MovieScreen />);
    expect(getByText("Loading...")).toBeTruthy();
  });

  test("renders movie details when data is loaded", async () => {
    fetchMovieDetails.mockResolvedValueOnce({
      id: 1,
      title: "Mocked Movie",
      poster_path: "/mocked_path.jpg",
      status: "Released",
      release_date: "2024-12-14",
      runtime: 120,
      genres: [{ name: "Action" }, { name: "Comedy" }],
      overview: "Mocked overview",
    });

    render(<MovieScreen />);

    await waitFor(() => {
      expect(screen.getByText("Mocked Movie")).toBeTruthy();
      expect(screen.getByText("Released | 2024 | 120 min")).toBeTruthy();
      expect(screen.getByText("Action | Comedy")).toBeTruthy();
      expect(screen.getByText("Mocked overview")).toBeTruthy();
    });
  });

  test("renders cast component when cast data is loaded", async () => {
    fetchMovieCredits.mockResolvedValueOnce({
      cast: [{ name: "Actor 1" }, { name: "Actor 2" }],
    });

    render(<MovieScreen />);

    await waitFor(() => {
      expect(screen.getByText("Cast Component")).toBeTruthy();
    });
  });

  test("renders similar movies when data is loaded", async () => {
    fetchSimilarMovies.mockResolvedValueOnce({
      results: [
        { id: 2, title: "Similar Movie 1" },
        { id: 3, title: "Similar Movie 2" },
      ],
    });

    render(<MovieScreen />);

    await waitFor(() => {
      expect(screen.getByText("MovieList Component")).toBeTruthy();
    });
  });

  test("handles favorite button toggle", async () => {
    fetchMovieDetails.mockResolvedValueOnce({
      id: 1,
      title: "Mocked Movie",
      poster_path: "/mocked_path.jpg",
    });

    const { getByTestId } = render(<MovieScreen />);
    const favoriteButton = getByTestId("favorite-button");

    expect(favoriteButton.props.color).toBe("white");

    fireEvent.press(favoriteButton);
    expect(favoriteButton.props.color).toBe("blue");

    fireEvent.press(favoriteButton);
    expect(favoriteButton.props.color).toBe("white");
  });

  test("navigates back when back button is pressed", () => {
    const { getByTestId } = render(<MovieScreen />);
    const backButton = getByTestId("back-button");

    fireEvent.press(backButton);
    expect(mockedNavigation.goBack).toHaveBeenCalled();
  });
});
