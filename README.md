# ShopVibe 🛍️

A modern, responsive e-commerce storefront built with React and Tailwind CSS. Browse curated products, manage your cart, and enjoy a seamless shopping experience — all powered by a clean, component-driven architecture.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Product Catalog** — Browse 12+ products across 5 categories (Clothing, Footwear, Accessories, Bags, Electronics) with ratings, reviews, and detailed descriptions.
- **Shopping Cart** — Add, remove, and update item quantities with a real-time cart counter in the navbar.
- **User Authentication** — Sign up, log in, and manage your account with session persistence via localStorage.
- **Protected Routes** — Checkout and account pages require authentication, with automatic redirect to login.
- **Responsive Design** — Fully responsive layout with a mobile hamburger menu and adaptive grid layouts.
- **Modern UI** — Gradient hero section, hover animations, micro-interactions, and a polished design system.

## Tech Stack

| Layer         | Technology                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | [React 19](https://react.dev/)                                |
| Build Tool    | [Vite 7](https://vite.dev/)                                   |
| Styling       | [Tailwind CSS 4](https://tailwindcss.com/)                    |
| Routing       | [React Router DOM 7](https://reactrouter.com/)                |
| Linting       | [ESLint 9](https://eslint.org/)                               |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ecom.git
cd ecom

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CartItem.jsx     # Individual cart item row
│   ├── Features.jsx     # Feature highlights section
│   ├── Footer.jsx       # Site footer
│   ├── HeroSection.jsx  # Landing page hero banner
│   ├── Navbar.jsx       # Navigation bar with cart & auth
│   ├── Newsletter.jsx   # Email newsletter signup
│   ├── ProductCard.jsx  # Product display card
│   └── ProtectedRoute.jsx  # Auth-gated route wrapper
├── context/             # React Context providers
│   ├── AuthContext.jsx   # Authentication state & actions
│   └── CartContext.jsx   # Shopping cart state & actions
├── data/
│   └── products.js      # Product catalog data
├── pages/               # Route-level page components
│   ├── Account.jsx      # User account dashboard
│   ├── Cart.jsx         # Shopping cart page
│   ├── Checkout.jsx     # Checkout flow
│   ├── Home.jsx         # Landing page
│   ├── Login.jsx        # Login form
│   ├── ProductDetail.jsx # Single product view
│   ├── Products.jsx     # Product listing & filtering
│   └── Signup.jsx       # Registration form
├── App.jsx              # Root component with routing
├── index.css            # Global styles & Tailwind theme
└── main.jsx             # Application entry point
```

## Pages & Routes

| Route              | Page           | Auth Required |
| ------------------ | -------------- | :-----------: |
| `/`                | Home           |      No       |
| `/products`        | Product Listing|      No       |
| `/products/:id`    | Product Detail |      No       |
| `/cart`            | Shopping Cart  |      No       |
| `/checkout`        | Checkout       |      Yes      |
| `/account`         | My Account     |      Yes      |
| `/login`           | Sign In        |      No       |
| `/signup`          | Create Account |      No       |

## License

This project is for educational and demonstration purposes.
