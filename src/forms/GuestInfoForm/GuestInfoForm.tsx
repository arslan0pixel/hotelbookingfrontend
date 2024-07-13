import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/searchContext";
import { useAppContext } from "../../contexts/contextApp";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    pricePerNight: number;
    hotelId: string;
}
type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}
const GuestInfo = ({ pricePerNight, hotelId }: Props) => {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigateTo = useNavigate();
    const location = useLocation()
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount

        }
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setFullYear(maxDate.getFullYear() + 1)


    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("",
            data.checkIn, data.checkOut, data.adultCount, data.childCount
        );
        navigateTo("/sign-in", {state:{from: location}})

    }

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("",
            data.checkIn, data.checkOut, data.adultCount, data.childCount
        );
        navigateTo(`/add-hotel/${hotelId}/bookings`)
    }
    return (
        <div className="bg-blue-400 p-4 flex flex-col gap-4">
            <h3 className="text-md font-bold"> ${pricePerNight} Per Night </h3>
            <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                        <DatePicker required selected={checkIn} onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-In Date" className="min-w-full p-2 text-black       focus:outline-none "
                            wrapperClassName="min-w-full"
                        />
                    </div>
                    <div>
                        <DatePicker required selected={checkOut} onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-In Date" className="min-w-full p-2 text-black       focus:outline-none "
                            wrapperClassName="min-w-full"
                        />
                    </div>

                    <div>

                        <div className="flex py-1 px-2 text-black bg-white gap-2 ">
                            <label className="flex items-center">
                                Adults:
                                <input type="number" min={1} max={8} {...register("adultCount", {
                                    required: "this field is required",
                                    min: {
                                        value: 1,
                                        message: "there must be at least one adult"
                                    },
                                    valueAsNumber: true,
                                })}
                                    className="w-full focus:outline-none font-bold p-1" />
                            </label>
                            <label className="flex items-center">
                                Children:
                                <input min={0} max={5} type="number" {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                                    className="w-full focus:outline-none font-bold p-1" />
                            </label>
                            {errors.adultCount && (
                                <span className="text-red-500 font-semibold text-sm">
                                    {errors.adultCount.message}
                                </span>
                            )}
                        </div>

                    </div>
                    {isLoggedIn ? <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-800 text-xl">Book Now</button> : <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-800 text-xl">Sign in to Book</button>}
                </div>
            </form>
        </div>
    )
}

export default GuestInfo;