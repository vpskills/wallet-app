"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@repo/ui";
import { useAppDispatch } from "@repo/store";
import { login, logout } from "@repo/store";
import { useEffect } from "react";

export function LoginButton({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const isLoading = status === "loading";

  // Sync session data with Redux store
  useEffect(() => {
    if (session?.user) {
      dispatch(login({
        id: (session.user as any).id || "",
        name: session.user.name,   
        email: session.user.email,
        image: session.user.image,
      }));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : session ? "Logout" : "Login"}
    </Button>
  );
}
