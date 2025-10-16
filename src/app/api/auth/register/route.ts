import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongodb";
import { UserRegistration } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body: UserRegistration = await request.json();
    const { name, email, password, organization, position, reason } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Ad, email ve şifre gereklidir" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const users = await getCollection("users");
    const existingUser = await users.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      organization: organization || "",
      position: position || "",
      reason: reason || "",
      role: "user",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(userData);

    return NextResponse.json(
      { 
        message: "Üyelik başvurunuz alındı. Onay bekleniyor.",
        userId: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // Handle duplicate key error (unique email)
    if (typeof error === "object" && error !== null && (error as any).code === 11000) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 400 }
      );
    }
    console.error("Registration error:", message);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
