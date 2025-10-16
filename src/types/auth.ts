import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      status: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    status: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    status: string;
  }
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  organization?: string;
  position?: string;
  reason?: string;
}

export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  password: string;
  organization?: string;
  position?: string;
  reason?: string;
  role: "user" | "admin";
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
