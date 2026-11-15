import React from 'react'
import { useApplicationData } from '../context/ApplicationDataContext'
import {toast} from 'react-hot-toast';
import { BiLogOut, BiMapPin, BiPackage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const {user, setIsAuth, setUser} = useApplicationData();
    const navigate = useNavigate();
    const firstNameLetter = user?.name.charAt(0).toUpperCase();

    const logoutHandler = () => {
        localStorage.setItem("token","");
        setUser(null);
        setIsAuth(false);
        toast.success('logout successful');
    }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-6'>
        <div className='mx-auto max-w-md bg-white rounded-lg shadow-sm'>
            <div className='flex gap-4 items-center p-5 border-b'>
                <div className='h-14 w-14 bg-red-500 rounded-full flex justify-center items-center font-semibold text-white text-xl'>{firstNameLetter}</div>
                <div>
                    <h2 className='text-lg font-semibold'>{user?.name}</h2>
                    <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
            </div>
            <div className='divide-y'>
                <div className='flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-5'
                    onClick={()=>navigate('/orders')}
                >
                    <BiPackage className='h-5 w-5 text-red-500'/>
                    <span className='font-medium'>Your Orders</span>
                </div>
                <div className='flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-5'
                    onClick={()=>navigate('/address')}
                >
                    <BiMapPin className='h-5 w-5 text-red-500'/>
                    <span className='font-medium'>Address</span>
                </div>
                <div className='flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-5'
                    onClick={logoutHandler}
                >
                    <BiLogOut className='h-5 w-5 text-red-500'/>
                    <span className='font-medium'>Logout</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account