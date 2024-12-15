import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import * as tmdbApi from "../api/tmdb";
import { jest } from "@jest/globals";

// mock do componente de loading
jest.mock("../components/Loading", () => () => <Text>Loading...</Text>);
// mock dos componentes dependentes
jest.mock("../components/TrendingMovies", () => ({ data }) => (
  <Text>TrendingMovies: {data.length} items</Text>
));
jest.mock("../components/MovieList", () => ({ title, data }) => (
  <Text>
    {title}: {data.length} items
  </Text>
));

// mock da api
jest.spyOn(tmdbApi, "fetchTrendingMovies").mockResolvedValue({
  results: [
    { id: 1, title: "Trending Movie 1" },
    { id: 2, title: "Trending Movie 2" },
  ],
});
jest.spyOn(tmdbApi, "fetchUpcomingMovies").mockResolvedValue({
  results: [{ id: 3, title: "Upcoming Movie 1" }],
});
jest.spyOn(tmdbApi, "fetchTopRatedMovies").mockResolvedValue({
  results: [
    { id: 4, title: "Top Rated Movie 1" },
    { id: 5, title: "Top Rated Movie 2" },
  ],
});

describe("Home Component", () => {
  it("renders loading component initially", () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders Movies title", async () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    await waitFor(() => {
      expect(screen.getByText("Movies")).toBeTruthy();
    });
  });

  it("renders TrendingMovies, Upcoming, and Top Rated movie lists after data loads", async () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(screen.getByText("TrendingMovies: 2 items")).toBeTruthy();
      expect(screen.getByText("Upcoming: 1 items")).toBeTruthy();
      expect(screen.getByText("Top Rated: 2 items")).toBeTruthy();
    });
  });

  it("displays navigation icons", () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    expect(screen.getAllByTestId("heroicon")).toHaveLength(2);
  });
});
