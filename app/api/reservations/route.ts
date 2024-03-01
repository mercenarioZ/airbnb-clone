import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  console.log(body);

  // const { startDate, endDate, listingId, totalPrice } = body;

  if (!body) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: body.listingId,
    },

    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate: new Date(body.startDate),
          endDate: new Date(body.endDate),
          totalPrice: body.totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
