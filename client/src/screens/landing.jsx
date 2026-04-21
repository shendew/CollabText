import { useNavigate } from "react-router-dom";
import LandingImage from '../assets/landing.png';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen min-w-full flex flex-col">
            <div className="bg-blue-500 text-white p-2 flex justify-between items-center shadow-md"><h2 className="text-2xl font-bold flex-none">ColDoc</h2> <button onClick={() => navigate('/login')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded">
                Login
            </button></div>
            <div className="min-w-full bg-white text-gray-900 grid grid-cols-1 md:grid-cols-2 items-center p-8 flex-1">
                <div className="left h-full w-3/5 flex flex-col text-start justify-center">

                    <h2 className="text-3xl font-bold mb-4">Where ideas turn into finished work.</h2>
                    <p className="text-lg mb-8">Stop jumping between tabs and hunting for the latest version. Create a seamless collaboration experience for your team.</p>
                    <button onClick={() => navigate('/register')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
                        Get Started
                    </button>
                </div>
                <div className="right flex flex-col items-center">


                    <img src={LandingImage} className="w-full max-h-full overflow-hidden object-contain" alt="Collaboration Illustration" />
                </div>
            </div>
            <h2 className="text-sm text-gray-500 text-center flex-none bg-white pb-3">by shendew</h2>

        </div>)
}
export default Landing;