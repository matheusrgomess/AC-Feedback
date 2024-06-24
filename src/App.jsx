import { Route, Routes } from "react-router-dom";
import Autentificacao from "./pages/login/Authentification";
import Home from "./pages/home/Home";
import Feedbacks from "./pages/feedback/Feedbacks";
import AvaliarNewComponent from "./pages/AvaliarNewComponent";
import RateParticipantScreen from "./pages/rate";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Settings from "pages/settings/settings";

function App() {
  return (
    <div
      className="App"
      style={{
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#1c222b",
        height: "100vh",
        color: "black",
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
          <Route path="/" element={<Autentificacao />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/rate" element={<AvaliarNewComponent />} />
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
