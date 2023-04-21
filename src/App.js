import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
import {getPlacesdata,getWeatherData} from '../src/api/index'
import { CssBaseline, Grid } from '@mui/material'
const App = () => {
     const[weatherData,setWeatherData]=useState([])
    const [places,setPlaces]=useState([])
    const [coordinates ,setCoordinates]=useState({lat :0,lng: 0})
    const [childClicked,setChildClicked]=useState(null)
    const [bonds,setBounds]=useState({})
    const [loading,setLoading]=useState(false)
    const [type,setType]=useState('restaurants')
    const [rating,setRating]=useState('')
    const [filteredPlaces,setfilteredPlaces]=useState([])
    useEffect(()=>{
             navigator.geolocation.getCurrentPosition(({ coords : {latitude,longitude}})=>{
               setCoordinates({lat :latitude , lng :longitude})
             })
    },[])
    useEffect(()=>{
        const filterdPlaces = places?.filter((place)=> place?.rating> rating)
       setfilteredPlaces(filterdPlaces)
    },[rating])
    useEffect(()=>{
     if(bonds.sw && bonds.ne){
        setLoading(true)
        getWeatherData(coordinates.lat,coordinates.lng)
        .then((data)=>{
          setWeatherData(data)
        })
        getPlacesdata(type,bonds?.sw, bonds?.ne)
      .then((data)=>{
        // console.log(data);
        setfilteredPlaces([])
        setPlaces(data?.filter((place)=>place.name && place.num_reviews >0))
        setLoading(false)
      })
    }
    },[type,bonds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={filteredPlaces?.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    loading={loading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                 <Map setCoordinates={setCoordinates}
                  setBounds ={setBounds} 
                  coordinates={coordinates} 
                  places={places}
                  setChildClicked={setChildClicked}
                  weatherData={weatherData}/>
                </Grid>
            </Grid>
        </>
    )
}

export default App
