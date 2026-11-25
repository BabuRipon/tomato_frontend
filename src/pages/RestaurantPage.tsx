import React, { useEffect, useState } from 'react'
import type { IMenuItemTypes, IRestaurantTypes } from '../types';
import { useParams } from 'react-router-dom';
import { config } from '../config/env';
import axios from 'axios';
import RestaurantProfile from '../components/RestaurantProfile';
import MenuItems from '../components/MenuItems';

const RestaurantPage = () => {
    const [restaurant, setRestaurant] = useState<IRestaurantTypes | null>(null);
    const [menuItems, setMenuItems] = useState<IMenuItemTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const {id} = useParams();

    const fetchRestaurant = async () =>{
        try{
            setLoading(true);
            const {data} = await axios.get(`${config.restaurantServiceUrl}/api/restaurant/${id}`,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            setRestaurant(data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const fetchMenuItems = async () => {
      try{
        const {data} = await axios.get(`${config.restaurantServiceUrl}/api/menuItem/all/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(data);
        setMenuItems(data);
      }
      catch(err){
        console.log('fetchingMenuItems :', err);
      }
    }

    useEffect(()=>{
        fetchRestaurant();
        fetchMenuItems();
    },[])

    if(loading){
        return (
          <div className='flex justify-center items-center h-[60vh]'>
            <p>loading restaurant...</p>
          </div>
        )
    }

    if(!restaurant){
      return (
        <div className='flex justify-center items-center h-[60vh]'>
          <p>No restaurant found with this id</p>
        </div>
      )
    }
  return (
    <div className='min-h-screen px-4 py-6 space-y-6'>
      <RestaurantProfile
        restaurant={restaurant}
        isSeller={false}
        setRestaurant={setRestaurant}
      />
      <div className='p-4 shadow-sm rounded-lg'>
        <MenuItems menuItems={menuItems} isSeller={false} onItemDeleted={() => {}}/>
      </div>
    </div>
  )
}

export default RestaurantPage