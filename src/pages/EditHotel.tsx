import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient  from "../Api-Client"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/contextApp";
const EditHotel = ()=>{
const {hotelId} = useParams();
const {showToast} = useAppContext()
const {data:hotel} = useQuery("fetchMyHotelById",()=> apiClient.fetchMyHotelById(hotelId|| ''),{
    enabled: !!hotelId
});

const {mutate, isLoading} = useMutation(apiClient.updatePyHotelById,{
    onSuccess:()=>{
showToast({message: "Hotel Saved!", type:"SUCCESS"})
    },
    onError:(error:Error)=>{
  showToast({message:error.message, type:"ERROR"})
    }
})

const handleSave = (HotelFormData:FormData)=>{
    mutate(HotelFormData)
}

return <ManageHotelForm isLoading={isLoading} onSave={handleSave} hotel={hotel}/>
}

export default EditHotel;


