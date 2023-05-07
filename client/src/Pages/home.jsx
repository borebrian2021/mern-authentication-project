import React, { Component, useEffect, useState } from 'react';
import jwt from 'jwt-decode';


import toast, { Toaster } from 'react-hot-toast';
function Home({ updateLoginCheck }) {
    // const history = useHistory();
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");

    // LETS VERIFY IF USER IS LOGED IN

    const token = localStorage.getItem('token')
    // const history = useHistory()
    console.log(token)



    //CHECK LOGIN STATUS
    useEffect(() => {
        fetch("http://localhost:1337/api/check-status", {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        }).then((res) => res.json())
            .then((data) => {
                data.status == "ok" ? updateLoginCheck(true) : updateLoginCheck(false)


            })
            .catch((err) => {
                //console.log(err.message);
                updateLoginCheck(false)



            });

    }, [])








    // if (token) {
    //     const user = jwt(token)
    //     console.log(user)
    //     if (!user) {
    //         localStorage.removeItem('token')
    //         alert("none")
    //     }
    //     else {

    //         setUserName(user.name)
    //         if (user.role=='1') {
    //         setRole("Admin")
    //         }
    //         else{
    //             setRole("Regular User")

    //         }
    //         console.log(user)
    //         toast.success("Welcome " + user.name)

    //     }
    // }


    return (
        <>

            <div className="hero  bg-white">
                <Toaster />
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683450826/mern-authentication/1544c7c1badc1853710e92847bce8d9c_stwk6x.jpg" className="max-w-sm rounded-lg shadow-2xl h-[200px]" />
                    <div>
                       
                        <h5 className="text-2xl ">Welcome To The home of champions!</h5>
                        <div className="avatar-group -space-x-6">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683451309/mern-authentication/wp2068157_hr35gi.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683451306/mern-authentication/wp2068132_xbmexk.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683451304/mern-authentication/wp2042358_ebmoaz.jpg" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-12 bg-neutral-focus text-neutral-content">
                                    <span>+99</span>
                                </div>
                            </div>
                        </div>
                        <p className="py-6">Join our athlete signup website and elevate your game! Our platform connects you with coaches, teams, and scouts, providing exciting opportunities to showcase your skills and take your game to the next level.</p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Home;
