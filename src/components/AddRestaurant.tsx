import React, { useState } from 'react'
import { useApplicationData } from '../context/ApplicationDataContext';
import { BiMapPin, BiUpload } from 'react-icons/bi';
import { config } from '../config/env';
import axios from 'axios';
import toast from 'react-hot-toast';

interface propTypes {
    fetchMyRestaurant: ()=>Promise<void>
}

const AddRestaurant = ({fetchMyRestaurant}:propTypes) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const {location, locationLoading} = useApplicationData();

    const handleSubmit = async () => {
        if(!name || !location || !image){
            alert('All field are required')
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("phone", phone);
        formData.append("file", image);
        formData.append("latitude", String(location.latitude));
        formData.append("longitude", String(location.longitude));
        formData.append("formattedAddress", location.formattedAddress);

        try{
            setSubmitting(true);
            const {data} = await axios.post(`${config.restaurantServiceUrl}/api/restaurant/new`,formData,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(data.message);
            fetchMyRestaurant();
        }
        catch(error: any){
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
        finally{
            setSubmitting(false);
        }
    }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-5'>
        <div className='mx-auto max-w-lg rounded-lg bg-white shadow-sm p-5 space-y-5'>
            <h1 className='text-xl font-semibold'>Add Your Restaurant</h1>
            <input
                type="text"
                placeholder="Restaurant Name"
                value={name}
                onChange={e=>setName(e.target.value)}
                className='w-full px-4 py-2 text-sm rounded-lg outline-none border'
            />
            <input
                type="text"
                placeholder="Contact Number"
                value={phone}
                onChange={e=>setPhone(e.target.value)}
                className='w-full px-4 py-2 text-sm rounded-lg outline-none border'
            />
            <textarea
                placeholder="Restaurant description"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                className='w-full px-4 py-2 text-sm rounded-lg outline-none border'
            />
            <label
                className='flex gap-3 p-5 rounded-lg border text-sm text-gray-600 cursor-pointer hover:bg-gray-50'
            >
                <BiUpload className='w-5 h-5 text-red-500'/>
                {image ? image.name : 'Upload Reataurant Image'}
                <input type='file' accept='image/*' hidden onChange={e=>setImage(e.target.files?.[0]||null)} />
            </label>
            <div className='flex gap-3 items-start border rounded-lg p-3'>
                <BiMapPin className='mt-0.5 w-5 h-5 text-red-500'/>
                <div className='text-sm'>
                    {locationLoading ? 'Fetching your location...' : location?.formattedAddress || 'Location not available'}
                </div>
            </div>
            <button
                className='w-full rounded-lg text-white bg-[#E23744] py-3'
                disabled={submitting}
                onClick={handleSubmit}
            >
                {submitting ? 'Submitting...' : 'Add Your Restaurant'}
            </button>
        </div>
    </div>
  )
}

export default AddRestaurant