import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCollection } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre gereklidir" },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const users = await getCollection("users");
    const existingAdmin = await users.findOne({ role: "admin" });
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin kullanıcısı zaten mevcut" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const adminData = {
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
      status: "approved",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await users.insertOne(adminData);

    return NextResponse.json(
      { 
        message: "Admin kullanıcısı oluşturuldu",
        adminId: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
