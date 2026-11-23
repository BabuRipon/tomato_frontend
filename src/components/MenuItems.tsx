import React, { useState } from 'react'
import {type IMenuItemTypes } from '../types.js';
import { BsCart, BsEye } from 'react-icons/bs';
import { FiEyeOff } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';
import { VscLoading } from 'react-icons/vsc';
import axios from 'axios';
import { config } from '../config/env.js';
import toast from 'react-hot-toast';

interface propsType {
  menuItems: IMenuItemTypes[],
  isSeller: boolean,
  onItemDeleted: () => void
}
const MenuItems = ({menuItems, isSeller, onItemDeleted}: propsType) => {
  const [loadingItemId, setLoadingItemId] = useState<string|null>(null)
  
  const handleDelete = async (itemId: string) => {
    const confirm = window.confirm('Are you sure you want to delete item.')
    if(confirm) return;

    try{
      const {data} = await axios.delete(`${config.restaurantServiceUrl}/api/menuItem/${itemId}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      onItemDeleted();
      toast.success(data.message);
    }
    catch(err){
      console.log(err);
      toast.error('Failed to delete item')
    }
  }

  const toggleAvailibiity = async (itemId: string) => {
    try{
      const {data} = await axios.put(`${config.restaurantServiceUrl}/api/menuItem/status/${itemId}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      toast.success(data.message);
      onItemDeleted();
    }
    catch(error){
      console.log(error);
      toast.error('failed to toggle visibility')
    }
  }
  return(
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
      {
        menuItems.map((item)=>{
          const isLoading = loadingItemId === item._id;

          return (
            <div className='relative flex gap-4 shadow-sm p-4 rounded-lg bg-white' key={item._id}>
            <div className='relative'>
              <img
                src={item.image}
                className={`w-20 h-20 rounded object-cover ${!item.isAvailable ? 'grayscale brightness-50' : ''}`}
              />
              {
                !item.isAvailable &&
                <span className='absolute inset-0 text-xs font-semibold flex justify-center items-center text-white'>Not Available</span>
              }
            </div>
            <div className='flex flex-col gap-4'>
              <div className=''>
                <h3 className='text- font-semibold'>{item.name}</h3>
                {
                  item.description &&
                  <p className='text-xs text-gray-400 line-clamp-2 md:line-clamp-3'>{item.description}</p>
                }
              </div>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>{`$${item.price}`}</p>
                {
                  isSeller && 
                  <div className='flex gap-2'>
                    <button
                      className='cursor-pointer'
                      onClick={()=>toggleAvailibiity(item._id)}
                    >
                      {
                        item.isAvailable ? 
                        <BsEye className='w-5 h-5' /> :
                        <FiEyeOff className='w-5 h-5' />
                      }
                    </button>
                    <button 
                      className='text-red-500 hover:bg-red-50 cursor-pointer'
                      onClick={()=>handleDelete(item._id)}
                    >
                      <BiTrash className='w-5 h-5' />
                    </button>
                  </div>
                }
                {
                  !isSeller && 
                  <button
                    disabled={!item.isAvailable || isLoading}
                    className={`flex justify-center items-center rounded-lg p-2 ${
                      !item.isAvailable || isLoading ? 'cursor-not-allowed text-gray-400':
                      'bg-red-400 hover: bg-red-50'
                    }`}
                    onClick={()=>{}}
                  >
                    {
                      isLoading?
                      <VscLoading size={18} className='animate-spin'/> :
                      <BsCart size={18}/>
                    }
                  </button>
                }
              </div>
            </div>
          </div>
          )
        })
      }
    </div>
  )
}
export default MenuItems