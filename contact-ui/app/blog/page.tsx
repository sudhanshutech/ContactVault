'use client';

import { title } from "@/components/primitives";
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogPage() {

  const [contacts, setContacts] = useState<{ id: number; name: String; email: String; phone: String; }[]>([]);

  function getAllContacts() {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllContacts();
  } , []);

  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <div className="mt-4">
        <p>
          This is the blog page. Here you can see all contacts.
        </p>
        <Table>
          <TableHeader>

              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
    </div>
  );
}

