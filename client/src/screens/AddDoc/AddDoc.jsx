import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/authcontext";
const API_URL = import.meta.env.VITE_API_URL;


const AddDoc = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { user } = useContext(AuthContext);

    const handleAddDoc = () => {
        console.log(user.token);
        axios.post(API_URL + 'v1/docs', { title: title, desc: desc }, { headers: { 'Authorization': `Bearer ${user.token}` } }).then(res => {
            alert('Document added successfully');
        }).catch(err => {
            console.error('Failed to add document', err);
            alert('Failed to add document' + err);
        });
    }

    return (
        <div>
            <h2>Add Document</h2>

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document Title" />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Document Description"></textarea>
            <button onClick={handleAddDoc}>Add Document</button>

        </div>
    );
}

export default AddDoc;