// app/api/users/route.ts
import { prismaClient } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prismaClient.user.findMany();
  return NextResponse.json(users);
}
