import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../server/firebase";
function Welcome() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            setUser(user);
        });
    }, []);

    return (
        <div>
            {user ? (
                <div className='container' style={{ background: "white", position: "relative",marginBottom:"15px" , border:"2px solid black", borderRadius:"20px" ,maxheight:"100px", maxWidth:"500px" , minWidth:"300px" }}>
                    <img src={user.photoURL} style={{ height: "80px", borderRadius: "40% 40% 0% 40%", margin:"15px" }} />
                    <a style={{fontSize:"1vw"}}> Welcome..{user.displayName} </a>
                   
                   
                </div>
            ) : ""}

        </div>
    )
}

export default Welcome