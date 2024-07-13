import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: {
        errors
    }, } = useFormContext<HotelFormData>()
    return (
        <div className="flex flex-col gap-5 ">
            <h1 className="text-3xl font-bold mb-3"></h1>
            <label className="flex-1  font-bold text-sm ">
                Name
                <input
                    type="text"
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("name", { required: "this field is required" })}
                ></input>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>
            <div className="flex gap-5 ">
            <label className="flex-1  font-bold text-sm ">
                City
                <input
                    type="text"
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("city", { required: "this field is required" })}
                ></input>
                {errors.city && (
                    <span className="text-red-500">{errors.city.message}</span>
                )}
            </label>
            <label className="flex-1  font-bold text-sm ">
                Country
                <input
                    type="text"
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("country", { required: "this field is required" })}
                ></input>
                {errors.country && (
                    <span className="text-red-500">{errors.country.message}</span>
                )}
            </label>
            </div>
            <label className="flex-1  font-bold text-sm ">
                Description
                <textarea
                    rows={10}
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("description", { required: "this field is required" })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="max-w-[50%] font-bold text-sm ">
                Price Per Night
                <input
                   type="number"
                   min={1}
                    className="text-normal bg-gray-700 px-2 py-1 border rounded w-full"
                    {...register("pricePerNight", { required: "this field is required" })}
                ></input>
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>
            
            <label className="max-w-[50%] font-bold text-sm ">
                Star Rating
                <select  
               {...register("starRating", { required: "this field is required" })} 
             className="font-normal bg-gray-700 px-2 py-1 border rounded w-full"
                >
                    <option className="text-sm font-bold" >Select Rating</option>
                    {
                        [1,2,3,4,5].map((num, index)=>(
                            <option key={index} value={num}>{num}</option>
                        ))
                    }
                  
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>

           
        </div>
    )
}
export default DetailsSection;