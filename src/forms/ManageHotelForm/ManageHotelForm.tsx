import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypeSection";
import Facilities from "./Facilities";
import GuestsSection from "./GuestsSection";
import { HotelType } from "../../Types"; 
import { useEffect } from "react";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[]
}

type props = {
    hotel?: HotelType;
    onSave: (HotelFormData: FormData) => void
    isLoading: boolean
}
const ManageHotelForm = ({ onSave, isLoading, hotel }: props) => {
    const formMethods = useForm<HotelFormData>()
    const { handleSubmit, reset } = formMethods;

    useEffect(()=>{
        reset(hotel);
    },[hotel, reset])
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        console.log(formDataJson)    
        const formData = new FormData();
        if (hotel) {
           formData.append("hotelId", hotel._id) 
        }  
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        })
if (formDataJson.imageUrls) {
   formDataJson.imageUrls.forEach((url, index)=>{
    formData.append(`imageUrls[${index}]`,url)
   })
}
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile)
        })
        onSave(formData);
    })
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10"
                onSubmit={onSubmit}>
                <DetailsSection />
                <TypesSection />
                <Facilities />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button type="submit" className="bg-[#2a7899bc] text-white p-2 rounded font-bold hover:bg-[#009D] disabled:bg-gray-500" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}

                    </button>
                </span>
            </form>
        </FormProvider>
    )
}
export default ManageHotelForm;