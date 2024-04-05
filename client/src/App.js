import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  const navigate=useNavigate()
  const [data, setData] = useState({
    _id: "660430fe74d07d6ebaba919f",
    firstName: "Ankit",
    lastName: "Anand",
    email: "ankit@gmail.com",
    phone: 7078259655,
    __v: 0,
  });
  console.log(data.firstName)
  useEffect(() => {
    if (localStorage.getItem("myData") === "null") {
      localStorage.clear();
    }
    const params = new URLSearchParams(window.location.search);
    const dataFromFirstApp = params.get("data");
    if (!localStorage.getItem("myData")) {
      console.log("internal");
      localStorage.setItem("myData", dataFromFirstApp);
      setData(JSON.parse(localStorage.getItem("myData")));
      navigate("/home");
    }
  }, []);

  return (
    <div className="App">
      <NavBar name={data.firstName} />

      <Routes>
        <Route path="/home" exact element={<HomeScreen />} />
        <Route
          path="/book/:roomsid/:fromdate/:todate"
          element={<BookingScreen />}
        />

        <Route
          path="/profile"
          element={
            <ProfileScreen
              name={data.firstName}
              phone={data.phone}
              email={data.email}
            />
          }
        />
       
        <Route path="/admin" element={<AdminScreen />}></Route>
        <Route path="/" element={<HomeScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
