import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const [sidebar, setsidebar] = useState();
    const [users, setUsers] = useState([]);


    //CONTROLLED FORMS

    const [values, setValues_] = useState({
        fullNames: "",
        email: "",
        role:"1",
        phoneNumber: "+254",
        gender: "",
        profileLink: "https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg",
      

    });

    

    //NAVIGATE TO LOGIN AFTER SIGNUP
    function gotLogin(){
        navigate('/')
    }


    //HANDLING CHANGES TO THE FORM INPUTS
    function handleChange(e) {

        const key = e.target.id;
        setSignup({ ...signup, [key]: e.target.value });
    }

    //SET VALUES TO EDIT
    const setValues=(fullNames,role,email,phoneNumber,gender,profileLink)=>{
        setValues_({
            ...signup,
            fullNames: fullNames,
            role:role,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            profileLink: profileLink,

        });
    }
    //SUBMIT DATA TO BACKEND
    const handleSubmit = (event) => {
        event.preventDefault();
        if (signup.password === signup.confirmPassword) {
            // alert('working')

            fetch("http://localhost:1337/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullNames: signup.fullNames,
                    email: signup.email,
                    role:signup.role,
                    phoneNumber: signup.phoneNumber,
                    gender: signup.gender,
                    profileLink: signup.profileLink,
                    confirmPassword: signup.confirmPassword,

                }),
            }).then((res) => res.json())
                .then((response) => {
                    setValues_({
                        ...values,
                        fullNames: "",
                        role:"",
                        email: "",
                        phoneNumber: "+254",
                        gender: "",
                        profileLink: "",

                    });

                    // console.log(response);
                    toast.success('Submitted successfully!')
                    setTimeout(gotLogin(), 3000);

                })
            // .error((error) => {
            //     toast.error('Failed to submit')

            // })
        }
        else {

            toast.error('Password field do not match!');
        }

        //     //LETS UPLOAD PROFILE IMAGE USING AXIOS
        //      const formData = new FormData ();
        //     formData.append("file", uploadFile);
        //     formData.append("upload_preset", "your upload preset name");

        //     Axios.post(
        //      "https://api.cloudinary.com/v1_1/mern-test/image/upload",
        //      formData
        //    )
        //     .then((response) => {
        //       console.log(response);
        //       setCloudinaryImage(response.data.secure_url);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        //   };
    }

    useEffect(() => {
        fetch("http://localhost:1337/api/update-user", {
        }).then((res) => res.json())
            .then((data) => {
                if (data.status == "ok") {
                    console.log(data.data)
                    setUsers(data.data)
                }
                else {
                }

            })
            .catch((err) => {
                //console.log(err.message);

                toast.error('Something went wrong')
            });
    }, [])









    // setLogin({
    //     ...login,
    //     email: "",
    //     password: ""
    // });






    return (
        <div className=" bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <Toaster />
            <div className="  items-center justify-center bg-white shadow rounded  p-10 mt-2">
                <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 mb-3 text-gray-800">
                    Welcome Brian,

                </p>  <p tabIndex={0} role="heading" className="text-2xl font-extrabold leading-6 mb-3 text-gray-800">
                    Admin

                </p>
                <p tabIndex={0} role="heading" className="text-1xl text-2xl leading-6 mb-3 text-gray-800">
                    Users list
                </p>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <tr >
                                <th></th>
                                <th className="text-1xl">Name</th>
                                <th>Profile pic</th>
                                <th>Gender</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((currentValue, index, array) => (
                                <tr>
                                    <th>{index + 1}</th>

                                    <td><p>{currentValue.fullNames}</p>
                                    </td>

                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={currentValue.profileUrl} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    <p>{currentValue.gender}</p>
                                    </td>
                                    <td> <p>********</p>
                                    </td>
                                    <td> <p>{currentValue.email}</p>
                                    </td>
                                    <td> <p>{currentValue.role=="1"?"Regular User":"Admin"}</p></td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-error  btn-xs">Delete</button>
                                            <button className="btn btn-success  btn-xs">Update</button>
                                        </div>
                                    </td>
                                </tr>))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>company</th>
                                <th>location</th>
                                <th>Last Login</th>
                                <th>Favorite Color</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
            <label htmlFor="my-modal-5" className="btn">open modal</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal-5" className="modal-toggle" />
<div className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Modify User Data</h3>
    <form onSubmit={handleSubmit}>
                        {/* {signup.confirmPassword},{signup.password},{signup.gender} */}
                        <div>
                            <lable className="text-sm font-medium leading-none text-gray-800">Full Names</lable>
                            <input id="fullNames" value={signup.fullNames} onChange={handleChange} placeholder="Enter full names" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        </div>
                        <div>
                            <lable className="text-sm font-medium leading-none text-gray-800">Email</lable>
                            <input id="email" value={signup.email} onChange={handleChange} placeholder="Enter email" role="input" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        </div>
                        <div>
                            <lable className="text-sm font-medium leading-none text-gray-800">Phone numer</lable>
                            <input id="phoneNumber" value={signup.phoneNumber} onChange={handleChange} placeholder="Phone number" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        </div>
                        <div className="mt-3">
                            <lable className="text-sm font-medium leading-none text-gray-800">Select Gender</lable>
                            <select id="gender" value={signup.gender} onChange={handleChange} className="select select-success  w-full max-w-xs">
                                <option selected>Pick your Gender </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div> <div className="mt-3">
                            <lable className="text-sm font-medium leading-none text-gray-800">Select role</lable>
                            <select id="role" value={signup.role} onChange={handleChange} className="select select-success  w-full max-w-xs">
                                <option selected>Select role</option>
                                <option value="1">User</option>
                                <option value="2">Admin</option>
                            </select>
                        </div>
                        <div>
                            <lable className="text-sm font-medium leading-none text-gray-800">Select Profile image</lable>
                            <input id="profileLink" onChange={(event) => { setUploadFile(event.target.files[0]); }} role="input" type="file" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                        </div>
                        <div className="mt-6  w-full">
                            <lable className="text-sm font-medium leading-none text-gray-800">Password</lable>
                            <div className="relative flex items-center justify-center">
                                <input id="password" value={signup.password} onChange={handleChange} aria-label="enter Password" placeholder="Enter password" role="input" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                            fill="#71717A"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6  w-full">
                            <lable className="text-sm font-medium leading-none text-gray-800">Repeat Password</lable>
                            <div className="relative flex items-center justify-center">
                                <input id="confirmPassword" value={signup.confirmPassword} onChange={handleChange} aria-label="Re-enter Password" placeholder="Re-enter password" role="input" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                                            fill="#71717A"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button type="submit" role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                Create my account
                            </button>
                        </div>
                    </form>
    <div className="modal-action">
      <label htmlFor="my-modal-5" className="btn">Yay!</label>
    </div>
  </div>
</div>
        </div>
    );
}

export default Dashboard;
