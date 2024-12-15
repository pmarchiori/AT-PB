import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import Favorites from "../screens/Favorites";

describe("Favorites Component", () => {
  const mockOpenDrawer = jest.fn();

  jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      openDrawer: mockOpenDrawer,
    }),
  }));

  it("should render the title correctly", () => {
    render(
      <NavigationContainer>
        <Favorites />
      </NavigationContainer>
    );

    expect(screen.getByText("Movies")).toBeTruthy();
    expect(screen.getByText("Favorites")).toBeTruthy();
  });

  it("should call the openDrawer function when the button is pressed", () => {
    render(
      <NavigationContainer>
        <Favorites />
      </NavigationContainer>
    );

    const menuButton = screen.getByRole("button");
    fireEvent.press(menuButton);

    expect(mockOpenDrawer).toHaveBeenCalledTimes(1);
  });

  it("should display the Loading component when isLoading is true", () => {
    jest.spyOn(React, "useState").mockImplementation(() => [true, jest.fn()]);

    render(
      <NavigationContainer>
        <Favorites />
      </NavigationContainer>
    );

    expect(screen.queryByText("Loading")).toBeTruthy();
  });

  it("should not display Loading when isLoading is false", () => {
    jest.spyOn(React, "useState").mockImplementation(() => [false, jest.fn()]);

    render(
      <NavigationContainer>
        <Favorites />
      </NavigationContainer>
    );

    expect(screen.queryByText("Favorites")).toBeTruthy();
    expect(screen.queryByText("Loading")).toBeNull();
  });
});
