import { NextResponse } from 'next/server';

export async function POST() {
  // For JWT, logout is handled on the client side by removing the token
  // In a production app, you might want to implement token blacklisting
  return NextResponse.json({ message: 'Logged out successfully' });
}
