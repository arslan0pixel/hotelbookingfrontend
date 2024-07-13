import { userRegisterData } from "./pages/Register";
import { signInFormData } from "./pages/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import {HotelSearchResponse, HotelType, PaymentIntentResponse} from  "../../backend/src/shared/types"
import {UserType} from "../../backend/src/shared/types"
import { BookingFormData } from "./forms/BookingForm/BookingForm";

export const fetchCurrentUser = async():Promise<UserType>=>{
    const response = await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:"include",
    })
    if (!response.ok) {
        throw new Error("error fetching current user")
    }
    return response.json()
}

export const register = async (formData: userRegisterData) => {

    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

}

export const signIn = async (fromData: signInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData)
    })

    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    return responseBody;
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {

        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Token is not valid")
    }
    return response.json();
}


export const signOut = async()=>{
const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
    credentials: "include",
    method:"Post",

})
if(!response.ok){
    throw new Error("Unable to logOut")
}
}


export const addMyHotel =async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials: "include",
        body: hotelFormData
    })

    if (!response.ok) {
        throw new Error("unable to add hotel")
    }
    return response.json()
};

export const fetchMyHotels = async(): Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: "include",
    })

    if (!response.ok) {
       throw new Error("Error fetching hotels") 
    }

    return response.json();
}

export const fetchMyHotelById = async(hotelId:string):Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials:"include"
    })
    

    if (!response.ok) {
        throw new Error("Error fetching hotels") 
    }

    return response.json()
}

export const updatePyHotelById = async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
{
    method: "PUT",
    body: hotelFormData,
    credentials: "include"
});

if (!response.ok) {
    throw new Error("failed to update hotel")
}

return response.json()
}



type SearchParams ={
    destination: string;
    checkIn:string;
    checkOut:string;
    adultCount:string;
    childCount:string;
    page:string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string;

}

export const searchHotels = async(searchParams: SearchParams):Promise<HotelSearchResponse>=>{
 const queryParams  = new  URLSearchParams();
 queryParams.append("destination", searchParams.destination || "")
 queryParams.append("checkIn", searchParams.checkIn || "")
 queryParams.append("checkOut", searchParams.checkOut || "")
 queryParams.append("adultCount", searchParams.adultCount || "")
 queryParams.append("childCount", searchParams.childCount|| "")
 queryParams.append("page", searchParams.page|| "")


queryParams.append("maxPrice", searchParams.maxPrice || "")
queryParams.append("sortOption", searchParams.sortOption || "")

searchParams.facilities?.forEach((facility)=>(
    queryParams.append("facilities", facility)
));
searchParams.stars?.forEach((star)=>(
    queryParams.append("stars", star)
))
searchParams.types?.forEach((type)=>(
    queryParams.append("types", type)
))

 const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

 if (!response.ok) {
    throw new Error("error fetching hotels")
 }

 return response.json();
}

export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return response.json();
  };


export const fetchHotelbyId = async(hotelId:string):Promise<HotelType> =>{
const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

if (!response.ok) {
    throw new Error("Error fetching Hotel")
}

return response.json();
}

export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };
// export const createPaymentIntet = async(hotelId:string, numberOfnights:string):Promise<PaymentIntentResponse>=>{
// const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
//     credentials:"include",
//     method:"POST",
//     body:JSON.stringify({numberOfnights}),
//     headers:{
// "Content-Type": "application/json"
//     }
// })
// if (!response.ok) {
//     throw new Error("error fetching payment intent")
// }
// return response.json()
// }

export const createBookingRoom = async(formData: BookingFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
        credentials:"include",
        body:JSON.stringify(formData)
    });

    if (!response.ok) {
       throw new Error ("Error Booking Hotel Room") 
    }
}

export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };