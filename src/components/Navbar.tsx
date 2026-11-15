import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { BiMapPin, BiSearch } from 'react-icons/bi'
import { useApplicationData } from '../context/ApplicationDataContext'

const Navbar = () => {
    const {isAuth, city} = useApplicationData();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || "");

    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(search){
                setSearchParams({search});
            }
            else{
                setSearchParams({});
            }
        },400)

        return ()=>clearTimeout(timer);
    },[search])

  return (
    <div className='w-full bg-white'>
        <div className='flex justify-between items-center px-4 py-3 mx-w-7xl shadow-md'>
            <Link to="/" className="text-[#E23744] text-2xl font-bold">Tomato</Link>
            <div className='flex justify-center items-center gap-4'>
                <Link to='/cart' className='relative'>
                    <CgShoppingCart className='h-6 w-6 text-[#E23744]'/>
                    <span className='absolute -top-2 -right-2 h-5 w-5 flex justify-center items-center rounded-full bg-[#E23744] text-sm text-semibold text-white'>0</span>
                </Link>
                {
                    isAuth?
                    <Link to='/account' className='text-[#E23744] font-medium'>Account</Link>:
                    <Link to='/Login' className='text-[#E23744] font-medium'>Login</Link>
                }
            </div>
        </div>
        {/* search input */}
        {
            isHomePage && 
            <div className='border-t px-4 py-3'>
                <div className='mx-auto flex items-center max-w-7xl rounded-lg border shadow-sm'>
                    <div className='flex items-center justify-center gap-1 border-r px-3 text-gray-700'>
                        <BiMapPin className='w-4 h-4 cursor-pointer text-[#E23744]'/>
                        <span className='text-sm'>{city}</span>
                    </div>
                    <div className='flex flex-1 items-center text-gray-400 px-3 gap-2'>
                        <BiSearch className='h-4 w-4'/>
                        <input
                            type="text"
                            placeholder='Search for Restaurant'
                            className='flex-1 py-2 text-sm outline-none'
                            value={search}
                            onChange={e=>setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Navbar