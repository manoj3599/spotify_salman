import axios from "axios";
import { useEffect, useState , useRef} from "react";
import { useUser } from "./UserProvider";
import { useNavigate,Navigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const [getList, setList] = useState([]);
  const [getCount, SetCount] = useState("")
  const [getSearch, setSearch] = useState("");
  const [getAudio, setAudio] = useState("https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf908947ae38c3e33a1994.mp3");

  const { getUser } = useUser();
  console.log(getUser);

  const navigate = useNavigate();//for navigating to login

  const listOfDetails = async () => {
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song")
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    listOfDetails();
  }, []);

  const onFilterSelection = async (input) => {
    let queryString = "";
    if (input === "Top 50 of this month" || input === "Top 20 of this week") {
      queryString = {
        featured: input,
      };
    } else if (input === "mood" || input === "happy" || input === "exited") {
      queryString = {
        mood: input,
      };
    }

    axios
      .get("https://academics.newtonschool.co/api/v1/music/song?", {
        params: {
          filter: JSON.stringify(queryString),
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchDetails = (event) => {
    // Create a query string object with the title
    const queryString = {
      title: event.target.value,
    };
    axios
      .get("https://academics.newtonschool.co/api/v1/music/song?", {
        params: {
          search: JSON.stringify(queryString), // Convert queryString to a JSON string
        },
      })
      .then((response) => {
        setList(response.data.data); // Update the state with the response data
      })
      .catch((error) => {
        console.error(error); // Log the error in case of failure
      });
  };

  const addToFavorites = (songId) => {
    axios
      .patch(
        "https://academics.newtonschool.co/api/v1/music/favorites/like",
        { songId: songId },
        {
          headers: {
            Authorization: `Bearer ${getUser.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("successfully stored");
      })
      .catch((error) => {
        console.log(error);
      });
  };
//music player
  const audioRef = useRef();

  const startPlayerHandler=(url)=>{
    setAudio(url)
    //audioRef.current.play();
  }

useEffect(()=>{
    SetCount(getCount+1)
    if(getCount>=1){
      audioRef.current.play();
    }
    
  },[getAudio])

   const stopPlayerHandler=()=>{
    audioRef.current.pause();
  }

  return (
    <div className="price-cards">
      <div id="download" style={{ width: "100%" }}>
        <section>
          <button onClick={() => onFilterSelection("happy")}>
            <i>Trending songs</i>
          </button>

          <button onClick={() => onFilterSelection("Top 50 of this month")}>
            <i>Top 50 of this month</i>
          </button>

          <button onClick={() => onFilterSelection("Top 20 of this week")}>
            <i>Top 20 of this week</i>
          </button>

          <div>
            Search:
            <input
              onChange={onSearchDetails} // Capture input in the state
              type="text"
              style={{
                width: "500px",
                border: "1px solid #ccc",
                padding: "8px",
              }}
            />
          </div>
        </section>
      </div>
      
      {/*audio*/}
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
                 onClick={()=>{
                  if(getUser && getUser.status === "success"){
                    if(audioRef.current.paused){
                      startPlayerHandler(obj.audio_url);
                    }else{
                      stopPlayerHandler();
                    }
                  }else{
                    navigate("/login");
                  }
                 }}
                  
                  
                />

{getUser && getUser.status === "success" && (
  <>
   { /*<button onClick={() => startPlayerHandler(obj.audio_url)}>Play</button>*/}
    {/*<button onClick={() => stopPlayerHandler(obj.audio_url)}>Stop</button>*/}
    <button onClick={() => addToFavorites(obj._id)}>Like</button>
  </>
)}

              </section>
            </article>
          </section>
        );
      })}
      <br/>
     <audio style={{width:"100vw", color:"white", backgroundColor:"black"}} ref={audioRef} src={getAudio}  controls/>
    </div>
  );
}