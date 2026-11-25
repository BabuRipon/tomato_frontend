import {type Dispatch, type SetStateAction} from 'react';

export interface IuserTypes {
    name: string,
    email:string,
    image?:string,
    role?:string,
    _id?:string,
}

export interface AppContextTypes {
    user: IuserTypes | null,
    loading: boolean,
    isAuth: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setIsAuth: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<IuserTypes | null>>,
    location: LocationDataTypes | null,
    locationLoading: boolean,
    city: string
}

export interface LocationDataTypes {
    latitude: number;
    longitude: number;
    formattedAddress: string;
}

export interface IRestaurantTypes {
    _id: string;
    name: string;
    description?:string;
    image: string;
    ownerId: string;
    phone: number;
    isVerified: boolean;
    autoLocation: {
        type: "Point";
        coordinates: [number, number] // [longitude, latitude];
        formattedAddress: string;
    };
    isOpen: boolean;
    createdAt: Date;
    distance?:number | string;
    distanceKm?: number | string;
}

export interface IMenuItemTypes {
    _id: string,
    restaurantId: string,
    name: string,
    description: string,
    image?: string,
    price: number,
    isAvailable: boolean,
    createdAt: Date,
    updatedAt: Date
}