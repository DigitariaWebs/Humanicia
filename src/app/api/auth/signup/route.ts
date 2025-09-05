import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, signToken } from '@/lib/auth';
import {
  validateEmail,
  validatePasswordStrength,
  sanitizeInput,
  auditLogger,
  checkRateLimit,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limiting
    if (!checkRateLimit(`auth_signup_${clientIP}`, 3, 15 * 60 * 1000)) {
      auditLogger.log({
        action: 'RATE_LIMIT_EXCEEDED',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || '',
        details: { endpoint: 'signup' }
      });
      return NextResponse.json(
        { error: 'Too many signup attempts, please try again later.' },
        { status: 429 }
      );
    }

    await dbConnect();

    const { name, email, password } = await request.json();

    // Validate and sanitize input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(sanitizedPassword);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          error: `Password requirements not met: ${passwordValidation.errors.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      auditLogger.log({
        action: "SIGNUP_FAILED",
        ip: clientIP,
        userAgent: request.headers.get("user-agent") || "",
        details: { email: sanitizedEmail, reason: "user_already_exists" },
      });
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(sanitizedPassword);

    // Create user
    const user = await User.create({
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    // Create JWT token
    const token = signToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    auditLogger.log({
      action: "SIGNUP_SUCCESS",
      userId: user._id.toString(),
      ip: clientIP,
      userAgent: request.headers.get("user-agent") || "",
      details: { email: sanitizedEmail, name: sanitizedName },
    });

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
