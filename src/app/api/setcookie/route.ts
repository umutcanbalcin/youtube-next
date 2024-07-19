import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const uniqueToken = uuidv4(); // Generate a unique token (temporary identity)

  // Set the cookie with an expiration date (10 years from now)
  const maxAge = 10 * 365 * 24 * 60 * 60; // 10 years in seconds
  const response = NextResponse.json({ temporaryIdentity: uniqueToken });
  response.headers.set('Set-Cookie', `temporaryIdentity=${uniqueToken}; Max-Age=${maxAge}; Path=/; SameSite=Lax`);

  return response;
}
