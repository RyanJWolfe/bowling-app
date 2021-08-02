import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ScoreCard from "./scorecard/ScoreCard";

const GameView = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const numPlayers = state.num_players;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  });

  console.log(numPlayers);

  const renderScoreCards = () => {
    let scoreCards = [];

    for (var i = 1; i <= numPlayers; ++i) {
      scoreCards.push(<ScoreCard key={i} id={i} />);
    }

    return scoreCards;
  };
  return <div>{renderScoreCards()}</div>;
};

export default GameView;
