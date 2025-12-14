import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

// Algorithm to register rhe user 

// 1. Get data from fronted
// 2. Validation
// 3. existing user check
// 4. Create new user in DB
// 5. return success response 


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exist" },
                { status: 400 }
            );
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "User successfully created" },
            { status: 400 }
        );

    } catch (error) {
        console.error("Registration error", error)
        return NextResponse.json(
            { message: "failed to create user" },
            { status: 400 }
        );
    }
}