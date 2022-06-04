import React,{useState,useEffect} from 'react'

export const Meme = () => {
    const [meme,setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMemes,setAllMemes]=useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setAllMemes(data.data.memes))
    },[])

    
    function handleChange(event){
        const {name,value}=event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value}
        })
    }

    function getMemeImage(){
        const randomNum=Math.floor(Math.random()* allMemes.length)
        const url=allMemes[randomNum].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

  return (
    <div>
        <main>
            <div className='form'>
                <input 
                type="text" 
                placeholder='Top Text'
                className='form--input'
                name='topText'
                value={meme.topText}
                onChange={handleChange}
                />
                <input 
                type="text" 
                placeholder='Bottom Text'
                className='form--input'
                name='bottomText'
                value={meme.bottomText}
                onChange={handleChange}
                />
                <button 
                className='form--button'
                onClick={getMemeImage}
                >
                Get a new meme image!
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt='' className='meme--image'/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    </div>
  )
}
