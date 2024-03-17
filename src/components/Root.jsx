import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


function Root() {
    return (
        <div className="">
            <Navbar />
            <Outlet />

        </div>
    )
}

export default Root;