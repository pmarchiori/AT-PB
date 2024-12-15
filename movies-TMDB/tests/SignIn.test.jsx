import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignIn from "../screens/SignIn";
import { supabase } from "../services/supabase";
import { Alert } from "react-native";

jest.mock("../services/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
    },
  },
}));

jest.mock("react-native", () => ({
  ...jest.requireActual("react-native"),
  Alert: { alert: jest.fn() },
}));

describe("SignIn Screen", () => {
  it("renders SignIn screen correctly", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    expect(getByPlaceholderText("E-mail")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();

    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
  });

  it("should call signInWithEmail with valid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    supabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(Alert.alert).not.toHaveBeenCalled();
    });
  });

  it("should display an error message when login fails", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    const errorMessage = "Invalid credentials";
    supabase.auth.signInWithPassword.mockResolvedValue({
      error: { message: errorMessage },
    });

    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("should validate fields before signing in", () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);

    const signInButton = getByText("Sign In");

    fireEvent.press(signInButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Please, fill all the fields."
    );
  });

  it("should call signUpWithEmail with valid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");
    const signUpButton = getByText("Sign Up");

    fireEvent.changeText(emailInput, "newuser@example.com");
    fireEvent.changeText(passwordInput, "newpassword");

    supabase.auth.signUp.mockResolvedValue({
      data: { session: {} },
      error: null,
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "newuser@example.com",
        password: "newpassword",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Sign up successfull!");
    });
  });

  it("should display error message on sign up failure", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailInput = getByPlaceholderText("E-mail");
    const passwordInput = getByPlaceholderText("Password");
    const signUpButton = getByText("Sign Up");

    fireEvent.changeText(emailInput, "newuser@example.com");
    fireEvent.changeText(passwordInput, "newpassword");

    const errorMessage = "Error signing up";
    supabase.auth.signUp.mockResolvedValue({
      data: { session: null },
      error: { message: errorMessage },
    });

    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(errorMessage);
    });
  });
});
