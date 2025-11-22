# AI Rules for LetterboxdMovies Application

This document outlines the core technologies and libraries used in the LetterboxdMovies application, along with guidelines for their appropriate use.

## Tech Stack Description

- **Next.js (v15.x):** The primary React framework for building server-rendered and statically generated web applications. It handles routing, API routes, and server-side logic.
- **React (v19.x):** The foundational JavaScript library for building user interfaces, used in conjunction with Next.js.
- **Tailwind CSS (v4.x):** A utility-first CSS framework for rapidly styling components directly in JSX, ensuring a consistent and responsive design.
- **MongoDB with Mongoose:** MongoDB serves as the NoSQL database for data storage, and Mongoose is the ODM (Object Data Modeling) library used for interacting with MongoDB from Node.js.
- **NextAuth.js (v4.x):** A complete open-source authentication solution for Next.js applications, handling user login, session management, and various authentication providers.
- **React Toastify (v11.x):** A library for displaying toast notifications to provide users with immediate feedback on actions and events.
- **Date-fns (v4.x):** A lightweight and modular JavaScript utility library for parsing, validating, manipulating, and formatting dates.
- **Lucide-react:** A collection of beautiful and customizable open-source icons, available for use throughout the application.
- **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS. These components are available for use and should be prioritized for UI elements.

## Library Usage Rules

- **Application Framework:** Always use **Next.js** for all page components, API routes, and server-side logic.
- **Styling:** All styling must be done using **Tailwind CSS** classes. Avoid inline styles or separate CSS files unless absolutely necessary for global styles.
- **UI Components:** Utilize **shadcn/ui** components where applicable for common UI elements (e.g., buttons, forms, cards). If a specific component is not available in shadcn/ui, create a new, small, and focused component using Tailwind CSS.
- **State Management:** For local component state, use React's built-in `useState` and `useContext` hooks. Avoid introducing external global state management libraries unless a clear and significant need arises.
- **Authentication:** All authentication-related functionality (login, logout, session management, user data access) must be handled via **NextAuth.js**.
- **Database Interactions:** Interact with the MongoDB database using **Mongoose** models defined in the `models` directory.
- **User Notifications:** Use **React Toastify** for all user feedback messages (success, error, info, warning).
- **Icons:** Use icons from the **lucide-react** library.
- **Date Handling:** For any date parsing, formatting, or manipulation, use **date-fns**.
- **Routing:** Use Next.js's built-in routing capabilities (`next/navigation` for client-side navigation, `Link` component for declarative navigation).
