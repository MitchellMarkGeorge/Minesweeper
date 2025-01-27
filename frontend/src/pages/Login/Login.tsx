import { Link } from "react-router-dom";
import { Input, Text, Button } from "../../ui";
import "./Login.css";
import { ROUTES } from "../../routes/routes";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  return (
    <div className="login-page-container">
      <Text as="h1" size="5xl" className="login-page-title">
        Log In
      </Text>

      <form
        className="login-page-form"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const entries = Object.fromEntries(formData) as {
            username: string;
            password: string;
          };
          setIsLoading(true);
          await login(entries.username, entries.password);
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
          Log In
        </Button>
        <Link to={ROUTES.SIGN_UP} className="login-page-link">
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
}
