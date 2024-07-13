
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
interface props{
    children: React.ReactNode;
}
export const Layout = ({children}: props) => {
   
    return (
        <div className='flex flex-col min-h-screen bg-slate-900'>
            <Header />
            <Hero/>
            <div className='container mx-auto'>
                <SearchBar/>
            </div>
            <div className='container text-white mx-auto py-4 flex-1'>
{children}
            </div>
            <Footer/>
        </div>
    );
};
