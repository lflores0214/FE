import React, { useState, useEffect } from "react";
import axios from "axios"
import Nav from "./Nav";
import Search from "./Search"
import RestaurantCard from "./RestaurantCard"
import StarRating from '../restaurants/StarRating';





const HomePage = () => {
    const [rest, setRest] = useState([])
    useEffect(() => {
        axios
    .get(`https://vegan-meets.herokuapp.com/resturants`)
    .then(response =>{
        console.log(response)
        setRest(response.data)
    })
    .catch(error =>{
        console.log("ERROR", error)
    })
    },[])
    

    return (
        <>
        <Nav />
        <Search />
        {rest.map(r => <RestaurantCard key={r.id} r={r} />)}
        <StarRating />
        </>
    )
}
export default HomePage
