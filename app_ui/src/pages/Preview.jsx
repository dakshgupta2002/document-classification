import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header";
import UserContext from "../context/user";
import { getDocumentByDocId } from "../services/firebase";

export default function Preview() {
    const { docId } = useParams();
    // console.log(docId)
    const [documentInfo, setDocumentInfo] = useState()

    const { user } = useContext(UserContext);

    useEffect(() => {
        const getDocument = async () => {
            const res = await getDocumentByDocId(docId);
            // console.log(res);
            setDocumentInfo(res);
            console.log(res)
        }
        if (user) {
            getDocument();
        }


    }, [])

    return (
        <div className="pb-24 relative" style={{
            background: "linear-gradient(199.24deg, #6A1B9A -11.59%, #9C27B0 153.3%)",
            backgroundRepeat: "no-repeat", /* Do not repeat the image */
            backgroundSize: "cover", /* Resize the background image to cover the entire container */
            backgroundImage: "url('/images/bg1.jpg')",
            backgroundPosition: "center", /* Center the image */
        }}>
            <Header />
            <div className="text-center flex justify-center">
                <h1 className="text-4xl py-6">Result</h1>
            </div>
            <div className="px-24 grid grid-cols-2 gap-x-4">
                <div className="flex flex-col items-center">
                    {documentInfo &&
                        <iframe src={documentInfo?.docSrc}
                            width="100%"
                            // height="100%"
                            className="h-[80vh] "
                        >
                        </iframe>}
                    <a href={"#"} download='searchable_pdf.pdf' target="_blank" className="pt-2"><button className="bg-primary-blue text-white rounded-md px-8 py-2">Download OCR Searchable PDF</button></a>
                </div>
                <div>
                    <div className="px-4 overflow-scroll h-[80vh] border-2 py-4 bg-off-white rounded-lg shadow-xl" style={{
                        scrollbarWidth: '0'
                    }}>
                        {/* {ocrResult[pgnum]?.ParsedText &&
                            <pre>{ocrResult[pgnum].ParsedText}</pre>
                        } */}
                    </div>
                </div>
            </div>

        </div>
    )
}