import { HotelTypes } from "../config/Totel-Types-config";

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const HotelTypeFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="pb-5 border-b border-slate-300 ">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {HotelTypes.map((hotelType) => (
                <label className="flex items-center  space-x-2" >
                    <input type="checkbox" className="rounded" value={hotelType} checked={selectedHotelTypes.includes(hotelType)} onChange={onChange} />
                    <span>{hotelType}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypeFilter;