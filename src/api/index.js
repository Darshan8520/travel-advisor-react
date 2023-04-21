
import axios from "axios"

 export const getPlacesdata = async(type,sw,ne)=>{
    try {
        const { data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '228d4fbac0msh260d32c0affede7p1858fdjsnd2592b387309',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
           })
        
        return data;

    } catch (error) {
       console.log(error); 
    }
}

export const getWeatherData=async(lat,lng)=>{
     try {
      const {data}=await axios.get('https://weather338.p.rapidapi.com/weather/forecast',{
        params: {
          latitude: lat,
          longitude: lng,
        },
        headers: {
          'X-RapidAPI-Key': '228d4fbac0msh260d32c0affede7p1858fdjsnd2592b387309',
          'X-RapidAPI-Host': 'weather338.p.rapidapi.com'
        }
      })
      return data
     } catch (error) {
      console.log(error);
     }
}