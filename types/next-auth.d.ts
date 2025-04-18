import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name?: string;
      role: string;

      password?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}
