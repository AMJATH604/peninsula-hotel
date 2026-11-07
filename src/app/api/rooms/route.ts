import { NextResponse } from "next/server";
import { getRooms, addRoom } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let rooms = getRooms();
    if (category && category !== "All") {
      rooms = rooms.filter((r) => r.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ success: true, rooms });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, price, size, bedType, maxOccupancy, floor, view, description } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { success: false, error: "Name, category, and price are required" },
        { status: 400 }
      );
    }

    const room = addRoom({
      name,
      category,
      price: Number(price),
      size: size || "45 sqm / 484 sq ft",
      bedType: bedType || "King",
      maxOccupancy: Number(maxOccupancy) || 2,
      floor: floor || "3rd Floor",
      view: view || "City View",
      description: description || "Experience world-class luxury and tailored comfort in this suite.",
      shortDescription: description ? description.slice(0, 80) + "..." : "Luxury room with breathtaking views and amenities.",
      images: ["/images/rooms/deluxe-1.jpg"],
      amenities: ["Free Wi-Fi", "Rain Shower", "Mini Bar", "Smart TV", "Room Service"],
      features: [view || "City View", "Marble Bathroom", "Complimentary Water"],
      isAvailable: true,
      isFeatured: false,
    });

    return NextResponse.json({ success: true, room });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create room" },
      { status: 500 }
    );
  }
}

