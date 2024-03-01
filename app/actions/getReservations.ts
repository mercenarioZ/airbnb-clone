import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  hostId?: string;
  userId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, hostId, userId } = params;

    let query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (hostId) {
      query.listing = {
        userId: hostId,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,

      include: {
        listing: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
