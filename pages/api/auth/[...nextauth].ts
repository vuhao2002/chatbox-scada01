import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import Joi from "joi";
import connectToDB from "@/app/database";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    // ...add more providers here
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        await connectToDB();

        const user = await User.findOne({ email: credentials?.email });

        const { error } = schema.validate({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (error) {
          throw new Error(error.details[0].message);
        }

        if (!user || !user.password) {
          throw new Error("Account not found with this email");
        }

        const isCorrectPassword = await compare(
          credentials?.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password. Please try again !");
        }
        const token = jwt.sign(
          {
            id: user._id,
            email: user?.email,
            role: user?.role,
          },
          "default_secret_key",
          { expiresIn: "1d" }
        );
        return user;
      },
    }),
  ],
};
export default NextAuth(authOptions);
