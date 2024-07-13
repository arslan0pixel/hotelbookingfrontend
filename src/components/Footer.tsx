import { Link } from "react-router-dom"

const Footer =()=>{
    return(
        <div className="bg-[#004d]  py-6 text-white">
<div className="container mx-auto flex justify-between items-center " >
      <span className="text-3xl font-bold tracking-tighter">
      <Link to={"/"}>MeryHolidays.com</Link>
      </span>
      <span className="flex font-bold tracking-tight gap-4 ">
        <p className="cursor-pointer">Privacy Policy</p>
        <p className="cursor-pointer">Terms Of Service</p>
      </span>
     </div>
        </div>
    )
}
export default Footer