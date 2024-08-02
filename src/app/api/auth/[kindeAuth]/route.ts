import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth({
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  issuer: process.env.KINDE_ISSUER_URL!,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
});
