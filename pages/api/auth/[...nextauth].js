import client from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import axios from "axios";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

let adminEmails = ["omsaunke343@gmail.com","salunkeom474@gmail.com","smartcoder0852@gmail.com"];

// console.log("run");
// adminFetcher();
export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // adapter: MongoDBAdapter(client),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      }
      return false;
    },
  },
};
export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (adminEmails.includes(session?.user?.email)) {
    return true;
  } else {
    res.status(401);
    res.end();
    throw new Error("Not a admin");
  }
}
