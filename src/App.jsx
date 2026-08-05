import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import {
  Dashboard,
  Bookings,
  Cabins,
  Users,
  Settings,
  Account,
  Login,
  PageNotFound,
} from "./pages/PagesAPI";

function App() {
  return (
    // since we won't be needing react router loading features,
    // we'll be using the traditional route elements way
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<DashBoard />} /> */}
          {/* But it won't redirect us to the main route */}
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
