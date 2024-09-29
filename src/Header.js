import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "./UserProvider";
function Header() {
  const {getUser, signOutUser} = useUser();

  const onchangeHandler=()=>{
    localStorage.removeItem("token");
    signOutUser(null);
  }
  return (
    <nav>
         <Link to="/"><img
          src="https://d3dyfaf3iutrxo.cloudfront.net/general/upload/78dbd1a43af24c48a5bc7ba17d4cb2dc.png"
          alt="spotify-logo"
        /></Link>
      <a href="/">
        
      </a>
      <ul>
      <li>
          <Link to="/SavedData">SavedData</Link>
        </li>
        <li>
          <Link to="/library">Favorites</Link>
        </li>
        {!getUser && <> <li>
          <Link to="/Register">Signup</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        
        </>}

        {getUser && getUser.status == "success" && <li>
          <Link to="/" onClick={onchangeHandler}>Logout</Link> && 
        </li> 
        }
       
      </ul>
    </nav>
  );
}

export default Header;
