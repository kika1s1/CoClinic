import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import LiveChat from "./pages/LiveChat";
import Footer from "./components/Footer";
import MessagePage from "./components/chat/MessagePage";
import HomeChat from "./components/chat/HomeChat";
import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";
import Book from "./pages/Book";
import Books from "./pages/Books";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/aichat" element={<AIChat />} />
          <Route path="/livechat" element={<LiveChat />} />
          <Route path="/appointment" element={<h3>Hello world</h3>} />
          <Route path="/recoveryplan" element={<h3>Hello world</h3>} />
          <Route path="/resource" element={<Books/>} />
          <Route path="/resource/:listingId" element={<Book />} />
          <Route path="" element={<HomeChat />}>
            <Route path="/livechat/:userId" element={<MessagePage />} />
          </Route>
        </Route>
        <Route path="" element={<OnlyAdminPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
