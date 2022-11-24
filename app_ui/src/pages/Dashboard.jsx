import { useEffect } from "react";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { getDocs } from "../services/firebase";
import { useContext } from "react";
import UserContext from "../context/user";
import { useState } from "react";

export default function Dashboard() {
    const history = useNavigate();
    const userExists = localStorage.getItem('authUser');
    const { user } = useContext(UserContext);

    const [userDocuments, setUserDocuments] = useState()
    // console.log((user.uid))
    useEffect(() => {
        document.title = 'Dashboard';
        // console.log(userExists);
        // if (!userExists) {
        //     history("/login")
        // }

        const getDocuments = async () => {
            const res = await getDocs(user.uid);
            setUserDocuments(res)
            console.log(res)
        }
        if (user) {
            getDocuments();
        }
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            {userExists ?
                <div className="grid grid-cols-3 gap-4 gap-y-8 justify-between mx-auto max-w-screen-lg">
                    {userDocuments?.map((doc) => (
                        <div className="flex flex-col items-center gap-4 relative cursor-pointer" onClick={() => history(`/docs/${doc.docId}`)}>
                            {doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "jpg" ? <img src="/images/icons/jpg.png" className="w-1/4" />
                                : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "txt" ? <img src="/images/icons/txt.png" className="w-1/4" />
                                    : doc.caption.substring(doc.caption.lastIndexOf('.') + 1) === "pdf" ? <img src="/images/icons/pdf.png" className="w-1/4" />
                                        : <img src="/images/icons/file.png" className="w-1/4" />
                            }
                            {doc.caption}
                            <p className="absolute top-0 left-8 bg-green-100  rounded-r-lg px-4 py-1 text-sm font-semibold">{doc.class}</p>
                        </div>
                    ))}
                </div>
                :
                <div className="flex justify-center text-2xl text-gray-base">
                    <p className="text-center"><Link to="/login"><span className="text-blue-500 cursor-pointer">Login</span></Link> to your existing account <br />or<br /> <Link to="/signup"><span className="text-blue-500 cursor-pointer">SignUp</span></Link> to Create a New one to see your Dashboard</p>
                </div>
            }
        </div>
    )
}