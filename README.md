🚗 RentalCar --- Car Rental Application

RentalCar is a modern web application for browsing and booking
rental cars. The project is built with Next.js, React, Zustand,
TypeScript, custom UI components, and integration with the \*\*GoIT Car
Rental API.

Users can explore a catalog of vehicles, apply filters, view detailed
information, add cars to favorites, and submit booking requests through
an interactive form.

✨ Features

🔎 Car Catalog

- Fetching cars from a remote API
- Pagination with Load More
- Persisted state using Zustand (filters, pages, favorites)
- Loading and error handling

🧭 Advanced Filters

- Filter by brand
- Filter by price
- Filter by mileage (from/to)
- Custom dropdowns
- Placeholder color customization

📄 Car Details Page

- High‑resolution car photo
- Full specifications
- Favorite toggle button with animation

📅 Booking Form

- Validation
- Date picker calendar
- Toast notifications for success and errors
- Form data persistence after reload
- Optional auto‑reset on success

❤️ Favorites

- Add/remove favorites
- Local storage persistence via Zustand
- Dynamic heart icon state

🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Zustand (persist)
- CSS Modules
- React Hot Toast
- SVG sprite
- REST API

📦 Installation

```bash
git clone https://github.com/Oleksii-TS/rentalcar-frontend-app.git
cd rentalcar-app
npm install
```

Create `.env.local`:

    NEXT_PUBLIC_API_URL=

Run:

    npm run dev

Build:

    npm run build
    npm start

📚 Usage

- Open http://localhost:3000
- Apply filters
- Browse cars
- View car details
- Submit booking
- Add to favorites

🧑‍💻 Author

Oleksii --- Full‑Stack Developer (in training)
