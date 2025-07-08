
# Shopping Cart App

A modern, user-friendly shopping cart web application built with Next.js (App Router), TypeScript, Tailwind CSS, Zustand (with localStorage persistence), and the Fake Store API.

## Features

- **Product Listing**: Paginated, searchable product list with skeleton loaders for smooth UX.
- **Product Details**: Detailed view for each product, with add-to-cart functionality.
- **Shopping Cart**: View, update, and remove items; quantity controls; total calculation; persistent cart state.
- **Responsive Design**: Fully responsive and mobile-friendly layout.
- **Accessibility**: ARIA labels, keyboard navigation, and accessible feedback.
- **Interactive Feedback**: Toast notifications for cart actions and errors.
- **Error Handling**: User-friendly error messages for API failures.
- **State Management**: Zustand store for cart, persisted in localStorage.
- **Testing**: Comprehensive unit and component tests for store logic, API service, and UI components using Vitest and Testing Library.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS, custom CSS variables
- **State**: Zustand (with localStorage persistence)
- **API**: Fake Store API (https://fakestoreapi.com/)
- **UI/UX**: react-hot-toast, react-loading-skeleton, lucide-react
- **Testing**: Vitest, @testing-library/react, @testing-library/jest-dom

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Run tests:**
   ```sh
   npm run test
   # or
   npx vitest run
   ```

## Project Structure

- `src/components/` — UI components (ProductList, ProductCard, ProductDetail, Header, etc.)
- `src/store/` — Zustand cart store
- `src/services/` — API service for product fetching
- `src/types/` — TypeScript type definitions
- `src/app/` — Next.js App Router pages and global styles

## Architectural Decisions

- **Local Pagination**: All products are fetched once; pagination is handled client-side for simplicity and performance with small/medium datasets.
- **Zustand Store**: Used for cart state, with localStorage for persistence across sessions.
- **Skeleton Loaders**: Used for product cards to improve perceived performance.
- **Accessibility**: All interactive elements have ARIA labels and keyboard support.
- **Testing**: Store logic, API, and UI are covered by unit and component tests.

## Notes & Recommendations

- For very large product datasets, consider server-side or API-based pagination and/or virtualization (e.g., react-window).
