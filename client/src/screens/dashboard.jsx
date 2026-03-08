import { useContext, useRef } from "react";
import { AuthContext } from "../context/authcontext";
import '../App.css';
import './Dashboard.css';
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


const Dashboard = () => {
    const [docs, setDocs] = useState([]);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + 'v1/docs', { headers: { 'Authorization': `Bearer ${user.token}` } }).then(res => {
            setDocs(res.data.docs)
            console.log(res.data.docs);
        });

    }, []);
    return (
        <div className="min-h-screen min-w-full bg-white text-gray-900 flex flex-col items-center">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6 bg-blue-100 p-4">
                <h2 className="text-2xl font-bold">Collab</h2>
                <div className="">
                    <button onClick={() => navigate('/adddoc')}><p className="text-blue-500 hover:text-white hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium mr-5">Add doc</p></button>
                    <button
                        onClick={logout}
                        className="text-white bg-blue-700 hover:bg-blue-900 px-4 py-2 rounded text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <h2>Recent Documents</h2>

            <div className="h-screen grid w-screen grid-cols-4 grid-rows-auto gap-2 p-4">

                <div className="left-panel flex flex-col items-start">
                    <input type="text" className="w-2/3 p-2 rounded-2xl bg-gray-200" name="" id="" placeholder="Search document.." />
                </div>
                <div className="center-panel col-span-2 h-full grid grid-cols-4 grid-rows-auto gap-2">

                    {
                        docs?.length > 0 ? (
                            docs.map((doc) => (
                                <div className="w-full h-2/8 m-1 p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-md text-left cursor-pointer flex flex-col justify-end" key={doc.docid} onClick={(e) => navigate(`/doc/${doc.docid}`, { state: { document: doc } })}>
                                    <h3 className="text-lg font-semibold">{doc.title}</h3>
                                    <p className="text-base text-gray-500">{doc.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No documents found.</p>
                        )
                    }
                </div>
                <div className="right-panel">
                    Permitted Documents
                </div>

            </div>



        </div>
    );
}
export default Dashboard;