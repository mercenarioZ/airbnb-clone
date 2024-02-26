import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const {
    title,
    description,
    category,
    price,
    location,
    imageSrc,
    roomCount,
    bathroomCount,
    guestCount,
  } = body;

  Object.keys(body).forEach((key) => {
    if (!body[key]) {
      return new Response("Bad Request", { status: 400 });
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      price: parseInt(price, 10),
      locationValue: location.value,
      imageSrc,
      roomCount,
      guestCount,
      bathroomCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
