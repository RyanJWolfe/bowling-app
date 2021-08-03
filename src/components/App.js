import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";

import Header from "./nav/Header";
import HomePage from "./HomePage";
import GameCreate from "./game/GameCreate";
import GameView from "./game/GameView";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <CssBaseline />
          <Header />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-game" element={<GameCreate />} />
              <Route path="/game" element={<GameView />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
