import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const [userName, setUsername] = useState();
    const [users, setUsers] = useState([]);
    const [id, setId] = useState([]);
    const [updateUser, setUpdateUser] = useState([]);
    const [isAdmin,setIsAdmin] = useState();
    const [sessionExpired,setSessionExpired] = useState(false);


    //CONTROLLED FORMS

    const [values, setValues_] = useState({
        fullNames: "",
        email: "",
        role: "1",
        phoneNumber: "+254",
        gender: "",
        profileLink: "https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg",


    });



    //NAVIGATE TO LOGIN AFTER values
    function gotLogin() {
        navigate('/')
    }


    //HANDLING CHANGES TO THE FORM INPUTS
    function handleChange(e) {

        const key = e.target.id;
        setValues_({ ...values, [key]: e.target.value });
    }

    //SET VALUES TO EDIT
    const setValues = (fullNames, role, email, phoneNumber, gender, profileLink) => {
        setValues_({
            ...values,
            fullNames: fullNames,
            role: role,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            profileLink: profileLink,

        });
    }

    //DELETE USER DATA

    const handleDelete = (event) => {
        event.preventDefault();
        if (values.password === values.confirmPassword) {
            // alert('working')

            fetch("http://localhost:1337/api/delete-user/"+id, {
                method: "DELETE",
                headers:{
                    'x-access-token': localStorage.getItem('token'),
                },
               
                body: JSON.stringify({})
            }).then((res) => res.json())
            .then((data) => {
                if (data.status == "ok") {
                    setUpdateUser({status: "ok"})
                toast.success('Removed user successfully')
                }
                else {
                toast.error('Failed to delete record!')
                }


            })
            .catch((err) => {
                //console.log(err.message);

                toast.error('Something went wrong')
            });
        }
    


        }

            //SUBMIT DATA TO BACKEND
            const handleSubmit = (event) => {
                event.preventDefault();
                if (values.password === values.confirmPassword) {
                    // alert('working')

                    fetch("http://localhost:1337/api/update-user/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fullNames: values.fullNames,
                            email: values.email,
                            role: values.role,
                            phoneNumber: values.phoneNumber,
                            gender: values.gender,
                            profileLink: values.profileLink,

                        }),
                    }).then((res) => res.json())
                        .then((response) => {
                            setValues_({
                                ...values,
                                fullNames: response.data.fullNames,
                                email: response.data.email,
                                role: response.data.role,
                                phoneNumber: response.data.phoneNumber,
                                gender: response.data.gender,
                                profileLink: response.data.profileLink,

                            });

                            // console.log(response);
                            toast.success('Updated successfully!')
                            setUpdateUser(response.data)
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
                fetch("http://localhost:1337/api/get-users", {
                    headers:{
                        'x-access-token': localStorage.getItem('token'),
                    }
                }).then((res) => res.json())
                    .then((data) => {
                        if (data.status == "ok" && data.admin==1) {
                            setIsAdmin(false)
                            console.log(data.data)
                            setUsers(data.data)
                            toast.success("User")

                        }
                        else if(data.status == "ok" && data.admin==2){
                            setIsAdmin(true)
                            console.log(data.data)
                            setUsers(data.data)
                            toast.success("Admin")

                        }
                        else {
                            
                            setSessionExpired(true);

                        }
                        setUsername(data.username)

                    })
                    .catch((err) => {
                        //console.log(err.message);

                        toast.error('Something went wrong')
                    });
            }, [updateUser])









            // setLogin({
            //     ...login,
            //     email: "",
            //     password: ""
            // });






            return (
                <>
                {sessionExpired ? <div className="items-center justify-center align-center text-center   bg-white shadow rounded  p-20 mt-2">

<h3>Session Expired</h3><br/>
<a href="/" className="btn btn-sm">Log in</a>
                    </div>:
                     <div className=" bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
                    <Toaster />
                    <div className="  items-center justify-center bg-white shadow rounded  p-10 mt-2">
                    <p tabIndex={0} role="heading" className="text-1xl text-2xl leading-6 mb-3 text-gray-800">
                            Welcome {userName}
                        </p> <p tabIndex={0} role="heading" className="text-2xl  leading-6 mb-3 text-gray-800">
                           
{isAdmin}
                        </p>
                        <div className="badge badge-md">{isAdmin?"Administrator":"Guest"}</div>
                        <p tabIndex={0} role="heading" className="text-1xl text-2xl leading-6 mb-3 text-gray-800">
                            Users list
                        </p>
                        <div className="overflow-x-auto">
                            <table className="table table-compact w-full">
                                <thead>
                                    {isAdmin?  <tr >
                                        <th></th>
                                        <th className="text-1xl">Name</th>
                                        <th>Profile pic</th>
                                        <th>Gender</th>
                                        <th>Password</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>: <tr >
                                        <th></th>
                                        <th className="text-1xl">Name</th>
                                        <th>Profile pic</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Action</th>

                                       
                                    </tr>}
                                   
                                </thead>
                                <tbody>{isAdmin?<>
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
                                            <td> <p>{currentValue.role == "1" ? "Regular User" : "Admin"}</p></td>
                                            <td>
                                                <div className="btn-group">

                                                    <label htmlFor="my-modal-5" className="btn  btn-xs" onClick={() => {
                                                        setValues(currentValue.fullNames, currentValue.role, currentValue.email, currentValue.phoneNumber, currentValue.gender, currentValue.profileUrl);
                                                        setId(currentValue._id);
                                                    }
                                                    }>Edit</label>
                                                    <button className="btn btn-error  btn-xs" onClick={(event)=>{handleDelete(event)
                                                     setId(currentValue._id);
                                                    }}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>))}</>:
                                        <>
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
                                               
                                                <td> <p>{currentValue.email}</p>
                                                
                                                </td>
                                                <td>
                                                <div className="btn-group">

                                                  
                                                    <button className="btn btn-error  btn-xs" onClick={(event)=>{
                                                    toast('Please keep visiting, this feature is still under mentenance,Thank you.',
                                                    {
                                                      icon: '👏',
                                                      style: {
                                                        borderRadius: '10px',
                                                        background: '#333',
                                                        color: '#fff',
                                                      },
                                                    }
                                                  );
                                                    }}>Delete</button>
                                                </div>
                                            </td>
                                               
                                               
                                            </tr>))}</>}
                                </tbody>
                                <tfoot>
                                {isAdmin?  <tr >
                                        <th></th>
                                        <th className="text-1xl">Name</th>
                                        <th>Profile pic</th>
                                        <th>Gender</th>
                                        <th>Password</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>: <tr >
                                        <th></th>
                                        <th className="text-1xl">Name</th>
                                        <th>Profile pic</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Action</th>

                                       
                                    </tr>}
                                </tfoot>
                            </table>
                        </div>

                    </div>


                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Modify User Data</h3>{id}
                            <form onSubmit={handleSubmit}>
                                {/* {values.confirmPassword},{values.password},{values.gender} */}
                                <div>
                                    <lable className="text-sm font-medium leading-none text-gray-800">Full Names</lable>
                                    <input id="fullNames" value={values.fullNames} onChange={handleChange} placeholder="Enter full names" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                </div>
                                <div>
                                    <lable className="text-sm font-medium leading-none text-gray-800">Email</lable>
                                    <input id="email" value={values.email} onChange={handleChange} placeholder="Enter email" role="input" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                </div>
                                <div>
                                    <lable className="text-sm font-medium leading-none text-gray-800">Phone numer</lable>
                                    <input id="phoneNumber" value={values.phoneNumber} onChange={handleChange} placeholder="Phone number" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                </div>
                                <div className="mt-3">
                                    <lable className="text-sm font-medium leading-none text-gray-800">Select Gender</lable>
                                    <select id="gender" value={values.gender} onChange={handleChange} className="select select-success  w-full max-w-xs">
                                        <option selected>Pick your Gender </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div> <div className="mt-3">
                                    <lable className="text-sm font-medium leading-none text-gray-800">Select role</lable>
                                    <select id="role" value={values.role} onChange={handleChange} className="select select-success  w-full max-w-xs">
                                        <option selected>Select role</option>
                                        <option value="1">User</option>
                                        <option value="2">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <lable className="text-sm font-medium leading-none text-gray-800">Select Profile image</lable>
                                    <input id="profileLink" onChange={(event) => { setUploadFile(event.target.files[0]); }} role="input" type="file" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                </div>



                                <div className="mt-8">
                                    <button type="submit" role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                        Update record
                                    </button>
                                </div>
                            </form>
                            <div className="modal-action">
                                <label htmlFor="my-modal-5" className="btn-sm btn">Exit</label>
                            </div>
                        </div>
                    </div>
                </div>
                }
              
                </>
               
            );
        }

        export default Dashboard;
