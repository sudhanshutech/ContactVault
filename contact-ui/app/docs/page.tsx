

'use client';

import { Input, Button, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function DocsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    const contact = { name, email, phone };
    const response = await axios.post("http://localhost:5000/api/contacts", contact, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 201) {
      alert("Contact added successfully!");
      setName("");
      setEmail("");
      setPhone("");
    } else {
      alert("Failed to add contact.");
    }
  };

  return (
    <div>
      <h1 className="title">Contacts</h1>
      <div className="mt-4">
        <p>
          This is the contacts page. Here you can add, update, and delete
          contacts.
        </p>

        <h2>Adding a Contact</h2>
        <div className="mt-4">
          <Input
            fullWidth
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Spacer y={1} />
          <Button onClick={handleSubmit} className="mt-4">
            Add Contact
          </Button>
        </div>
      </div>
    </div>
  );
}