import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      //@ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const payload = { email, password };
        const response = await axios.post(
          `${process.env.BACKEND_URL || "http://localhost:5000"}` +
            "/api/auth/login",
          payload
        );

        if (response?.status === 200) {
          if (!response?.data?.error) {
            const user = response?.data?.user;
            const token = response?.data?.token;
            return { user, token };
          } else {
            throw new Error(response?.data?.error);
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        //@ts-ignore
        token.name = user.user.name;
        //@ts-ignore
        token.email = user.user.email;
        //@ts-ignore
        token.accessToken = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      //@ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
