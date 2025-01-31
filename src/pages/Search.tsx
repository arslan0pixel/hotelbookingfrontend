import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/searchContext"
import * as apiClient from "../Api-Client"
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StatRatingFilter";
import HotelTypeFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
const Search = () => {
    const search = useSearchContext();

    const [page, setPage] = useState<number>(1)
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
    const [selectedFacilities, setselectedFacilities] = useState<string[]>([])
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>()
    const [sortOption, setSortOption] = useState<string>("")
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,

    }
    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) =>
            event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star != starRating)
        )
    }

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prevHotelType) =>
            event.target.checked ? [...prevHotelType, hotelType] : prevHotelType.filter((HotelType) => HotelType != hotelType)
        )
    }

    const handleFacilities = (event: React.ChangeEvent<HTMLInputElement>) => {
        const Facility = event.target.value;
        setselectedFacilities((prevFacility) =>
            event.target.checked ? [...prevFacility, Facility] : prevFacility.filter((facility) => facility != Facility)
        )
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-400 p-5 h-fit sticky  top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>

                    {/* TODO FILTER */}
                    <StarRatingFilter onChange={handleStarsChange} selectedStars={selectedStars} />
                    <HotelTypeFilter onChange={handleHotelTypeChange} selectedHotelTypes={selectedHotelTypes} />
                    <FacilitiesFilter onChange={handleFacilities} selectedFacilities={selectedFacilities} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>

            </div>

            <div className="flex flex-col gap-5 ">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold ">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* sort options */}
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 rounded-md bg-black border">
                        
                        <option  value="">Sort By</option>
                        <option  value="starRating"> Star Rating</option>
                        <option  value="pricePerNightAsc">Price Per Night(low to high)</option>
                        <option  value="pricePerNightDesc">Price Per Night(high to low)</option>
                    </select>
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;