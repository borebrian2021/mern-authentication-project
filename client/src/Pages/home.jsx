import React, { Component, useEffect,useState } from 'react';
import jwt from 'jwt-decode';


import toast, { Toaster } from 'react-hot-toast';
function Home({updateLoginCheck}) {
// const history = useHistory();
const [userName,setUserName]=useState("");
const [role,setRole]=useState("");

    // LETS VERIFY IF USER IS LOGED IN
   
        const token = localStorage.getItem('token')
        // const history = useHistory()
        console.log(token)



 //CHECK LOGIN STATUS
 useEffect(() => {
    fetch("http://localhost:1337/api/check-status", {
      headers:{
          'x-access-token': localStorage.getItem('token'),
      }
  }).then((res) => res.json())
  .then((data) => {
    data.status=="ok"? updateLoginCheck(true): updateLoginCheck(false)

   
  })
  .catch((err) => {
      //console.log(err.message);
      updateLoginCheck(false)

  
  
  });
  
  },[])








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
            <div className="hero  ">
                <Toaster />
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" className="max-w-sm rounded-lg shadow-2xl h-[200px]" />
                    <div>
                    <span className="badge badge-lg ">{userName}</span><br/>
                        <span className="badge badge-lg mt-2 ">{role}</span>
                        <h5 className="text-4xl ">Welcome To The home of champions!</h5>
                        <div className="avatar-group -space-x-6">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-12 bg-neutral-focus text-neutral-content">
                                    <span>+99</span>
                                </div>
                            </div>
                        </div>
                        <p className="py-6">Keep visiting for more cool updates</p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Home;
