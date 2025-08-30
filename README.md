# Airbnb Clone

> A full-stack Airbnb-like web application built with Next.js 14, React, TypeScript, Tailwind CSS, Prisma, MongoDB, NextAuth, and more. Users can list, search, book, and manage properties, with authentication and a modern UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Functionality Overview](#functionality-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (email/password & Google OAuth via NextAuth)
- List your property for rent (multi-step modal)
- Search/filter listings by location, category, date, guests, rooms, and more
- View property details, images, map location, and amenities
- Book reservations for available dates
- Manage your trips, reservations, and properties
- Add/remove listings to favorites
- Responsive, mobile-friendly UI
- Toast notifications for actions
- Secure API routes and protected pages

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** MongoDB
- **Authentication:** NextAuth (Credentials & Google)
- **Image Upload:** Cloudinary
- **Maps:** React Leaflet, OpenStreetMap
- **State Management:** Zustand, React Hook Form
- **Other:** Axios, React Hot Toast, React Date Range, React Select, React Icons

## Screenshots

> _Add screenshots here if available_

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mercenarioZ/airbnb-clone.git
cd airbnb-clone
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 4. Run Prisma migrations (optional for MongoDB)

```bash
npx prisma generate
# npx prisma db push (for schema sync)
```

### 5. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `dev` - Start the development server
- `build` - Build for production
- `start` - Start the production server
- `lint` - Run ESLint

---

## Folder Structure

```
airbnb-clone/
├── app/
│   ├── actions/         # Server actions (data fetching, business logic)
│   ├── api/             # API routes (Next.js API handlers)
│   ├── components/      # Reusable React components
│   ├── favorites/       # Favorites page
│   ├── hooks/           # Custom React hooks (modals, state, etc.)
│   ├── libs/            # Library files (e.g., Prisma client)
│   ├── listings/        # Listing details pages
│   ├── properties/      # User's properties management
│   ├── providers/       # Context providers (e.g., Toaster)
│   ├── reservations/    # Reservations management
│   ├── trips/           # User's trips
│   ├── types/           # TypeScript types
│   ├── page.tsx         # Home page (listings grid)
│   ├── layout.tsx       # Root layout
│   └── ...
├── prisma/
│   └── schema.prisma    # Prisma schema (MongoDB models)
├── public/
│   └── images/          # Static images (placeholder, etc.)
├── styles/              # Global styles (if any)
├── package.json         # Project metadata and scripts
├── tailwind.config.ts   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
├── tsconfig.json        # TypeScript config
└── ...
```

---

## Functionality Overview

### Authentication

- Email/password and Google OAuth via NextAuth
- Secure protected routes (middleware)

### Listings

- Create, view, search, and filter property listings
- Multi-step modal for listing a property (category, location, info, images, description, price)
- View listing details, images, amenities, and map

### Reservations

- Book available listings for specific dates
- View and manage your trips (reservations made)
- View and manage reservations on your properties (as host)

### Favorites

- Add/remove listings to your favorites
- View your favorite listings

### Properties

- Manage your own listed properties (edit, delete)

### Search & Filters

- Filter by location, category, date, guests, rooms, bathrooms
- Interactive search modal

### UI/UX

- Responsive design following Airbnb's style
- Toast notifications

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
