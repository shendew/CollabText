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
    const [permittedDocs, setPermittedDocs] = useState([]);
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + 'v1/docs', { headers: { 'Authorization': `Bearer ${user.token}` } }).then(res => {
            setDocs(res.data.docs)
            console.log(res.data.docs);
        });

        axios.get(API_URL + 'v1/docs/permitted', { headers: { 'Authorization': `Bearer ${user.token}` } }).then(res => {
            console.log("Permitted docs:", res.data.docs);
            setPermittedDocs(res.data.docs)
        })

    }, []);
    return (
        <div className="min-h-screen min-w-full bg-white text-gray-900 flex flex-col items-center">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-2 bg-blue-500 p-2">

                <h2 className="text-2xl font-bold">Collab</h2>
                <div className="">
                    <button onClick={() => navigate('/adddoc')}><p className="text-blue-500 bg-white hover:text-white hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium mr-5">Add doc</p></button>
                    <button
                        onClick={logout}
                        className="text-white bg-red-700 hover:bg-red-900 px-4 py-2 rounded text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>


            <div className="flex-1 grid w-screen grid-cols-4 grid-rows-auto gap-2 p-4">

                <div className="left-panel flex flex-col items-start pt-5">
                    <input type="text" className="w-2/3 p-2 rounded-xl bg-gray-200" name="" id="" placeholder="Search document.." />
                </div>
                <div className="center-panel col-span-2  flex-1 flex flex-col">
                    <h2 className="font-semibold mb-5">Recent Documents</h2>

                    <div className="col-span-2 h-full grid grid-cols-4 grid-rows-auto gap-2">

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
                </div>
                <div className="right-panel">
                    <h2 className="font-semibold mb-5">Permitted Documents</h2>
                    {
                        permittedDocs?.length > 0 ? (
                            permittedDocs.map((doc) => (
                                <div className="w-full h-auto m-1 p-2 bg-gray-50 border border-gray-300 rounded-md shadow-md text-left cursor-pointer flex flex-col justify-end" key={doc.docid} onClick={(e) => navigate(`/doc/${doc.docid}`, { state: { document: doc } })}>
                                    <h3 className="text-lg ">{doc.title}</h3>
                                    <p className="text-base text-gray-500">{doc.ownerName}</p>
                                </div>
                            ))
                        ) : (
                            <p>No documents found.</p>
                        )
                    }
                </div>

            </div>



        </div>
    );
}
export default Dashboard;