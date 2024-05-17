import { Route, Routes } from "react-router-dom"
import Autentificacao from "./pages/login/Authentification";
import Home from "./pages/home/Home";
import Feedbacks from "./pages/feedback/Feedbacks";
import AvaliarNewComponent from './pages/AvaliarNewComponent'
import RateParticipantScreen from "./pages/rate-participant-screen";
import Header from "./components/Header";

function App() {

  return (
    <div className="App" style={{
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#1c222b',
      height: '100vh',
      color: 'black',
      maxWidth: '100vw'
    }}>
      <div style={{
        height: '100%'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<Autentificacao />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/rate" element={<AvaliarNewComponent />} />
          <Route path="/rate-participant/:participant" element={<RateParticipantScreen />} />
          <Route path="/home/feedbacks" element={<Feedbacks />} />
        </Routes>
      </div>


    </div>

  );
};

export default App;
