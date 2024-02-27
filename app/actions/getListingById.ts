import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },

      include: {
        // why include user? Because we want to display the user's name and image on the listing page
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error) {
    console.error("Error fetching listing by id: ", error);
    return null;
  }
}
