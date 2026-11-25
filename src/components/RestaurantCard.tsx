import React from 'react'
import { useNavigate } from 'react-router-dom';

interface propsType {
    name: string;
    id: string;
    image: string;
    isOpen: boolean;
    key: string,
    distance: number | string
}
const RestaurantCard = ({id, name, image, key, isOpen, distance}:propsType) => {
    const navigate = useNavigate();

    return (
    <div
        className={`cursor-pointer rounded-xl bg-white transition shadow-sm hover:shadow-md ${!isOpen?'opacity-80':''}`}
        onClick={()=>navigate(`/restaurant/${id}`)}
    >
        <div className='relative h-40 w-full overflow-hidden'>
            <img
                className={`w-full h-full object-cover outline-none border-0 transition duration-300 hover:scale-105 ${!isOpen?'grayscale brightness-75':''}`}
                src={image}
                alt=''
            />
            {
                !isOpen && <div className='absolute inset-0 flex justify-center items-center text-white bg-black/50'>
                    <p className='px-2 py-1 rounded-md bg-black/80 text-sm text-white font-semibold'>Closed</p>
                </div>
            }
        </div>
        <div className='space-y-1 p-3'>
            <h3 className='text-base truncate font-semibold text-gray-800'>{name}</h3>
            <p className='text-gray-500 text-sm'>{distance} KM away</p>
        </div>
    </div>
  )
}

export default RestaurantCard