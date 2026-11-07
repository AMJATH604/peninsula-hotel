import { NextResponse } from "next/server";
import { getBookings, createBooking, updateBookingStatus } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let bookings = getBookings();

    if (status && status !== "all") {
      bookings = bookings.filter((b) => b.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.guestName.toLowerCase().includes(q) ||
          b.bookingId.toLowerCase().includes(q) ||
          b.roomName.toLowerCase().includes(q) ||
          b.guestEmail.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      guestName,
      guestEmail,
      guestPhone,
      roomId,
      checkIn,
      checkOut,
      adults,
      children,
      specialRequests,
      promoCode,
    } = body;

    if (!guestName || !guestEmail || !guestPhone || !roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { success: false, error: "Missing required reservation details" },
        { status: 400 }
      );
    }

    const booking = createBooking({
      guestName,
      guestEmail,
      guestPhone,
      roomId,
      checkIn,
      checkOut,
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      specialRequests,
      promoCode,
    });

    return NextResponse.json({
      success: true,
      message: "Reservation confirmed successfully",
      booking,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing booking ID or status" },
        { status: 400 }
      );
    }

    const updated = updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update booking" },
      { status: 500 }
    );
  }
}

