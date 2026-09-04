# The Wild Oasis

> A hotel management dashboard for running a small cabin resort.

The Wild Oasis is a full-featured React single-page application for hotel staff.
It brings bookings, cabins, guests, check-ins, check-outs, account management,
hotel settings, and operational analytics into one focused workspace.

## At A Glance

| Area           | What it provides                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Dashboard      | Booking totals, sales, check-ins, occupancy, today's activity, and charts                           |
| Bookings       | Searchable booking table with filtering, sorting, pagination, details, deletion, and status actions |
| Cabins         | Create, edit, delete, filter, sort, and upload cabin images                                         |
| Check-in/out   | Confirm payment, add breakfast, check guests in, and check guests out                               |
| Authentication | Signup, login, logout, protected routes, profile updates, password changes, and avatars             |
| Settings       | Update hotel-wide configuration such as breakfast price and booking limits                          |
| Experience     | Responsive layout, dark mode, loading states, toasts, modals, empty states, and error recovery      |

## Technology Stack

### Frontend

- **React 18** and **JSX** for functional components, composition, props, hooks,
  and conditional rendering.
- **ReactDOM** for mounting the application and **React Strict Mode** for
  development checks.
- **Vite** for local development, hot module replacement, bundling, and
  production builds.
- **React Router DOM 6** for browser routing, nested routes, route parameters,
  redirects, navigation, and URL search parameters.
- **Styled-components** for component-scoped styling, dynamic styles, global
  styles, CSS variables, responsive layouts, and theme colors.

### Data, Backend, And State

- **Supabase JavaScript Client** connects the browser directly to Supabase.
- **Supabase Auth** handles email/password signup, login, logout, sessions, and
  user metadata.
- **Supabase Database** stores bookings, cabins, guests, and settings in
  PostgreSQL-backed tables.
- **Supabase Storage** stores cabin images in `cabin-images` and user avatars in
  `avatars`.
- **TanStack React Query v4** manages server state, caching, loading and error
  states, mutations, invalidation, refetching, and pagination prefetching.
- **React Context API** provides the dark-mode state throughout the application.
- **localStorage** persists the user's dark-mode preference.

### Forms, Feedback, And Visualization

- **React Hook Form** manages cabin, signup, password, and settings forms with
  validation and error messages.
- **Recharts** renders the sales area chart and booking-duration pie chart.
- **date-fns** parses, compares, formats, and calculates dates used by bookings
  and dashboard reports.
- **react-hot-toast** displays success and error notifications after mutations
  and authentication actions.
- **react-icons** supplies Heroicons for navigation, actions, status, and
  dashboard metrics.
- **react-error-boundary** provides a root-level fallback UI and recovery action
  for unexpected rendering errors.

### Tooling And Deployment

- **pnpm** manages dependencies and the lockfile.
- **ESLint** with React, React Hooks, React Refresh, and Create React App rules
  checks code quality.
- **vite-plugin-eslint** runs ESLint during the Vite development/build workflow.
- **Vercel** hosts the production single-page application.
- `vercel.json` rewrites all requests to `index.html`, allowing React Router to
  handle client-side routes.

## Architecture

The source code follows a feature-oriented structure. Pages compose feature
modules, feature hooks coordinate API operations, and the `ui` directory
contains reusable presentation primitives.

```text
src/
├── contexts/       Shared application context, including dark mode
├── data/           Seed data and the Supabase data uploader
├── features/       Domain modules: authentication, bookings, cabins,
│                   check-in/out, dashboard, and settings
├── hooks/          Reusable hooks such as click-outside and move-back
├── pages/          Route-level page components
├── services/       Supabase client and data-access functions
├── styles/         Global styles and design tokens
├── ui/             Reusable buttons, forms, tables, modals, menus, and states
└── utils/          Constants and date/currency helpers
```

### Application Composition

The root application in `src/App.jsx` composes the main providers in this order:

1. `DarkModeProvider` supplies theme state.
2. `QueryClientProvider` supplies TanStack Query.
3. `GlobalStyles` injects design tokens and global CSS.
4. `BrowserRouter` supplies navigation and route state.
5. `ErrorBoundary` surrounds the application entry point for recovery.

Pages are loaded with `React.lazy` and rendered through `Suspense`, producing
separate chunks for the main application views.

## Routes

| Route                 | Purpose                                   | Access    |
| --------------------- | ----------------------------------------- | --------- |
| `/login`              | Sign in to the staff dashboard            | Public    |
| `/dashboard`          | Operational overview and analytics        | Protected |
| `/bookings`           | Browse and manage bookings                | Protected |
| `/booking/:bookingId` | View one booking and perform actions      | Protected |
| `/checkin/:bookingId` | Confirm payment, breakfast, and check-in  | Protected |
| `/cabins`             | Manage cabin inventory and images         | Protected |
| `/users`              | Create a new staff user                   | Protected |
| `/settings`           | Update hotel settings                     | Protected |
| `/account`            | Update profile data, avatar, and password | Protected |
| `*`                   | Display the not-found page                | Public    |

`ProtectedRoute` loads the current Supabase user and redirects unauthenticated
visitors to `/login`.

## Data Flow

The application keeps the data-access boundary in `src/services`:

- `apiAuth.js` contains authentication and user-profile operations.
- `apiBookings.js` contains booking queries, joins, filtering, sorting,
  pagination, dashboard queries, and status updates.
- `apiCabins.js` contains cabin CRUD operations and image uploads.
- `apiSettings.js` contains hotel-settings queries and updates.
- `supabase.js` creates the shared Supabase client.

Feature hooks wrap these service functions in React Query queries and mutations.
Successful mutations invalidate or update the relevant cache, then the UI
displays a toast and updates navigation where appropriate.

Examples of Supabase capabilities used:

- Relational selects such as bookings with their cabins and guests.
- Exact counts for paginated booking lists.
- `eq`, `gte`, `lte`, and `or` filters.
- Ordered queries and range-based pagination.
- Insert, update, delete, and single-record queries.
- Public Storage URLs for cabin and avatar images.

## UI Patterns Worth Studying

- **Compound components:** `Modal`, `Table`, and `Menus` expose coordinated
  subcomponents.
- **React Context:** shared modal state and dark-mode state.
- **React portals:** modal windows render into `document.body`.
- **Render props:** table bodies receive data and a row-rendering function.
- **Reusable styled primitives:** buttons, rows, headings, forms, tags, filters,
  and inputs share consistent design rules.
- **URL state:** booking and cabin filtering, sorting, and pagination are
  represented by search parameters.
- **Async UX:** spinners, disabled controls, optimistic-feeling navigation,
  toasts, empty states, and error fallbacks make remote operations visible.

## Learning Objectives

Completing this project provided practice with:

1. Building a complete React dashboard from reusable functional components.
2. Organizing a scalable feature-based React project.
3. Designing component APIs with composition and compound components.
4. Managing server state with TanStack React Query.
5. Implementing authentication and protected routes with Supabase.
6. Performing CRUD operations against a Supabase database.
7. Querying relational data and handling database loading and error states.
8. Implementing filtering, sorting, pagination, and query prefetching.
9. Building validated forms with React Hook Form.
10. Uploading and displaying files with Supabase Storage.
11. Managing global UI state with Context and persistent preferences with
    localStorage.
12. Creating a light/dark theme with CSS variables.
13. Building operational charts with Recharts.
14. Formatting dates, relative time, and currency for a business interface.
15. Handling modals, portals, click-outside behavior, and confirmation flows.
16. Adding route-level code splitting with `React.lazy` and `Suspense`.
17. Handling unexpected UI failures with error boundaries.
18. Preparing and deploying a client-side routed application on Vercel.

## Getting Started

### Requirements

- Node.js
- pnpm
- A Supabase project with the expected tables and Storage buckets

### Install And Run

```bash
pnpm install
pnpm dev
```

Vite will print the local development URL in the terminal.

### Available Scripts

```bash
pnpm dev       # Start the Vite development server
pnpm build     # Create the production bundle
pnpm preview   # Preview the production bundle locally
pnpm lint      # Run ESLint with zero-warning enforcement
```

### Data Seeding

The `Uploader` component in `src/data/Uploader.jsx` can reset and upload the
sample guests, cabins, and bookings to Supabase. Bookings are uploaded after
guests and cabins so their generated database IDs can be linked correctly.

## Project Status

The production build currently completes successfully with `pnpm build`.

`pnpm lint` currently reports existing cleanup items: unused ESLint disable
directives in `BookingRow.jsx`, `Button.jsx`, and `MainNav.jsx`, plus an unused
`bookingId` parameter in `CheckoutButton.jsx`. These do not prevent the Vite
production build, but they should be addressed before treating lint as clean.

## Notes

- This is a JavaScript project, not a TypeScript project.
- The application uses Supabase directly from the frontend rather than a
  separate custom API server.
- React Query Devtools is installed but currently commented out in
  `src/App.jsx`.
- No automated unit, integration, or end-to-end test suite is currently
  configured.

---
