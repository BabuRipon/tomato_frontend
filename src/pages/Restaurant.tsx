import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { IRestaurantTypes } from '../types';
import { config } from '../config/env'; 
import AddRestaurant from '../components/AddRestaurant';
import RestaurantProfile from '../components/RestaurantProfile';

const Restaurant = () => {
    const [restaurant, setRestaurant] = useState<IRestaurantTypes | null>(null);
    const [loading, setLoading] = useState(true);
    
    const tabs = [
      {key: 'menu', label: 'Menu'},
      {key: 'add-item', label: 'Add-Item'},
      {key: 'sales', label: 'Sales'}
    ] as const;

    type activeTabType = typeof tabs[number]['key'];
    const [activeTab, setActiveTab] = useState<activeTabType>('menu');

    const fetchMyRestaurant = async () => {
        try{
          const {data} = await axios.get(`${config.restaurantServiceUrl}/api/restaurant/my`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          setRestaurant(data.restaurant || null);
          if(data.token){
            localStorage.setItem('token',data.token);
            window.location.reload();
          }
        }
        catch(error){ 
          console.log('fetchingMyRestaurant : ',error);
        }
        finally{
          setLoading(false);
        }
    }

    useEffect(()=>{
      fetchMyRestaurant();
    },[])

  if(loading){
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-gray-500'>Loading your restaurant...</p>
      </div>
    )
  }

  if(!restaurant){
    return <AddRestaurant fetchMyRestaurant={fetchMyRestaurant}/>
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6 space-y-6'>
      <RestaurantProfile restaurant={restaurant} isSeller={true} setRestaurant={setRestaurant} />
      <div className="rounded-xl shadow-sm bg-white">
        <div className='flex items-center'>
          {
            tabs.map(t=>(
              <button
                key={t.key}
                onClick={()=>setActiveTab(t.key)}
                className={`flex-1 text-sm font- py-2 border-b ${activeTab==t.key && 'text-[#E23744] border-[#E23744]'} hover: bg-gray-50 cursor-pointer`}
              >{t.label}</button>
            ))
          }
        </div>
        <div className='p-5'>
          { activeTab===tabs[0].key && <div>Menu</div>}
          { activeTab===tabs[1].key && <div>Add Items</div>}
          { activeTab===tabs[2].key && <div>Sales</div>}
        </div>
      </div>
    </div>
  )
}

export default Restaurant