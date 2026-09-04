# The Wild Oasis: Project Documentation

## 1. Project Overview

The Wild Oasis is a hotel and cabin management dashboard built with React. It is
designed for hotel staff to manage the daily operations of a small cabin resort.

The application provides:

- Dashboard statistics and charts
- Booking management
- Booking details
- Check-ins and check-outs
- Cabin management
- Cabin image uploads
- Guest information
- Hotel settings
- User authentication
- User account management
- Light and dark themes
- Loading, empty, success, and error states

This is a client-side React single-page application. It communicates directly
with Supabase and does not contain a separate Express, Node.js, or custom
backend server.

## 2. Technology Inventory

### 2.1 JavaScript And Modules

The project uses modern JavaScript with JSX and ES modules.

Important characteristics:

- JavaScript is the primary programming language.
- JSX describes React UI components.
- `import` and `export` are used throughout the project.
- The project uses ES modules through `"type": "module"` in `package.json`.
- The project is JavaScript-based rather than TypeScript-based.

### 2.2 React 18

React is the main frontend framework.

The project uses:

- Functional components
- Props
- JSX
- React hooks
- Component composition
- Conditional rendering
- Controlled inputs
- Custom hooks
- Context API
- `React.lazy`
- `Suspense`
- `StrictMode`
- React portals
- Error boundaries

The React application is mounted in `src/main.jsx` using `ReactDOM.createRoot`.

### 2.3 ReactDOM

ReactDOM connects the React component tree to the HTML document.

The application uses:

```js
ReactDOM.createRoot(document.getElementById('root')).render(...)
```

ReactDOM is also used indirectly through `createPortal` for modal dialogs.

### 2.4 Vite

Vite is the development server and build tool.

It provides:

- Fast local development
- Hot module replacement
- JSX transformation through the React plugin
- Production bundling
- Code splitting
- Build-time integration with ESLint

Configuration is stored in `vite.config.js`.

The project uses:

- `vite`
- `@vitejs/plugin-react`
- `vite-plugin-eslint`

### 2.5 React Router DOM 6

React Router provides browser-based client-side routing.

Used APIs include:

- `BrowserRouter`
- `Routes`
- `Route`
- `Navigate`
- `Outlet`
- `useNavigate`
- `useParams`
- `useSearchParams`

The application uses nested routes. Protected pages are rendered inside
`AppLayout`, while the login page is outside the main dashboard layout.

Routes include:

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

`ProtectedRoute.jsx` checks the current user and redirects unauthenticated users
to `/login`.

### 2.6 Styled-components

Styled-components is the main styling solution.

It is used for:

- Component-scoped CSS
- Dynamic styles based on props
- Global styles
- CSS variables
- Responsive rules
- CSS Grid layouts
- Flexbox layouts
- Animations
- Theme-dependent colors

Examples of dynamic styling include status tags, dashboard colors, paid/unpaid
booking displays, and light/dark theme values.

Global design tokens are defined in `src/styles/GlobalStyles.js`.

The design system includes:

- Brand colors
- Grey scale colors
- Status colors
- Shadows
- Border radii
- Layout widths
- Dark-mode values
- Image opacity and grayscale settings

## 3. Backend And Data Technologies

### 3.1 Supabase

Supabase is the backend platform used by the application. The browser
communicates directly with Supabase through `@supabase/supabase-js`.

Supabase provides:

- PostgreSQL database access
- Authentication
- Storage buckets
- Relational queries
- REST-like database operations
- Row-level security support

The shared Supabase client is created in `src/services/supabase.js`.

### 3.2 Supabase Database

The application works with these tables:

- `bookings`
- `cabins`
- `guests`
- `settings`

The project uses database operations including:

- Selecting records
- Selecting related records
- Filtering with `eq`, `gte`, `lte`, and `or`
- Sorting with `order`
- Pagination with `range`
- Exact counts with `{ count: 'exact' }`
- Inserting records
- Updating records
- Deleting records
- Fetching a single record with `single()`

Example relational query:

```js
supabase.from('bookings').select('*, cabins(name), guests(fullName,email)');
```

Service modules:

- `src/services/apiAuth.js`
- `src/services/apiBookings.js`
- `src/services/apiCabins.js`
- `src/services/apiSettings.js`
- `src/services/supabase.js`

### 3.3 Supabase Authentication

Supabase Auth manages user identity and login state.

Implemented capabilities:

- Email/password signup
- Email/password login
- Logout
- Session lookup
- Current-user lookup
- Password updates
- Profile metadata updates
- Avatar metadata updates
- Protected application routes

Supabase Auth methods used include:

- `supabase.auth.signUp`
- `supabase.auth.signInWithPassword`
- `supabase.auth.signOut`
- `supabase.auth.getSession`
- `supabase.auth.getUser`
- `supabase.auth.updateUser`

Authentication behavior is wrapped in custom hooks:

- `useLogin`
- `useSignup`
- `useLogout`
- `useUser`
- `useUpdateUser`

### 3.4 Supabase Storage

Supabase Storage handles image uploads.

Storage buckets used by the application:

- `cabin-images` for cabin images
- `avatars` for user avatar images

The application supports both:

- Existing image URLs when editing a cabin or user
- New browser `File` objects during uploads

Cabin image upload logic is implemented in `apiCabins.js`. Avatar upload logic
is implemented in `apiAuth.js`.

### 3.5 TanStack React Query v4

TanStack React Query manages server state and asynchronous data operations.

It is used for:

- Remote data fetching
- Query caching
- Loading states
- Error states
- Mutations
- Query invalidation
- Query refetching
- Updating cached data
- Pagination prefetching

The global `QueryClient` is configured in `src/App.jsx`.

Query examples include:

- `['user']`
- `['cabins']`
- `['bookings', filter, sortBy, page]`
- `['booking', bookingId]`
- `['today-activity']`
- `['settings']`

Mutation examples include:

- Login
- Signup
- Logout
- Create cabin
- Edit cabin
- Delete cabin
- Check in booking
- Check out booking
- Delete booking
- Update user data
- Update settings

After successful mutations, the application updates or invalidates the relevant
query cache so the UI reflects the latest backend data.

The project also has `@tanstack/react-query-devtools` installed. Its component
is currently commented out in `App.jsx`.

## 4. Forms And Validation

### 4.1 React Hook Form

React Hook Form manages the more complex forms in the application.

It is used for:

- Signup
- Password updates
- Cabin creation
- Cabin editing
- Hotel settings updates

React Hook Form features demonstrated:

- `useForm`
- `register`
- `handleSubmit`
- `reset`
- `getValues`
- Required-field validation
- Minimum-value validation
- Minimum-length validation
- Pattern validation
- Custom validation functions
- Error messages
- Form submission states

Relevant files include:

- `src/features/authentication/SignupForm.jsx`
- `src/features/authentication/UpdatePasswordForm.jsx`
- `src/features/cabins/CreateCabinForm.jsx`
- `src/features/settings/UpdateSettingsForm.jsx`

The login form demonstrates an alternative approach using controlled inputs with
React `useState`.

### 4.2 Native Form APIs

The project also uses native browser form capabilities:

- `onSubmit`
- `onReset`
- `input` elements
- File inputs
- `FormData`-style file handling through browser `File` objects
- HTML input types such as `email`, `password`, `number`, and `file`
- `autoComplete` attributes for password-manager support

## 5. Dashboard And Visualization

### 5.1 Recharts

Recharts provides the dashboard visualizations.

Charts include:

- Sales area chart
- Booking-duration pie chart
- Responsive chart containers
- Tooltips
- Legends
- Cartesian grids
- X and Y axes
- Light-mode and dark-mode colors

Relevant files:

- `src/features/dashboard/SalesChart.jsx`
- `src/features/dashboard/DurationChart.jsx`

### 5.2 Dashboard Calculations

The dashboard calculates:

- Number of bookings
- Total sales
- Number of check-ins
- Occupancy rate
- Sales per day
- Extra breakfast sales
- Distribution of stays by duration
- Today's check-in and check-out activity

The sales chart builds a date interval and aggregates bookings by their
`created_at` date.

The duration chart groups stays into categories such as:

- 1 night
- 2 nights
- 3 nights
- 4-5 nights
- 6-7 nights
- 8-14 nights
- 15-21 nights
- 21+ nights

## 6. Date And Currency Handling

### 6.1 date-fns

The project uses `date-fns` for date operations.

Used operations include:

- Parsing ISO dates with `parseISO`
- Formatting dates with `format`
- Calculating date differences with `differenceInDays`
- Detecting today with `isToday`
- Detecting past dates with `isPast`
- Detecting future dates with `isFuture`
- Creating intervals with `eachDayOfInterval`
- Comparing dates with `isSameDay`
- Subtracting days with `subDays`
- Formatting relative time with `formatDistance`

These utilities support booking dates, dashboard date ranges, stay duration
calculations, and human-readable relative dates.

### 6.2 Currency Formatting

The application uses the browser's native `Intl.NumberFormat` API to format
monetary values as US dollars.

The helper is defined in `src/utils/helpers.js`:

```js
new Intl.NumberFormat('en', {
	style: 'currency',
	currency: 'USD',
});
```

## 7. Notifications And Icons

### 7.1 react-hot-toast

`react-hot-toast` provides user feedback after asynchronous operations.

Notifications are displayed for:

- Successful login
- Successful signup
- Successful logout
- Cabin creation
- Cabin editing
- Cabin deletion
- Booking updates
- Account updates
- API failures

The global `Toaster` is configured in `src/App.jsx`.

### 7.2 react-icons

`react-icons` supplies the icon system, primarily using Heroicons.

Icons appear in:

- Navigation
- Header actions
- Dashboard statistics
- Booking actions
- Cabin actions
- Check-in and check-out actions
- Modal controls
- Data summaries

Examples include eye, trash, user, logout, calendar, home, currency, and chart
icons.

## 8. Error Handling And Async States

### 8.1 react-error-boundary

The application root is wrapped with `ErrorBoundary` in `src/main.jsx`.

The custom `ErrorFallback` component:

- Displays a friendly failure message
- Displays the underlying error message
- Provides a retry button
- Resets the application state
- Prevents an unexpected rendering error from producing a blank screen

### 8.2 UI State Handling

The application includes reusable states for remote operations:

- Full-page spinners
- Inline spinners
- Disabled buttons while mutations run
- Empty resource messages
- Toast success messages
- Toast error messages
- Not-found pages
- Confirmation dialogs
- Error fallback screens

## 9. Dark Mode

Dark mode combines several browser and React technologies:

- React Context API
- `useState` through a custom local-storage hook
- `localStorage`
- `window.matchMedia`
- CSS classes on the `<html>` element
- CSS custom properties
- `useEffect`

The flow is:

1. Check whether a theme preference exists in local storage.
2. If no preference exists, inspect the operating system preference.
3. Store the chosen value in local storage.
4. Add either `light-mode` or `dark-mode` to the document root.
5. Let CSS variables change the colors throughout the application.

Implementation files:

- `src/contexts/DarkModeContext.jsx`
- `src/hooks/useLocalStorageState.js`
- `src/ui/DarkModeToggle.jsx`
- `src/styles/GlobalStyles.js`

## 10. Reusable UI And React Patterns

### 10.1 Feature-Based Architecture

The project groups domain behavior into feature folders:

```text
src/
|-- contexts/       Shared React contexts
|-- data/           Seed data and upload tools
|-- features/       Domain-specific application features
|-- hooks/          Reusable custom hooks
|-- pages/          Route-level components
|-- services/       Supabase data-access functions
|-- styles/         Global CSS and design tokens
|-- ui/             Reusable visual components
`-- utils/          Constants and helper functions
```

Feature folders include:

- `authentication`
- `bookings`
- `cabins`
- `check-in-out`
- `dashboard`
- `settings`

### 10.2 Compound Components

Compound components allow related components to share state and form a clear
API.

Examples:

- `Modal`, `Modal.Open`, and `Modal.Window`
- `Table`, `Table.Header`, `Table.Body`, `Table.Row`, and `Table.Footer`
- `Menus`, `Menus.Menu`, `Menus.Toggle`, `Menus.List`, and `Menus.Button`

### 10.3 React Context

Context is used for shared state that does not belong to one individual
component.

Examples:

- Dark-mode context
- Modal context
- Table context
- Menu context

### 10.4 React Portals

The modal implementation uses `createPortal` to render modal windows into
`document.body`, outside the normal component layout.

### 10.5 `cloneElement`

The modal system uses `cloneElement` to inject event handlers and close
callbacks into child components.

### 10.6 Render Props

`Table.Body` receives a data array and a row-rendering function. This keeps the
table generic while allowing each feature to control its row content.

### 10.7 URL State

Filtering, sorting, and pagination are stored in URL search parameters.

This makes table state:

- Shareable through a URL
- Preserved during navigation
- Usable with browser history
- Connected to React Query query keys

Relevant APIs include `useSearchParams`, `URLSearchParams`, and React Query
query keys.

### 10.8 Click-Outside Behavior

The reusable `useClickOutside` hook supports closing menus and modals when the
user clicks outside an active element.

## 11. Performance Techniques

The project uses several performance-related techniques:

### Lazy Loading

Pages are loaded with `React.lazy`:

- Dashboard
- Bookings
- Booking details
- Check-in
- Cabins
- Users
- Settings
- Account
- Login
- Not-found page

`Suspense` displays a spinner while a page chunk is loading.

### Query Caching

TanStack Query avoids unnecessary network requests by caching server data.

### Query Prefetching

The bookings feature prefetches the next and previous pages so pagination feels
faster.

### Selective Data Queries

Supabase queries request only the fields and relationships needed by each view,
including specialized queries for dashboard activity.

### Responsive Charts

Recharts uses `ResponsiveContainer` so charts adapt to the available layout
width.

## 12. File Upload Workflows

### Cabin Images

When creating or editing a cabin:

1. Read the selected file from the file input.
2. Generate a unique image name.
3. Insert or update the cabin record with the public image path.
4. Upload the file to the `cabin-images` Storage bucket.
5. Return the cabin data to React Query.
6. Refresh the cabin list through query invalidation.

### User Avatars

When updating an account:

1. Update the password or user metadata if provided.
2. Upload the selected avatar file to the `avatars` bucket.
3. Build the public avatar URL.
4. Store that URL in Supabase user metadata.
5. Update the cached `user` query.

## 13. Application Composition

The root application in `src/App.jsx` composes the main providers and
infrastructure:

1. `DarkModeProvider` supplies theme state.
2. `QueryClientProvider` supplies TanStack Query.
3. `GlobalStyles` injects design tokens and global CSS.
4. `BrowserRouter` supplies navigation and route state.
5. `Suspense` handles lazy-loaded page chunks.
6. `Toaster` displays global notifications.

The root entry in `src/main.jsx` adds:

- `React.StrictMode`
- `ErrorBoundary`
- `ErrorFallback`

## 14. Development Tooling

The project uses these development packages:

- `vite`
- `@vitejs/plugin-react`
- `vite-plugin-eslint`
- `eslint`
- `eslint-config-react-app`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `@types/react`
- `@types/react-dom`

The React type packages are installed, but the application itself is written in
JavaScript rather than TypeScript.

Available scripts from `package.json`:

```bash
pnpm dev       # Start the Vite development server
pnpm build     # Create the production bundle
pnpm preview   # Preview the production bundle locally
pnpm lint      # Run ESLint with zero-warning enforcement
```

## 15. Deployment

The project is prepared for Vercel deployment.

`vercel.json` contains a rewrite from every request to `index.html`:

```json
{
	"rewrites": [
		{
			"source": "/(.*)",
			"destination": "/index.html"
		}
	]
}
```

This is necessary because React Router handles routes in the browser. Without
this rewrite, directly visiting a route such as `/dashboard` or `/bookings`
could produce a server-side 404.

## 16. Data Seeding

`src/data/Uploader.jsx` can reset and seed the Supabase database with sample
data.

The upload order is important:

1. Delete bookings.
2. Delete guests.
3. Delete cabins.
4. Create guests.
5. Create cabins.
6. Read the generated guest and cabin IDs.
7. Replace the temporary IDs in the booking seed data.
8. Calculate booking totals and statuses.
9. Create bookings.

This demonstrates how to handle relationships when database IDs are generated by
the backend.

## 17. Learning Objectives

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
11. Managing global UI state with Context.
12. Persisting user preferences with local storage.
13. Creating a light/dark theme with CSS variables.
14. Building operational charts with Recharts.
15. Formatting dates, relative time, and currency for a business interface.
16. Handling modals, portals, click-outside behavior, and confirmation flows.
17. Building reusable table, menu, form, button, and layout components.
18. Using URL search parameters as application state.
19. Adding route-level code splitting with `React.lazy` and `Suspense`.
20. Handling unexpected UI failures with error boundaries.
21. Designing asynchronous user experiences with loading, disabled, empty, and
    error states.
22. Preparing and deploying a client-side routed application on Vercel.

## 18. Technologies Installed But Not Clearly Active

These packages or files exist but are not visibly active in the main application
flow:

- `@tanstack/react-query-devtools` is installed, but its component is commented
  out.
- `@types/react` and `@types/react-dom` are installed, but no TypeScript source
  files are present.
- `src/styles/index.css` contains an older or alternative global styling setup,
  while `GlobalStyles.js` is the primary global styling implementation.

The project does not currently use:

- TypeScript
- Redux
- Next.js
- Express
- Axios
- Tailwind CSS
- Material UI
- Jest
- Vitest
- Cypress
- Playwright
- A separate custom backend API

## 19. Current Verification Status

The production build completes successfully:

```text
pnpm build
vite v4.5.14 building for production...
1759 modules transformed
built successfully
```

The current lint command reports cleanup items:

- An unused ESLint disable directive in `src/features/bookings/BookingRow.jsx`.
- An unused ESLint disable directive in `src/ui/Button.jsx`.
- An unused ESLint disable directive in `src/ui/MainNav.jsx`.
- An unused `bookingId` parameter in
  `src/features/check-in-out/CheckoutButton.jsx`.

These issues do not prevent the Vite production build, but they should be
resolved before considering lint fully clean.

## 20. Suggested Next Learning Steps

After completing this project, useful next improvements would be:

- Move Supabase credentials to environment variables.
- Add automated tests for service functions and custom hooks.
- Add end-to-end tests for login, booking actions, and cabin management.
- Add TypeScript types for database records and form data.
- Add schema validation with a library such as Zod.
- Improve error handling by preserving structured Supabase error messages.
- Add role-based permissions for different staff users.
- Add optimistic updates where appropriate.
- Add accessibility testing for menus, modals, forms, and tables.
- Enable React Query Devtools during development.
- Remove unused packages, comments, and obsolete styling files.
