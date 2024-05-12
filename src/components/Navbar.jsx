import { useState } from "react"
import Profile from "../assets/profile.jpg"
import "./Navbar.css"

export default function Navbar({handleClick,home}){
    const [word,setWord] = useState("");
    return(<>
    <nav>
    <h1 className="logo-head">CINEMA <span className="net">NET</span> </h1>
    <i className="uis uis-house-user" onClick={home}></i>
    <input name="movie" type="text" className="input-box" placeholder="Search" onChange={(e)=>setWord(e.target.value)}/>
    <button className="text-white ml-[700px] border-2 rounded-md p-2 border-white" onClick={()=>handleClick(word)}>Search</button>
    <img className="profile" src={Profile}/>
    </nav>
           </>)
}