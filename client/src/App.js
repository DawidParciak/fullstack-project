import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Ad from "./components/pages/Ad/Ad";
import Home from "./components/pages/Home/Home";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdEditPage from "./components/pages/AdEditPage/AdEditPage";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Logout from "./components/pages/Logout/Logout";
import NotFound from "./components/pages/NotFound/NotFound";
import User from "./components/pages/User/User";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/adsRedux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  return (
    <main>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AdEditPage />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/ad/search/:searchPhrase" element={<SearchPage />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
