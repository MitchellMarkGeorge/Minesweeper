import { Input, Button, Text } from "../../ui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import "./SignUp.css";
import { useAuth } from "../../hooks/useAuth";

export function SignUp() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="signup-page-container">
      <Text as="h1" size="5xl" className="signup-page-title">
        Sign Up
      </Text>

      <form
        className="signup-page-form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const entries = Object.fromEntries(formData) as {
            username: string;
            password: string;
          };
          setIsLoading(true);
          await signUp(entries.username, entries.password);
          setIsLoading(false);
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
        <Button type="submit" fullWidth loading={isLoading}>
          Sign Up
        </Button>
        <Link to={ROUTES.LOGIN} className="signup-page-link">
          Have an account? Log In
        </Link>
      </form>
    </div>
  );
}
