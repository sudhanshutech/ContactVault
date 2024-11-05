"use client";

export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Input, Button, Spacer, Card } from "@nextui-org/react";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
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
        <h1 style={{ textAlign: "center", marginBottom: "5px" }}>Register</h1>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Spacer y={1} />
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Spacer y={1} />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacer y={1} />
        <Button onClick={handleRegister}>Register</Button>
      </Card>
    </div>
  );
};

export default RegisterPage;
