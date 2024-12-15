import { render, fireEvent, screen } from "@testing-library/react-native";
import MovieList from "..components/MovieList";
import { NavigationContainer } from "@react-navigation/native";

const mockPush = jest.fn();

const mockData = [
  {
    title: "Movie 1",
    poster_path: "/path/to/image1.jpg",
  },
  {
    title: "Movie 2",
    poster_path: "/path/to/image2.jpg",
  },
];

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    push: mockPush,
  }),
}));

describe("MovieList Component", () => {
  it("should render the MovieList with the correct title", () => {
    render(
      <NavigationContainer>
        <MovieList title="Popular Movies" data={mockData} hideSeeAll={false} />
      </NavigationContainer>
    );

    expect(screen.getByText(/Popular Movies/i)).toBeTruthy();
  });

  it("should render the correct number of movies", () => {
    render(
      <NavigationContainer>
        <MovieList title="Popular Movies" data={mockData} hideSeeAll={false} />
      </NavigationContainer>
    );

    expect(screen.getAllByRole("image")).toHaveLength(mockData.length);
  });

  it("should navigate to movie details when a movie is pressed", () => {
    render(
      <NavigationContainer>
        <MovieList title="Popular Movies" data={mockData} hideSeeAll={false} />
      </NavigationContainer>
    );

    fireEvent.press(screen.getAllByRole("button")[0]);

    expect(mockPush).toHaveBeenCalledWith("Movie", mockData[0]);
  });

  it("should truncate long movie titles", () => {
    const longTitleData = [
      {
        title: "A Very Long Movie Title That Should Be Truncated",
        poster_path: "/path/to/longtitleimage.jpg",
      },
    ];

    render(
      <NavigationContainer>
        <MovieList
          title="Popular Movies"
          data={longTitleData}
          hideSeeAll={false}
        />
      </NavigationContainer>
    );

    expect(screen.getByText(/A Very Long/i)).toBeTruthy();
    expect(
      screen.queryByText(/A Very Long Movie Title That Should Be Truncated/i)
    ).toBeNull();
  });
});
