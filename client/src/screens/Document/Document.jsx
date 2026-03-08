import { useContext, useRef } from "react";
// import { AuthContext } from "../context/authcontext";
import Editor from "../../components/Editor";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { QuillBinding } from "y-quill";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
const Document = () => {

    const Delta = Quill.import('delta');


    // Use a ref to access the quill instance directly
    const quillRef = useRef();
    const location = useLocation();
    const { document } = location.state || {};

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (!quillRef.current) return;
        const ydoc = new Y.Doc();

        const provider = new HocuspocusProvider({
            url: 'ws://localhost:1234/docs/' + document.docid,
            name: document.docid,
            document: ydoc,
            token: localStorage.getItem('token') // Ensure you are passing the token!
        });
        const ytext = ydoc.getText('quill');

        const binding = new QuillBinding(ytext, quillRef.current, provider.awareness);

        provider.on('synced', () => {
            console.log("Provider Synced! ytext length:", ytext.length);
            console.log("ytext content:", ytext.toString());
            if (quillRef.current && ytext.length > 0) {
                // quillRef.current.setContents(ytext.toDelta());
            }
        });

        ytext.observe(event => {
            console.log("ytext observed change:", event.delta);
        });

        provider.on('status', event => {
            console.log('Provider status:', event.status);
        });

        provider.on('authenticated', () => {
            console.log('Provider authenticated!');
        });

        return () => {
            binding.destroy();
            provider.destroy();
            ydoc.destroy();
        };
    }, [document.docid]);
    return (
        <div className="min-h-screen w-screen bg-white text-gray-900 flex flex-col items-center p-8">
            {/* Header */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{document.title}</h2>

            </div>

            {/* Editor Container */}
            <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <Editor ref={quillRef} />
            </div>
        </div>
    );
}
export default Document;