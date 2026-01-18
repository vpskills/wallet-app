"use client";

import { useAppDispatch, useAppSelector, login } from "@repo/store";
import { Button } from "@repo/ui";

export function LoginButton({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((s) => s.auth);

  return (
    <Button
      className={className}
      onClick={() => dispatch(login("user-123"))}
    >
      { authData.isAuthenticated ? "Logged In" : "Login"}
    </Button>
  );
}
