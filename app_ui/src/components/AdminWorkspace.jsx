import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { classes } from "../helpers/classes";
import AdminPreview from "./filePreview";
import { discardDocument, getUnclassifiedDocs, updateClass } from "../services/firebase"

export default function AdminWorkspace() {
    const history = useNavigate();
    const [unclassifiedDocuments, setUnclassifiedDocuments] = useState()
    const [reload, setReload] = useState(false)

    const [view, setView] = useState(false)
    const [docSrc, setDocSrc] = useState(null)

    const classNames = classes;

    const handleClassify = async (docId, name) => {
        await updateClass(docId, name)
        toast.success("Classified Successfully!")
        setReload((reload) => !reload);
    }

    const handleDiscard = async (docId) => {
        await discardDocument(docId)
        toast.warning("Discarded Successfully")
        setReload((reload) => !reload);
    }

    useEffect(() => {

        const getDocuments = async () => {
            const res = await getUnclassifiedDocs()
            setUnclassifiedDocuments(res);

        }
        getDocuments();
    }, [reload])

    return (
        <div className="pb-24">
            <div className="grid grid-cols-3 gap-4 gap-y-8 justify-between mx-auto max-w-screen-lg">
                {unclassifiedDocuments?.map((doc) => (
                    <div className="flex flex-col items-center gap-4 relative cursor-pointer" onClick={() => { setView(true); setDocSrc(doc.docSrc); }}>
                        {doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "jpg" ? <img src="/images/icons/jpg.png" className="w-1/4" />
                            : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "txt" ? <img src="/images/icons/txt.png" className="w-1/4" />
                                : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "pdf" ? <img src="/images/icons/pdf.png" className="w-1/4" />
                                    : <img src="/images/icons/file.png" className="w-1/4" />
                        }
                        {doc.caption}
                        <p className="absolute top-0 left-8 bg-green-100  rounded-r-lg px-4 py-1 text-sm font-semibold">{doc.class}</p>
                        {!doc?.discarded &&
                            <div className="flex flex-col gap-y-2   ">
                                <div class="dropdown inline-block relative group">
                                    <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-2 w-full rounded flex justify-center items-center relative">
                                        <span class="mr-1">Classify</span>
                                        <svg class="fill-current h-4 w-4 absolute right-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                                    </button>
                                    <ul class="dropdown-menu absolute group-hover:block hidden text-gray-700 pt-1 z-[2]">
                                        {classNames.map((name) =>
                                            <li class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 w-full px-10 block whitespace-no-wrap" onClick={() => handleClassify(doc.id, name)}>{name}</li>
                                        )
                                        }
                                    </ul>
                                </div>
                                <button className="border-2 border-black px-14 rounded-md py-2 text-red-600 font-semibold" onClick={() => handleDiscard(doc.id)}>Discard</button>
                            </div>
                        }
                        {doc.discarded &&
                            <p className="absolute text-2xl bg-gray-400 opacity-75 px-4 rounded-md text-red-600 font-bold -rotate-45 top-10">DISCARDED</p>
                        }

                    </div>
                ))}
                {view && <AdminPreview setView={setView} docSrc={docSrc} />}
            </div>
        </div>
    )
}