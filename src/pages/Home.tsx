import React, {useState, useEffect} from 'react'
import { useApplicationData } from '../context/ApplicationDataContext'
import { useSearchParams } from 'react-router-dom';
import type { IRestaurantTypes } from '../types';
import axios from 'axios';
import { config } from '../config/env';

const Home = () => {
  const {location} = useApplicationData();
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');

  const [restaurants, setRestaurants] = useState<IRestaurantTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRestaurants = async () => {
    if(!location?.latitude || !location.longitude){
      return;
    }

    try{
      setLoading(true);
      const {data} = await axios.get(`${config.restaurantServiceUrl}/api/restaurant/all`,{
        params: {
          lat: location.latitude,
          long: location.longitude,
          search
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setRestaurants(data.restaurants ?? [])
    }
    catch(error){
      console.log('error on fetching restaurant: ',error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchRestaurants();
  },[location, search])

  if(loading || !location){
    return(
      <div className='flex justify-center items-center h-[60vh]'>
        <p>Finding restaurants near you...</p>
      </div>
    )
  }
  return (
    <div>Home</div>
  )
}

export default Home