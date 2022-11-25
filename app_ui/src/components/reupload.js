import { useRef, useState, useContext, useEffect } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase";
import FirebaseContext from "../context/firebase";
import { toast } from "react-toastify";
import axios from "axios";
import { reUpdateDocument, updateClass } from "../services/firebase";

export default function Reupload({ id, docId, userId, setReupload }) {
    let caption = "temp";

    const imageInput = useRef(null);
    const [document, setDocument] = useState(null);
    const { firebase } = useContext(FirebaseContext)

    console.log(id)

    const getImage = () => {
        imageInput.current.click();
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',').pop());
        reader.onerror = error => reject(error);
    });

    const handlePost = async () => {
        if (document == null || docId == null) {
            toast.error("Please select a document!");
            return;
        };
        const imageRef = ref(storage, `${userId}/${docId}`)

        const b64 = await toBase64(document)

        await axios.post("http://localhost:8000/classify/pdf", { filename: document.name, b64: b64 }).then(
            res => (
                uploadBytes(imageRef, document).then(async () => {
                    console.log(res)
                    await updateClass(id, res.data.text)
                    await reUpdateDocument(id)
                    setReupload(null)
                    toast.success('Document Re-uploaded');
                })
            )
        )
    }


    return (
        <div className="absolute top-0 h-full w-full flex justify-center items-center bg-gray-200/50 z-20">
            <div className="relative w-2/5 mobiles:w-3/4 text-center flex-col justify-center items-center bg-white py-4 rounded-2xl ">
                <div className="pb-4 border-b-2 w-full">
                    <p
                        className="text-xl font-bold px-10"
                    >Reupload Document</p>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute right-4 top-4"
                        onClick={() => setReupload(null)}
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex flex-col items-center my-4 mx-4">
                    {!document ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-28 text-gray-base my-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ) : !(document.name.substring(document.name.lastIndexOf('.') + 1) === "jpg" | document.name.substring(document.name.lastIndexOf('.') + 1) === "png") ? (
                        <iframe
                            src={URL.createObjectURL(document)}
                            width="100%"
                            // height="100%"
                            className="mb-4 h-80"

                        />
                    ) : (
                        <img
                            src={URL.createObjectURL(document)}
                            className="mb-4"
                        />
                    )
                    }

                    <button
                        className="bg-blue-500 text-white px-5 py-2 rounded-md mb-8"
                        onClick={getImage}
                    >
                        Select a Document
                    </button>

                    <input type="file" className="hidden" ref={imageInput} onChange={(event) => { setDocument(event.target.files[0]); }} />
                    <button
                        className={`text-lg font-bold text-blue-medium `}
                        type="button"
                        // disabled={comment.length < 1}
                        onClick={handlePost}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}