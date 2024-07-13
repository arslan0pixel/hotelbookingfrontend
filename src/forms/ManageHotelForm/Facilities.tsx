import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { HotelFacilities } from "../../config/Totel-Types-config"

const Facilities = ()=>{
const {register, formState:{errors}} = useFormContext<HotelFormData>()

    return(
<div>
    <h2 className="text-2xl font-bold mb-3">Facilities</h2>
    <div className="grid grid-cols-4 ">
{HotelFacilities.map((fcility)=>(
    <label className="flex text-sm gap-1">
        <input type="checkbox" value={fcility} {...register("facilities",{
            validate: (Facilities)=>{
                if (Facilities && Facilities.length >0) {
                    return true;
                }else{
                   return "al least one fcility is required"
                }
            }
        })}/>
        {fcility}

    </label>
))}

    </div>
    {errors.facilities &&(
        <span className="text-red-500 text-sm"> {errors.facilities.message}</span>
    )}
</div>
    )
}

export default Facilities;