import { useRef, useState, useContext, useEffect } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase";
import FirebaseContext from "../context/firebase";
import { toast } from "react-toastify";

export default function AdminPreview({ setView, docSrc }) {
    const [caption, setCaption] = useState(null);

    // console.log('res', docSrc)
    const imageInput = useRef(null);
    const [document, setDocument] = useState(null);
    const [docId, setDocId] = useState(null);

    return (
        <div className="absolute top-0 h-full w-full flex justify-center items-center bg-gray-200/50 z-20">
            <div className="relative w-4/5 mobiles:w-3/4 text-center flex-col justify-center items-center bg-white py-4 rounded-2xl ">
                <div className="pb-4 border-b-2 w-full">
                    <p
                        className="text-xl font-bold px-10"
                    >Preview</p>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute right-4 top-4"
                        onClick={() => setView(false)}
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <iframe src={docSrc} className="w-full h-[70vh] px-4 py-4" />
            </div>
        </div>
    )
}