import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin: boolean;
    }
    accessToken?: string;
  }
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
} 