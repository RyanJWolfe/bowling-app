import React from "react";
import { useNavigate } from "react-router-dom";
import GameForm from "./GameForm";

const GameCreate = () => {
  const navigate = useNavigate();

  const onSubmit = (formValue) => {
    navigate("/game", { state: { num_players: formValue } });
  };
  return (
    <div>
      <GameForm onSubmit={onSubmit} />
    </div>
  );
};

export default GameCreate;
