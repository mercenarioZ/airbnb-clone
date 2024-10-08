import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar";
import RegisterModal from "./components/RegisterModal";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/RentModal";
import Client from "./components/Client";
import SearchModal from "./components/SearchModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Airbnb like clone built with Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Client>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </Client>

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
