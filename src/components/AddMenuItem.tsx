import { useState } from 'react'
import toast from 'react-hot-toast';
import { BiUpload } from 'react-icons/bi';
import axios from 'axios';
import { config } from '../config/env';

interface propsTypes {
  onItemAdded: () => void
}

const AddMenuItem = ({onItemAdded}: propsTypes) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    }

    const handleSubmit = async () => {
      if(!name || !price || !image){
        alert('name, price and image is required.');
        return;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('file', image);
      try{
        setLoading(true);
        const {data} = await axios.post(`${config.restaurantServiceUrl}/api/menuItem/new`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        resetForm();
        toast.success(data.message);
        setLoading(false);
        onItemAdded();
      }
      catch(err){
        setLoading(false);
        console.log(err);
        toast.error('error on adding menu Item');
      }
    }

  return (
    <div className='max-w-md mx-auto space-y-4 shadow-md'>
        <h2 className='font-semibold text-xl'>Add Menu Item</h2>
        <input type='text' placeholder='Item name' className='w-full px-4 py-2 rounded-lg outline-none border' value={name} onChange={e=>setName(e.target.value)}/>
        <textarea placeholder='Description' className='w-full px-4 py-2 rounded-lg outline-none border' value={description} onChange={e=>setDescription(e.target.value)} />
        <input type='number' placeholder='price' className='w-full px-4 py-2 rounded-lg outline-none border' value={price} onChange={e=>setPrice(e.target.value)}/>
        <label className='flex gap-2 p-5 border rounded-lg items-center cursor-pointer text-sm text-gray-600 hover:bg-gray-50'>
            <BiUpload className='w-5 h-5 text-red-500'/>
            {image ? image.name : 'upload item image'}
            <input type="file" accept='image/*' onChange={e=>setImage(e.target.files?.[0] || null)} hidden/>
        </label>
        <button
          disabled={loading}
          className='text-center w-full py-2 rounded-full bg-[#E23744] text-white cursor-pointer'
          onClick={handleSubmit}
        >
          {loading ? 'Adding Item...' : 'Add Item'}
        </button>
    </div>
  )
}

export default AddMenuItem