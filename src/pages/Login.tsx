import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google"
import toast from 'react-hot-toast';

import { config } from '../config/env.js';
import { useApplicationData } from '../context/ApplicationDataContext';

const Login = () => {
  const { setUser, setIsAuth } = useApplicationData();
  const navigate = useNavigate();

  const handleLoginSuccess = async (res: any) => {
    try{
        const credential = res.credential;
        const result = await axios.post(`${config.authServiceUrl}/api/auth/login`,{
            credential
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Backend response:", result.data)
        setUser(result.data.user);
        setIsAuth(true);
        localStorage.setItem('token',result.data.token);
        toast.success('login success')
        navigate('/');
    }
    catch(err){
        console.log('error on google login.',err);
        toast.error('login failed')
        setUser(null);
        setIsAuth(false);
    }
  }


  return (
    <div className='h-screen w-screen flex justify-center items-center'>
    <div className='w-[40%] flex flex-col justify-center items-center'>
        <h1 className='text-[#E23744] font-bold text-2xl mb-4'>Login To Tomato</h1>
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => toast.error("Google login failed")}
        />
    </div>
</div>
  )
}

export default Login