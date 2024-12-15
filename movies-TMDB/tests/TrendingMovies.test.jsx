import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import TrendingMovies from "../components/TrendingMovies";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();

const mockData = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "/path/to/image1.jpg",
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "/path/to/image2.jpg",
  },
];

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("TrendingMovies Component", () => {
  it("should render the list of trending movies", () => {
    render(
      <NavigationContainer>
        <TrendingMovies data={mockData} />
      </NavigationContainer>
    );

    expect(screen.getAllByRole("image")).toHaveLength(mockData.length);
  });

  it("should navigate to the movie details when a movie is pressed", () => {
    render(
      <NavigationContainer>
        <TrendingMovies data={mockData} />
      </NavigationContainer>
    );

    fireEvent.press(screen.getAllByRole("button")[0]);

    expect(mockNavigate).toHaveBeenCalledWith("Movie", mockData[0]);
  });

  it("should display the correct image for each movie", () => {
    render(
      <NavigationContainer>
        <TrendingMovies data={mockData} />
      </NavigationContainer>
    );

    mockData.forEach((movie, index) => {
      const image = screen.getAllByRole("image")[index];
      expect(image.props.source.uri).toBe(
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      );
    });
  });

  it("should apply scale transform when scrolling", () => {
    render(
      <NavigationContainer>
        <TrendingMovies data={mockData} />
      </NavigationContainer>
    );

    const firstImage = screen.getAllByRole("image")[0];
    expect(firstImage.props.style[0].transform[0].scale).toBe(1);
  });
});
