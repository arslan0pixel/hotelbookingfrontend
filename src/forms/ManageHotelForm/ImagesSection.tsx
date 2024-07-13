import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>()
const PrevImageUrls = watch("imageUrls") || [];

const handleDelete =(event: React.MouseEvent<HTMLButtonElement,MouseEvent>, imageUrl:string)=>{
event.preventDefault();
setValue("imageUrls", PrevImageUrls.filter((url)=>url !==imageUrl))
}
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border border-blue-700 rounded flex flex-col p-4 gap-4">

{ PrevImageUrls.length > 0 &&(
    <div  className="grid grid-cols-6 gap-4 ">
{PrevImageUrls.map((prevImage, index )=>(
    <div key={index} className="relative group">
        <img src={prevImage} className="min-h-full object-cover"/>
        <button onClick={(event)=>handleDelete(event,prevImage)} className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50  opacity-0 group-hover:opacity-100 text-white ">Delete</button>
    </div>
))}
    </div>
)}

                <input type="file"
                multiple
                className="w-full font-normal"
                accept="image/*"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const imageFilesLength = imageFiles.length +(PrevImageUrls?.length || 0);
                            if (imageFilesLength === 0) {
                                return " at least one image file required"
                            }
                            if (imageFilesLength > 6) {
                                return " number of images cannot exceed 6 images"
                            }
                            return true;
                        }
                    
             })} />
            </div>
            {errors.imageFiles&& (
                <span className="text-red-600 font-sm">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}

export default ImagesSection;