import { prismaClient } from "@repo/db";
import { LoginButton } from "./components/LoginButton";
import { Appbar } from "./components/Appbar";

export default async function Home() {
  const user = await prismaClient.user.findFirst() 
  return (
    <div>
      {/* {user?.name ?? "No user added yet"}
      <LoginButton className="bg-blue-600 hover:bg-blue-700" /> */}
      <Appbar/>
    </div>
  );
} 