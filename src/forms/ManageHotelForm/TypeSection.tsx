import { useFormContext } from "react-hook-form";

import { HotelTypes } from "../../config/Totel-Types-config";
import { HotelFormData } from "./ManageHotelForm";

const TypesSection = () => {

    const { register, watch, formState: {errors}    } = useFormContext<HotelFormData>()
    const watchType = watch("type")
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Types</h2>
            <div className="grid grid-cols-5 gap-2 ">
                {HotelTypes.map((type) => (
                    <label
                        className={watchType === type ? "bg-blue-800 cursor-pointer px-4 py-2 rounded-full font-semibold" : "bg-blue-300 cursor-pointer px-4 py-2 rounded-full font-semibold"}
                    >
                        <input type="radio" value={type} {...register("type", {
                            required: "this field is required"
                        })}
                            className="hidden" />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 text-sm  font-bold">{errors.type.message}</span>
            )}
        </div>
    )
}
export default TypesSection;