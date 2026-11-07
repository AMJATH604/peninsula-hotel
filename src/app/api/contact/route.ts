import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = addInquiry({
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
      type: type || "general",
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to Peninsula Chennai. Our concierge will be in touch shortly.",
      inquiry,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

