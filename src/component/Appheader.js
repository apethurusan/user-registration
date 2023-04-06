import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
const [displayusername, displayusernameupdate] = useState("");
const [showmenu, showmenuupdateupdate] = useState(false);
const usenavigate = useNavigate();
const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/register") { //pathname:path of the UL
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem("username");
            if (username === "" || username === null) {
                usenavigate("/login");
            } else {
                displayusernameupdate(username); //To addusername into displayusername
            }
        }
    }, [location]); //pathname,search,hash
    return (
        <div>
            {showmenu && (
                <div className="header">
                    <b><Link to={"/"}>Home</Link></b>&nbsp;|&nbsp;
                    <b><Link to={"/user"}>Users</Link></b>
                    <span style={{ marginLeft: "70%" }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: "right" }} to={"/login"}>Logout</Link>
                </div>
            )}
        </div>
    );
};

export default Appheader;
