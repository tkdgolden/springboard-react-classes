import axios from "axios";
import { useState, useEffect } from "react";


const useGetJokes = (loadingFunction) => {
  const [ jokes, setJokes ] = useState([]);


  // fetch our data
  async function getJokes() {
    const numJokesToGet = 5;
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let newJokes = [];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }
      setJokes(newJokes);
      loadingFunction(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(function generateJokes() {
    getJokes();
  }, [])


  return [jokes, getJokes, setJokes];
};

export default useGetJokes;