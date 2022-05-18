import { firebaseAuth, firebase, firebaseDB } from "../../server/firebase";
import React from 'react';
import '../../css/profile.css';




function ProfileUser(){







    return(
    <div className="container emp-profile" style={{backgroundColor: "lightblue"}} >
            <form method="post">
                <div className="row" >
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    
                                    <h1>Your Profile</h1>
                                    
                                            <h6>
                                                Name:
                                            </h6>
                                    <input 
                                            class="#" type="text"
                                            value="ThiS IS for user.display" >

                                    </input>
                                            <h6>
                                                E-mail:
                                            </h6>
                                    <input 
                                            class="#" type="text"
                                            value="ThiS IS for user.Email" >
                                    </input>                                                
                                        <h6>
                                            Your address: 
                                        </h6>

                                    <input
                                            className="#"
                                            placeholder="Enter Address"
                                            type="text"
                                            name="address"
                                            style={{ width: "300px" }}
                                    />
                                  
                                   
                                    
                            <div className="col-md-2">
                                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                             </div>
                        </div>
                    </div>
                    
                </div>
               
            </form>           
        </div>
    
    
    
    )
}export default ProfileUser;