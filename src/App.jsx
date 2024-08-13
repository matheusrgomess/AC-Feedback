import { Route, Routes } from "react-router-dom";
import Authentification from "./pages/login/Authentification";
import Home from "./pages/home/Home";
import Feedbacks from "./pages/feedback/Feedbacks";
import RateChooseUser from "./pages/rateChooseUser";
import RateParticipantScreen from "./pages/rate";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Settings from "pages/settings/settings";
import "./index.css";

function App() {
  return (
    <div
      className="App"
      style={{
        overflow: "hidden",
        fontFamily: "Montserrat, sans-serif",
        height: "100vh",
        maxWidth: "100vw",
      }}
    >
      <div
        style={{
          height: "100%",
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Authentification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/rate" element={<RateChooseUser />} />
          <Route
            path="/rate-participant/:participant"
            element={<RateParticipantScreen />}
          />
          <Route path="/home/feedbacks" element={<Feedbacks />} />
          <Route path="/home/settings" element={<Settings />} />
        </Routes>
        <ToastContainer
          position="top-center"
          pauseOnHover={false}
          theme="dark"
          progressStyle={{ background: "#ff0000" }}
          limit={2}
        />
      </div>
    </div>
  );
}

export default App;
