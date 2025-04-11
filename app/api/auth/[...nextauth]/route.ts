import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const jwtSecret = process.env.JWT_SECRET!;
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide all required fields");
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.password) {
            throw new Error("No user found with this email");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }
          if (!user?.isVerified) {
            throw new Error("User need verification");
          }
          const accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            jwtSecret,
            { expiresIn: "72h" }
          );

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            accessToken,
          };
        } catch (error: any) {
          console.log("Error: ", error);
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token;
      session.accessToken = token.accessToken;
      session.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
