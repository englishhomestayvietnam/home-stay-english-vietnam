import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { ac, superUser, superAdmin, user, admin as adminRole } from "./permission";
import { admin } from "better-auth/plugins/admin";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user : {
    additionalFields : {
      role :  {
        type : "string",
        required : false,
        defaultValue : "user",
        input : false,
      }
    }
  },
  account: {
    skipStateCookieCheck: true,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://home-stay-english-vietnam.vercel.app",
    "https://www.englishhomestayvietnam.com",
    "https://englishhomestayvietnam.com",
  ],
  plugins: [
    admin({
      ac,
      roles: {
        user,
        superUser,
        superAdmin,
        admin: adminRole
      }
    }),
    nextCookies()
  ]
});
