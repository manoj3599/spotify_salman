import axios from "axios";
import { useEffect, useState, useRef } from "react";
 
import { useUser } from "./UserProvider";
import { useNavigate,Navigate } from "react-router-dom";
import React from "react";

export default function Library() {
  const [getList, setList] = useState([]);

  const { getUser } = useUser();
  console.log(getUser);

  const listOfDetails = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/favorites/like", {
        headers: {
          Authorization: `Bearer ${getUser.token}`,
        },
      })
      .then((response) => {
        setList(response.data.data.songs);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();


  const onClickHandler = (songId) => {
    axios.patch('https://academics.newtonschool.co/api/v1/music/favorites/like', { "songId": songId }, {
      headers: {
        Authorization: `Bearer ${getUser.token}`
      }
    }).then((response) => {
      
      alert("successfully removed");
      listOfDetails()
    }).catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    listOfDetails();
  }, []);

  //music
  const [ getAudio,setAudio]=useState("")
  const audioRef = useRef();

// Handler for playing audio
// Handler for playing audio
const startPlayerHandler = (url) => {
  if (audioRef.current) {
    // Resume if the same audio is paused
    if (audioRef.current.src === url && audioRef.current.paused) {
      audioRef.current.play();  // Resume playing
    } else {
      // If a different audio is clicked, set the new source
      setAudio(url);  // This triggers the effect to load and play
    }
  }
};

// Effect to play audio when the source changes
useEffect(() => {
  if (audioRef.current && getAudio) {
    audioRef.current.src = getAudio;  // Set the new audio source
    audioRef.current.play();  // Play the audio
  }
}, [getAudio]);

// Handler for stopping audio
const stopPlayerHandler = () => {
  if (audioRef.current) {
    audioRef.current.pause();  // Pause the audio
  }
};



  return (
    <div className="price-cards">
    {getList.map((obj, index) => {
      return (
        <section key={index}>
          <article>
            <section
              style={{
                padding: "px",
                display: "flex",
                flexDirection: "column",
              }}
              className="card-body"
            >
              <img
                style={{ width: "200px" }}
                src={obj.thumbnail}
                alt="song thumbnail"
              />
              <button onClick={() => onClickHandler(obj._id)}>Unlike</button>
              <button onClick={() => startPlayerHandler(obj.audio_url)}>Play</button>
              <button onClick={stopPlayerHandler}>Stop</button>
            </section>
          </article>
        </section>
      );
    })}
    <br />
    <audio
      style={{ width: "100vw", color: "white", backgroundColor: "black" }}
      ref={audioRef}
      src={getAudio}
      controls
    />
  </div>
  
  );
}
