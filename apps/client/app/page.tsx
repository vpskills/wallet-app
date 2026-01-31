"use client";

import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setAllUsers(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Wallet App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allUsers.map((user: any) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
