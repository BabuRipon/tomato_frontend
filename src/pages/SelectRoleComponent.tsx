import React, { useState } from 'react'
import { useApplicationData } from '../context/ApplicationDataContext';
import {config} from '../config/env.js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Role = 'Seller' | 'Rider' | 'Customer' | null;

const SelectRoleComponent = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const {setUser} = useApplicationData();
  const navigate = useNavigate();


  const roles: Role[] = ['Customer', 'Rider', 'Seller']

  const addRoleHandler = async () => {
    try{
      const { data } = await axios.put(`${config.authServiceUrl}/api/auth/add/role`,{role: selectedRole},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('role added successfully.');
      navigate('/', {replace: true});
    }
    catch(err){
      toast.error('role added failed.');
      console.log('role added error : ',err);
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='h-[30%] w-[70%] md:w-[45%] flex flex-col justify-center items-center gap-10'>
          <h1 className='text-red-600 text-2xl'>Choose Your Role</h1>
          <div className='w-full flex flex-col gap-4'>
            {
              roles.map(role=>(
                <div
                  className={`
                    w-full border border-solid border-slate-500 rounded-md text-center cursor-pointer py-1.5
                    transition hover:bg-slate-200
                    ${selectedRole===role && 'bg-red-600 text-white'}
                  `}
                  onClick={()=>setSelectedRole(role)}
                >Continue as {role}</div>
              ))
            }
          </div>
          <button
            className='w-full border border-solid border-slate-500 rounded-full cursor-pointer py-1.5 transition hover:bg-slate-400'
            onClick={addRoleHandler}
          >Save</button>
      </div>
    </div>
  )
}

export default SelectRoleComponent;
