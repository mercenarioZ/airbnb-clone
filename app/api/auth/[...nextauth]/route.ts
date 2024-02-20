import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // if user does not type in email or password
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // if user is not found or password is incorrect
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCredentialsValid = await bcrypt.compare(
          credentials?.password,
          user?.hashedPassword
        );

        if (!isCredentialsValid) throw new Error("Invalid credentials 2");

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/",
  },

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
