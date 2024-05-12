import React from "react";
import "./keywordlist.css"

const KeywordList = ({datas,changeMovie,changeme}) => {
    function getMovies(id) {
        console.log(id)
        const api = `https://api.themoviedb.org/3/keyword/${id}/movies?include_adult=false&language=en-US&page=1`;
     const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQzNzgyODM3M2QxOThkNGRmMDY4MGQ3MzY0Njg3NSIsInN1YiI6IjY0N2RlNDc3MTc0OTczMDBhODFhN2NiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-9fB5z6ag2m5iEsxAZWRi1AgyJhlvhfGOBS-rjkZFw'
      }
    };
    fetch(api, options)
      .then(res => res.json())
      .then(data => {
        changeMovie(data.results);
        console.log(data)
       // setMovies(data.results)
      })
      .catch(err => console.error('error:' + err));
   // setString(x)
    //setChange("keyword")
    changeme("search");
    }
    return(
    <div className="flex flex-col bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
    {datas.map((data)=>(
        <div className="m-5 p-5 text-white" onClick={()=>getMovies(data.id)} >
        <h2>{data.name}</h2>
        <p>{data.id}</p>
        </div>
    ))}
    </div>);
}
export default KeywordList