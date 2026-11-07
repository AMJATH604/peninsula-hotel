import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET() {
  try {
    return NextResponse.json({ success: true, offers: db.offers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch offers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json(
        { success: false, error: "Promo code required" },
        { status: 400 }
      );
    }

    const offer = db.offers.find(
      (o) => o.promoCode.toUpperCase() === code.trim().toUpperCase() && o.isActive
    );

    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired promotional code" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      offer: {
        title: offer.title,
        discountValue: offer.discountValue,
        promoCode: offer.promoCode,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to validate offer" },
      { status: 500 }
    );
  }
}

