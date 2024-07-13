import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/searchContext"
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
    const navigateTo = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
    const [adultCount, setAdultCount] = useState<number>(search.adultCount)
    const [childCount, setChildCount] = useState<number>(search.childCount)

const minDate = new Date();
const maxDate = new Date();

maxDate.setFullYear(maxDate.getFullYear() + 1)
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount)

navigateTo("/search")
    }
    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 rounded bg-orange-600 shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-5 ">
            <div className="flex flex-row flex-1 items-center bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input value={destination} className="text-md focus:outline-none text-md"
                    onChange={(event) => setDestination(event.target.value)}
                    placeholder="Where are you going?"
                />
            </div>
            {/* ///adultCount */}
            <div className="flex py-1 px-2 bg-white gap-5 ">
                <label className="flex  items-center">
                    Adults:
                    <input type="number" onChange={(event) => setAdultCount(parseInt(event.target.value))}
                        min={1}
                        max={10}
                        value={adultCount}
                        className="w-full focus:outline-none font-bold p-1" />
                </label>
                <label className="flex items-center">
                    Children:
                    <input type="number" onChange={(event) => setChildCount(parseInt(event.target.value))}
                        min={0}
                        max={10}
                        value={childCount}
                        className="w-full focus:outline-none font-bold p-1" />
                </label>
               
            </div>
            {/* datePickers */}
            <div>
             <DatePicker selected={checkIn} onChange={(date)=> setCheckIn(date as Date)}
                selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-In Date" className="min-w-full p-2 bg-white focus:outline-none "
                wrapperClassName="min-w-full"
                
                />   
            </div>

            <div>
             <DatePicker selected={checkOut} onChange={(date)=> setCheckOut(date as Date)}
                selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} placeholderText="Check-In Date" className="min-w-full p-2 bg-white focus:outline-none "
                wrapperClassName="min-w-full"
                />   
            </div>
<div className="flex gap-1">
    <button className="w-2/3 bg-blue-500 text-white p-2 h-full text-xl hover:bg-blue-700">Search</button>
    <button className="w-2/3 bg-red-700 text-white p-2 h-full text-xl hover:bg-red-900">Clear</button>
</div>
         </form>
    )
}
export default SearchBar;