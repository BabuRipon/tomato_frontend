import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from 'axios';
import { config } from '../config/env.js';
import { type AppContextTypes, type IuserTypes, type LocationDataTypes } from "../types.js";
import { Toaster } from "react-hot-toast"

export interface ChildrenPropsTypes {
    children: ReactNode
}

const AppContext = createContext<AppContextTypes|undefined>(undefined);

export const AppContextProvider = ({children}:ChildrenPropsTypes) => {
    const [user, setUser] = useState<IuserTypes|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [location, setLocation] = useState<LocationDataTypes | null>(null);
    const [city, setCity] = useState('Fetching loaction...');

    const fetchUserProfile = async () => {
        try{
            const {data} = await axios.get(`${config.authServiceUrl}/api/auth/me`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setUser(data);
            setIsAuth(true);
        }
        catch(err){
            setIsAuth(false);
            console.log('error fetching user profile.');
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUserProfile();
    },[])

    useEffect(()=>{
        if(!window.navigator.geolocation) return alert('please allow location to continue.');
        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(async (position)=>{
            const { latitude, longitude } = position.coords;
            try{
                const {data} = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                console.log('geoLocation: ',data);
                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: data.display_name || 'current location'
                })
                setCity(
                    data.address.town ||
                    data.address.village ||
                    data.address.city ||
                    'your location'
                )
            }
            catch(err){
                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: 'current location'
                })
                setCity('Failed to load city')
            }
            finally{
                setLocationLoading(false);
            }
        })
    },[])

    return (
        <AppContext.Provider value={{
            user,
            isAuth,
            loading,
            locationLoading,
            location,
            city,
            setUser,
            setLoading,
            setIsAuth
        }}>
            {children}
            <Toaster />
        </AppContext.Provider>
    )
}

export const useApplicationData = () => {
    const context = useContext(AppContext);

    if(!context){
        throw new Error('your app must be inside AppContextProvider component.')
    }

    return context;
}