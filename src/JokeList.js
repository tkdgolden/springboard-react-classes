import React, { useEffect, useState } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import useGetJokes from "./hooks/useGetJokes";

/** List of jokes. */

const JokeList = () => {
  const [ isLoading, setLoading ] = useState(true)

  const [ jokes, getJokes, setJokes ] = useGetJokes(setLoading);

  const generateNewJokes = () => {
    setLoading(true);
    getJokes();
  };

  const vote = (id, delta) => {
    setJokes(jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    ))
  };

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
      <button
        className="JokeList-getmore"
        onClick={generateNewJokes}
      >
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
};

export default JokeList;
