import { ChakraProvider } from "@chakra-ui/react";
import Autentificacao from "./pages/login/Authentification";
import Home from "./pages/home/Home";
import Feedbacks from "./pages/feedback/Feedbacks";
import Avaliar from "./pages/rate/Rate";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Autentificacao/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/home/rate" element={<Avaliar/>} />
            <Route path="/home/feedbacks" element={<Feedbacks/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>

  );
}

export default App;
