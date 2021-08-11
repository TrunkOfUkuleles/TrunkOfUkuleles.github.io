

import React , { useState , useEffect, useRef }from 'react';


const superagent = require('superagent');
const io = require('socket.io-client');
const HOST = process.env.REACT_APP_PORTFOLIO_HOST || "http://localhost:3001";
const socket = io.connect(`${HOST}/gifs`);

const area1 = () => {

    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const [choiceArray, setChoiceArray] = useState([])

    const typing = (e) => [
        setInput(`${e.target.value}`)
    ]
    useEffect(()=>{
        socket.on('user joined', pay => {
            setChat(arr => [...arr, {type: "notification", message: "User PortfolioWindow has joined the chat", user: pay.user}])
        })

        socket.on('message', pay => {
            setChat(arr => [...arr, { message: pay.message, user: pay.user}])
        })

        socket.on('user disconnected', pay => {
            setChat(arr => [...arr, { type: "notification", message: `User ${pay.user.nickname} has left the room`, user: pay.user}])
        })
    },[])

    useEffect(()=> {
        let hold = [];
        console.log("getting 5 first", process.env.REACT_APP_GIPHY_API)
        let url="https://api.giphy.com/v1/gifs/trending?limit=5"
        superagent.get(url)
        .query({api_key: `${process.env.REACT_APP_GIPHY_API}`})
        .then((results) => {
            let res = results.body.data
            res.forEach(el => {
                hold.push({ image: el.images.fixed_width.url, id: el.id, title: el.title })
            })
            setChoiceArray(() => [...hold])
        })
        socket.emit('join', {user: {email: "portfolio@me.com", favorites: [], friends: [], id:666, nickname:'portfolio-window'}, room: "Main Room"})
    },[])

    //getting the results from searching for giphs async from Giphy API
    const DATA = { set: []};
    DATA.handleAPICall = async (req, res) => {
        console.log(req, res)
        const url = `https://api.giphy.com/v1/gifs/search?q=${input}&limit=5`;
        if (input){
            superagent.get(url)
                .query({api_key: `${process.env.REACT_APP_GIPHY_API}`})
                .then( (results) => {
                    DATA.results= results;
                    let filter = DATA.results.body.data
                    filter.forEach(el=> {
                        DATA.set.push({ image: el.images.fixed_width.url, id: el.id, title: el.title})
                    })
                    setChoiceArray(()=> [...DATA.set])
                    DATA.set=[]
                    console.log(choiceArray)
                })
                .catch(err=> console.error(err))
        }
    }


    const clicker = (e) => {
        e.preventDefault();
        socket.emit('message', { message: {image: e.target.setChoiceArray, id: e.target.id, title: e.target.alt}})
        setInput('')
    }

    const choicesWindow = (data) => {
        return data.map((el, index) => {
            <div className="gif-prev" key={el.id + index}>
                <img src={el.image} alt={el.title} id={el.id} onClick={(e) => clicker(e)} />
            </div>
        })
    } 

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [chat])

    const chatWindow = () => {
        return chat.map(({ message, user, type}, index) => {
            type === 'notification' ? 
            <>
            <div key={index} className="notification">
                <h4>
                    {message}
                </h4>
            </div>
            </>
            :
            <>
            <div key={index} className={user.nickname === "portfolio-window" ? "my-message" : "message"}>
                <img alt={message.title} src={message.image} id={message.id} />
                <h2>{user.nickname}</h2>

            </div>
            <div ref={messagesEndRef} />
            </>
        })
    }

    const ent = (e) => {
        if(e.key === "Enter") { DATA.handleAPICall() }
    }

    return (

        <div className="chat-container">
            <div className="chatty"> 
                {chatWindow}
            </div>

            <div className="searcher">
                <div className='search'>
                    <label htmlFor="">
                        <input placeholder="Search For Giphs" type="text" onChange={e => typing(e)} onKeyDown={e => ent(e)} value={input} />
                        <i className="fas fa search" onClick={DATA.handleAPICall} />
                    </label>
                </div>
            </div>

            <div className="giph-results">
                {choicesWindow(choiceArray)}
            </div>
        </div>
        
        // <div className="holder" style={{zIndex: 5}}>
        //     areaONE
        // </div>
    )
}   

export default area1;