import { render, screen } from "@testing-library/react-native";
import Cast from "../components/Cast";

describe("Cast Component", () => {
  const mockCastData = [
    {
      profile_path: "/path/to/image.jpg",
      original_name: "John Doe",
      character: "Main Character",
    },
    {
      profile_path: "/path/to/another_image.jpg",
      original_name: "Jane Smith",
      character: "Sidekick",
    },
  ];

  it("should render the Cast title", () => {
    render(<Cast cast={mockCastData} />);

    expect(screen.getByText(/Cast/i)).toBeTruthy();
  });

  it("should render the cast images correctly", () => {
    render(<Cast cast={mockCastData} />);

    const images = screen.getAllByRole("image");
    expect(images).toHaveLength(mockCastData.length);
  });

  it("should display actor name and character name", () => {
    render(<Cast cast={mockCastData} />);

    mockCastData.forEach((person) => {
      expect(screen.getByText(person.original_name)).toBeTruthy();
      expect(screen.getByText(person.character)).toBeTruthy();
    });
  });

  it("should truncate long actor and character names", () => {
    const longNameData = [
      {
        profile_path: "/path/to/image.jpg",
        original_name: "Very Long Actor Name That Should Be Truncated",
        character: "A Character with a Very Long Name as Well",
      },
    ];

    render(<Cast cast={longNameData} />);

    expect(screen.getByText(/Very Long/i)).toBeTruthy();
    expect(screen.getByText(/A Character/i)).toBeTruthy();
  });
});
