import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/contextApp";
import SignOut from "./SingOut";

const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className='py-6 text-white bg-[#004d] '>
            <div className="container flex justify-between mx-auto">
                <span className='text-3xl font-bold text-white tracking-tight '> <Link to="/">MernHolidays.Com</Link> </span>
                <span className='flex space-x-2 '>
                    {isLoggedIn ? <>
                        <Link className=" hover:bg-gray-400  flex items-center font-bold rounded-md px-3" to="/my-bookings">My Bookings</Link>
                        <Link className=" hover:bg-gray-400  flex items-center font-bold rounded-md px-3" to="/my-hotels">My Hotels</Link>
                        <SignOut/>
                    </> : <Link className="bg-white hover:bg-gray-400 text-[#004D] flex items-center font-bold rounded-md px-3" to="/sign-in">SignIn</Link>}
                </span>
            </div>
        </div>
    );
};

export default Header