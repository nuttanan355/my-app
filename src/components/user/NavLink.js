import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../server/firebase";
import "../../css/pages.css";
import "../../css/home.css";
import "../../css/style.css";
import { NavMenu } from "../../client/NavMenu";
import { NavMenuNoLogin } from "../../client/NavMenuNoLogin";
import { Link } from "react-router-dom";


function NavLink() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);
    return (
        <div style={{ background: "#EAEAEA" }}>
            <div className="flex-nav-home">
                {user ? (
                    <div className="item-nav-home">
                        {NavMenu.map((item, index) => {
                            return (
                                <Link className="btn nav-home" key={index} to={item.path} >

                                    <span >{item.title}</span>
                                </Link>

                            );
                        })}
                    </div>
                ) : (

                    <div className="item-nav-home">
                        {NavMenuNoLogin.map((item, index) => {
                            return (

                                <Link className="btn nav-home" key={index} to={item.path} style={{ textAlign: "center" }}>

                                    <span >{item.title}</span>
                                </Link>

                            );
                        })}
                    </div>
                )}</div>
        </div>
    )
}

export default NavLink