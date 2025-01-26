import { Input, Button, Text } from "../../ui";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import "./SignUp.css";

export function SignUp() {
  return (
    <div className="signup-page-container">
      <Text as="h1" size="5xl" className="signup-page-title">
        Sign Up
      </Text>

      <form
        className="signup-page-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const entries = Object.fromEntries(formData);
          console.log(entries);
        }}
      >
        <Input
          label="Username"
          name="username"
          placeholder="Enter username"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <Button type="submit" fullWidth>
          Log In
        </Button>
        <Link to={ROUTES.LOGIN} className="signup-page-link">
          Have an account? Log In
        </Link>
      </form>
    </div>
  );
}
