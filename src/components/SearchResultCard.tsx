import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../Types";
import { Link } from "react-router-dom";

type Props = {
    hotel: HotelType
}

const SearchResultCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 gap-8 p-8 rounded-lg">
            <div className="w-full h-[300px]">
                <img src={hotel.imageUrls[0]} alt="img" className="w-full h-full object-cover object-center" />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
               <div>
                 <div className=" flex items-center ">
                    <span className="flex">
                        {Array.from({ length: hotel.starRating }).map(() => (
                            <AiFillStar />
                        ))}
                    </span>
                    <span className="text-xl ml-1">{hotel.type}</span>
                </div>
                <Link to={`/detail/${hotel._id}`} className="font-bold cursor-pointer text-2xl ">{hotel.name}</Link>
                </div>
               
<div><div className="line-clamp-4 ">
{hotel.description}
</div></div>

<div className="grid grid-cols-2 whitespace-nowrap items-end ">
  <div className="flex gap-1 items-center">
  {hotel.facilities.slice(0,3).map((facility)=>(
        <span className="bg-slate-300 text-black font-bold rounded-lg p-2 text-xs whitespace-nowrap">{facility}</span>
    ))}
    <span className="text-sm">
        {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
    </span>
  </div>
  <div className="flex gap-1 items-end flex-col">
    <span className="font-bold">  ${hotel.pricePerNight} per night</span>
    <Link to={`/detail/${hotel._id}`} className="max-w-fit h-full p-2 bg-blue-500 hover:bg-[#004344] font-bold text-xl">View More</Link>
  </div>
</div>
            </div>
        </div>
    )
}

export default SearchResultCard;