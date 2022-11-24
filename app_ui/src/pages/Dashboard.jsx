import { useEffect } from "react";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
    const history = useNavigate();
    const userExists = localStorage.getItem('authUser');

    useEffect(() => {
        document.title = 'Dashboard';
        // console.log(userExists);
        // if (!userExists) {
        //     history("/login")
        // }
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            {userExists ?
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    Hello
                </div>
                :
                <div className="flex justify-center text-2xl text-gray-base">
                    <p className="text-center"><Link to="/login"><span className="text-blue-500 cursor-pointer">Login</span></Link> to your existing account <br />or<br /> <Link to="/signup"><span className="text-blue-500 cursor-pointer">SignUp</span></Link> to Create a New one to see your Dashboard</p>
                </div>
            }
        </div>
    )
}