import { handleAuth, HandlerError } from '@auth0/nextjs-auth0';
import { NextResponse, NextRequest } from 'next/server';

export const GET = handleAuth({
  async onError(req: NextRequest, error: HandlerError) {
    // Redirect to the login page
    const loginUrl = new URL('/login', req.url);
    // @TODO: I should pass the error here somehow to let them know that they are unauthorized
    return NextResponse.redirect(loginUrl);
  },
});
