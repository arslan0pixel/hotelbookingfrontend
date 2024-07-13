import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5  bg-[#0087]">
                <label className="text-sm font-semibold " >
                    Adults
                    <input className="border  bg-blue-800 rounded py-2 font-normal px-3 w-full" type="number"
                        min={1}
                        {...register("adultCount", {
                            required: "this field is required"
                        })}
                    />
                    {errors.adultCount?.message && (
                        <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
                    )}
                </label>

                <label className="text-sm font-semibold " >
                    Childs
                    <input className="border bg-blue-800 rounded py-2 font-normal px-3 w-full" type="number"
                        min={0}
                        {...register("childCount", {
                            required: "this field is required"
                        })}
                    />
                    {errors.childCount?.message && (
                        <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
                    )}
                </label>

            </div>
        </div>
    )
}

export default GuestsSection;