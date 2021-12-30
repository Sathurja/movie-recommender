import React, {useState, useEffect} from "react"

export default function Main() {

    const [inputMovieTitle, setInputMovieTitle] = useState("")
    const [inputMovieId, setInputMovieId] = useState("")
    const [inputMoviePosterUrl, setInputPosterUrl] = useState("")

    const [allRecs, setAllRec] = React.useState([])
    const [posters, setPosters] = React.useState([])

    useEffect(() => {
        {<h1 className="main--movietitle">Hello</h1>}  /////Check What this line and function does!!!!!!!!!!!!????????????
        //getInputMovieName()
        getRecs()
    }, [inputMovieId])

    useEffect(() => {
        getPosters()
    }, [allRecs])

    
    function getInputId() {
        setInputMovieTitle("")
        setInputMovieId("")
        setInputPosterUrl("")

        setAllRec([])
        setPosters([])

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=ea1dab80f5ae9938c8aa456d29dd655e&query=${inputMovieTitle}`)
            .then(res => res.json())
            .then(data => {
                setInputMovieTitle(data.results[0].title)
                //<h1 className="main--movietitle">Recomendations for {inputMovieTitle}</h1>
                setInputPosterUrl(`https://image.tmdb.org/t/p/original${data.results[0].poster_path}`)
                setInputMovieId(data.results[0].id)
            })
    }

    function getRecs() {
        if (inputMovieId != "") {
            fetch(`https://api.themoviedb.org/3/movie/${inputMovieId}/recommendations?api_key=ea1dab80f5ae9938c8aa456d29dd655e&language=en-US&page=1`)
                .then(res => res.json())
                .then(data => {
                    setAllRec(data.results)
                })
        }
                
    }

    function getPosters() {
        if (allRecs.length != 0) {
            setPosters(prevArray => [...prevArray, <h2 className="main--input_title">Recomendations for {inputMovieTitle}</h2>])
            setPosters(prevArray => [...prevArray, <img src={`https://image.tmdb.org/t/p/original${inputMoviePosterUrl}`} className="main--input_poster"/>])
            setPosters(prevArray => [...prevArray, <div className="main--space"></div>])
            for (let i = 0; i < 10 && i < allRecs.length; i++) {
                    setPosters(prevArray => [...prevArray,
                    <div className="main--image_whole">
                        <img src={`https://image.tmdb.org/t/p/original${allRecs[i].poster_path}`} className="main--image"/>
                        <div className="main--img_description_layer">
                            <p class="main--img_description">{allRecs[i].title}</p>
                        </div>
                    </div>
                    ])
            }
        }
    }

    function handleChange (event) {
        const {name, value} = event.target
        setInputMovieTitle(value)
    }

    return (
        <main className="main">
            <h3 className="main--title">What Movie do you like?</h3>
            <input
                type="text"
                placeholder="Movie Title"
                className="main--input"
                
                name="input"
                //value={Input.input}
                onChange={handleChange}
                
            />

            <button
                className="main--button"
                onClick={getInputId}
            >
                Get My Recomendation!
            </button>
            <div className="posters">{posters}</div>
        </main>
    )
}