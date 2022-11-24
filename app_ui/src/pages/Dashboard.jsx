import { useEffect } from "react";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, getIsAdmin } from "../services/firebase";
import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";
import AdminWorkspace from "../components/AdminWorkspace";
import Reupload from "../components/reupload";

export default function Dashboard() {
    const history = useNavigate();
    const userExists = localStorage.getItem('authUser');
    const { user } = useContext(UserContext);

    const [admin, setAdmin] = useState(false);

    const [reupload, setReupload] = useState(null)

    const [userDocuments, setUserDocuments] = useState()
    // console.log((userDocuments))
    useEffect(() => {
        document.title = 'Dashboard';
        // console.log(userExists);
        // if (!userExists) {
        //     history("/login")
        // }

        const getDocuments = async () => {
            const res = await getDocs(user.uid);
            setUserDocuments(res)
            // console.log(res)
        }

        const checkAdmin = async () => {
            const res = await getIsAdmin(user.uid)
            setAdmin(res);
        }

        if (user) {
            checkAdmin();
            getDocuments();
        }
    }, [user, admin, reupload]);

    return (
        <div className="bg-gray-background">
            <Header />
            {!userExists ?
                <div className="flex justify-center text-2xl text-gray-base">
                    <p className="text-center"><Link to="/login"><span className="text-blue-500 cursor-pointer">Login</span></Link> to your existing account <br />or<br /> <Link to="/signup"><span className="text-blue-500 cursor-pointer">SignUp</span></Link> to Create a New one to see your Dashboard</p>
                </div>
                : !admin ?
                    <div className="grid grid-cols-3 gap-4 gap-y-8 justify-between mx-auto max-w-screen-lg">
                        {userDocuments?.map((doc) => (
                            <div key={doc.docId} className="flex flex-col items-center gap-4 relative cursor-pointer" >
                                <div className="flex flex-col items-center gap-4 cursor-pointer" onClick={() => history(`/docs/${doc.id}`)}>
                                    {doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "jpg" ? <img src="/images/icons/jpg.png" className="w-1/4" />
                                        : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "txt" ? <img src="/images/icons/txt.png" className="w-1/4" />
                                            : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "pdf" ? <img src="/images/icons/pdf.png" className="w-1/4" />
                                                : <img src="/images/icons/file.png" className="w-1/4" />
                                    }
                                    {doc.caption}
                                </div>
                                {!doc?.discarded ?
                                    <p className="absolute top-0 left-8 bg-green-100  rounded-r-lg px-4 py-1 text-sm font-semibold">{doc.class}</p>
                                    :
                                    <p className="absolute text-2xl bg-gray-400 opacity-75 px-4 rounded-md text-red-600 font-bold -rotate-45 top-10">Discarded</p>
                                }
                                {doc?.discarded &&
                                    <button className="border-2 px-8 py-2 rounded-md border-black text-red-500 bg-gray-200 font-semibold" onClick={() => setReupload(
                                        { id: doc.id, docId: doc.docId, userId: user.uid }
                                    )}>
                                        Re-Upload
                                    </button>
                                }

                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        <AdminWorkspace />
                    </div>
            }
            {reupload && <Reupload id={reupload.id} docId={reupload.docId} userId={reupload.userId} setReupload={setReupload} />}
        </div>
    )
}