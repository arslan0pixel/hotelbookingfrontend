import { HotelType } from "../../../backend/src/shared/types";

type Props={
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
}

const BookingDetailSummary = ({checkIn, checkOut, adultCount, childCount,numberOfNights,  hotel}:Props)=>{
    return(
       <div className="grid gap-4 rounded-lg border border-slate-300 h-fit p-5 ">
        <h2 className="font-bold text-xl"> Your Booking Details</h2>
        <div className="border-b py-2">
            Location:
            <div className="font-bold">{`${hotel.name} ${hotel.city} ${hotel.country}`}</div>
            <div className="flex justify-between">
                <div>
                    CheckIn:
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    CheckOut:
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>

            </div>

            <div className="border-b border-t py-2">
Total length of stay:
<div className="font-bold">{numberOfNights} nights</div>
            </div>
        
            <div className="">
    Guests:
    <div className="font-bold">{adultCount} adults & {childCount} childs</div>
</div>

        </div>
       </div>
    )
}

export default BookingDetailSummary;