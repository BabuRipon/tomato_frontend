import {useState, type SetStateAction, type Dispatch} from 'react';
import type { IRestaurantTypes } from "../types"
import axios from 'axios';
import { config } from '../config/env';
import toast from 'react-hot-toast';
import { BiEdit, BiMapPin, BiSave } from 'react-icons/bi';

interface PropsTypes {
    restaurant: IRestaurantTypes;
    isSeller: boolean;
    setRestaurant: Dispatch<SetStateAction<IRestaurantTypes | null>>
}

const RestaurantProfile = ({restaurant, isSeller, setRestaurant}: PropsTypes) => {
    const [name, setName] = useState(restaurant.name);
    const [description, setDescription] = useState(restaurant.description);
    const [isOpen, setIsOpen] = useState(restaurant.isOpen);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleOpenStatus = async () => {
        try{
            const {data} = await axios.put(`${config.restaurantServiceUrl}/api/restaurant/status`,
            {
                status: !isOpen
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            toast.success(data.message);
            setIsOpen(data.restaurant.isOpen);
            console.log(data.restaurant)
        }
        catch(error: any){
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    const saveChanges = async () => {
        try{
            setLoading(true);
            const {data} = await axios.put(`${config.restaurantServiceUrl}/api/restaurant/edit`,
                {name, description},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            setRestaurant(data.restaurant);
            console.log(data.restaurant)
            toast.success(data.message);
        }
        catch(error: any){
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
    <div className="mx-auto max-w-xl rounded-lg bg-white shadow-sm overflow-hidden">
        {
            restaurant.image &&
            <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
            />
        }
        <div className='p-2'>
            {
                isSeller && <div className='flex justify-between items-start'>
                    <div>
                        {
                        editMode ? (
                            <input
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                className='w-full outline-none border px-4 py-2 rounded-lg text-sm'
                            />
                            ):
                            <h1 className='text-xl font-semibold'>{name}</h1>
                        }
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <BiMapPin className='w-4 h-4 mt-0.5 text-red-500'/>
                            {restaurant.autoLocation.formattedAddress || 'Location unavailable'}
                        </div>
                    </div>
                    <button className='cursor-pointer' onClick={()=>setEditMode(!editMode)}><BiEdit className='w-4 h-4'/></button>
                </div>
            }

            {
                editMode ? 
                <textarea
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    className='w-full border outline-none px-4 py-2 text-sm rounded-lg my-3'
                />:
                <p className='text-sm text-gray-600 my-3'>{description || 'No description'}</p>
            }

            <div className='flex items-center justify-between pt-3 border-t'>
                <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-500'}`}>{isOpen ? 'OPEN' : 'CLOSED'}</span>
                <div className="flex gap-3">
                    {
                        editMode && 
                        <button
                            className='flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700'
                            onClick={saveChanges}
                            disabled={loading}
                        >
                            <BiSave className='w-4 h-4'/>
                            Save
                        </button>
                    }
                    {
                        isSeller &&
                        <button
                            onClick={toggleOpenStatus}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white ${
                                isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {isOpen? 'Close Restaurant' : 'Open Restaurant'}
                        </button>
                    }
                </div>
            </div>
            <p className='text-xs text-gray-400 pt-4 pb-1'>
                Created on : {new Date(restaurant.createdAt).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
        </div>
    </div>
  )
}

export default RestaurantProfile