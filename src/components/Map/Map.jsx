import React, { useState } from 'react'
import { Rating } from '@mui/material'
import GoogleMapReact from 'google-map-react'
import {LocationOnOutlined} from '@mui/icons-material'
import {Paper,Typography,useMediaQuery} from '@material-ui/core'
import useStyles from './style'
import mapStyles from './MapStyle'
const Map = ({setCoordinates,setBounds,weatherData,coordinates,places,setChildClicked}) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px)')
  return (
     <div className={classes.mapContainer}>
      <GoogleMapReact 
      bootstrapURLKeys={{key:"AIzaSyAJvss1mp3WJd80-tFmVMFJ_HOog153c1w"}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50,50,50,50]}
      options={{disableDefaultUI: true , zoomControl: true,styles:mapStyles}}
      onChange={(e)=>{
        setBounds({ne: e.marginBounds.ne , sw :e.marginBounds.sw})
        setCoordinates({lat : e.center.lat, lng : e.center.lng})
      }}
      onChildClick={(child)=>{setChildClicked(child)}}
      >
      {places?.map((place,i)=>(
        // console.log(place)
        <div className={classes.markerContainer}
        lat ={place.latitude}
        lng ={place.longitude}
        key={i}
        >
         {
  !isDesktop ?(
    <LocationOnOutlined color='primary' fontSize='large'/>
  ):
  <Paper elevation={3} className={classes.paper}>
    <Typography className={classes.typography} variant='subtitle2'gutterBottom>
      {place.name}
    </Typography>
 <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80'}
 alt={place.name}/>
 <Rating size='small'value={Number(place.rating)} readOnly/>
  </Paper>
}
</div>
      ))}
      {weatherData?.list?.map((data,i)=>(
        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
          <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
        </div>
      ))}
      </GoogleMapReact>
     </div>
  )
}

export default Map
