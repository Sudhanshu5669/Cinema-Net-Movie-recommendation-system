import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Movie from './components/Movie'
import KeywordList from './components/KeywordList'

function App() {

  //  ----------------STATES------------------

  // string which holds value of search input
  const [string, setString] = useState('')
  const [keyword,setKeyWord] = useState([]);
  //  movies it holds the fetched data from the API
  const [movies, setMovies] = useState([])
  //  its a boolean value which helps in conditionaly rendering the card or clickedComponent
  const [change, setChange] = useState("");
  function changeme(key){
    setChange(key);
  }
  // it helps passing the value of clicked movie into the Movie component which further renders the page of clicked movie
  const [selectedMovie, setSelectedMovie] = useState({})

  // JUTS FETCHING THE DATA FROM API & string (search input) is inside the dependencies Array
  useEffect(() => {

    // using a ternary operator to change url whether we are seraching for a string(A movie) or just render the trending ones 
    
    // `https://api.themoviedb.org/3/search/keyword?query=${string}&page=1`
    const URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    //const URL = `https://api.themoviedb.org/3/search/keyword?query=${string}&page=1`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQzNzgyODM3M2QxOThkNGRmMDY4MGQ3MzY0Njg3NSIsInN1YiI6IjY0N2RlNDc3MTc0OTczMDBhODFhN2NiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-9fB5z6ag2m5iEsxAZWRi1AgyJhlvhfGOBS-rjkZFw'
      }
    };
    fetch(URL, options)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error('error:' + err));

  }, [string]);


  // FUNCTIONS TO PERFORM CERTAIN TASKS
  
  // this function on changing the input(search bar) in navbar component changes the string state accordingly
  function handleClick(word) {
    let x = word;
    const api = `https://api.themoviedb.org/3/search/keyword?query=${x}&page=1`;
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
        setKeyWord(data.results)
      
      })
      .catch(err => console.error('error:' + err));
   // setString(x)
    setChange("keyword")
  }

  function changeComponent(id) {
    setChange(true)
    
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === id) {
        setSelectedMovie(movies[i])
      }
    }
  }

  function changeMovie(data){
    setMovies(data);
    setChange("");
  }

  function Home(){
    setString("")
    setChange(false)
  }

  //  MAPPING OVER THE movies state which has the data fetched from API to render the Card Components
  const cardElements = movies.map((movie) => {
    if(movie.poster_path)
    return <Card change={changeComponent} key={movie.id} id={movie.id} date={movie.release_date} rating={movie.vote_average} title={movie.title} poster={movie.poster_path} />
  })

  if(change === "keyword"){
    return (
      <>
      <Navbar handleClick={handleClick} home={Home} />
      <KeywordList datas = {keyword} changeMovie={changeMovie} changeme={changeme}/>
      </>
    )
  }
  if(change === "search"){
    return (
      <>
      <Navbar handleClick={handleClick} home={Home} />
      
      </>
    )
  }
console.log(change);
  return (
    <>
      <Navbar handleClick={handleClick} home={Home} />
     <h1 className='head-trend'>Trending Movies</h1>
      <main>
      { cardElements}
      </main>
    </>
  )
}

export default App
