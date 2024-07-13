import { useMutation } from "react-query";
import { useAppContext } from "../contexts/contextApp";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../Api-Client"

const AddHotel = () => {

    const {showToast} = useAppContext();
    const {mutate, isLoading} = useMutation(apiClient.addMyHotel,{
onSuccess:()=>{
    showToast({message: "Hotel added", type:"SUCCESS"})
},
onError:()=>{
    showToast({message:"cant save hotel", type:"ERROR"})
}
    })

    const handleSave=(HotelFormData: FormData)=>{
mutate(HotelFormData)
    }
    return (
<ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    )
}

export default AddHotel;