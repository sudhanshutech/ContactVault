"use client";

import { Button } from "@nextui-org/button";
import { Card, Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const token = response.data.accesToken;

      localStorage.setItem("token", token);
      console.log("Login successful:", response.data);
      // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ maxWidth: "400px", padding: "20px" }}>
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <Spacer y={1} />
        <Input
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacer y={1.5} />
        <Input
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacer y={1.5} />
        <Button color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
