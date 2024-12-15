import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import SearchScreen from "../screens/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { searchMovies } from "../api/tmdb";

jest.mock("../api/tmdb", () => ({
  searchMovies: jest.fn(),
}));

const Stack = createNativeStackNavigator();
const TestWrapper = ({ children }) => (
  <NavigationContainer>
    <Stack.Navigator>{children}</Stack.Navigator>
  </NavigationContainer>
);

describe("SearchScreen", () => {
  it("should render correctly and show 'No movie found' when there are no results", async () => {
    searchMovies.mockResolvedValueOnce({ results: [] });

    render(
      <TestWrapper>
        <SearchScreen />
      </TestWrapper>
    );

    await waitFor(() => screen.getByPlaceholderText("Search Movie"));

    expect(screen.getByText("No movie found.")).toBeTruthy();
  });

  it("should display search results when there are movies found", async () => {
    const mockMovies = [
      { title: "Movie 1", poster_path: "/path1.jpg" },
      { title: "Movie 2", poster_path: "/path2.jpg" },
    ];

    searchMovies.mockResolvedValueOnce({ results: mockMovies });

    render(
      <TestWrapper>
        <SearchScreen />
      </TestWrapper>
    );

    fireEvent.changeText(screen.getByPlaceholderText("Search Movie"), "Movie");

    await waitFor(() => screen.getByText("Results (2)"));

    expect(screen.getByText("Movie 1")).toBeTruthy();
    expect(screen.getByText("Movie 2")).toBeTruthy();
  });

  it("should debounce search input and call search after 400ms", async () => {
    jest.useFakeTimers();
    searchMovies.mockResolvedValueOnce({ results: [] });

    render(
      <TestWrapper>
        <SearchScreen />
      </TestWrapper>
    );

    fireEvent.changeText(screen.getByPlaceholderText("Search Movie"), "Movie");

    jest.advanceTimersByTime(400);

    expect(searchMovies).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it("should navigate to 'Home' screen when close button is pressed", () => {
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate };

    render(
      <TestWrapper>
        <SearchScreen navigation={navigation} />
      </TestWrapper>
    );

    fireEvent.press(screen.getByTestId("close-icon"));

    expect(mockNavigate).toHaveBeenCalledWith("Home");
  });
});
