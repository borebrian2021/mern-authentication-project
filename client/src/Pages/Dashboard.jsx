import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const [sidebar, setsidebar] = useState();
    const [users, setUsers] = useState([]);



    useEffect(() => {
        fetch("http://localhost:1337/api/get-users", {
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
                            <tr>
                                <th></th>
                                <th>Name</th>
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
                                    <th>{index+1}</th>

                                    <td><input aria-label="enter email adress" role="input" value="Cy Ganderton" type="email" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                    </td>

                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td> <input aria-label="enter email adress" role="input" value="Cy Ganderton" type="email" className=" border border-blue-500 rounded focus:outline-none text-sm font-medium leading-none text-gray-800 py-1 w-full pl-1 mt-1" />
                                    </td>
                                    <td> <input aria-label="enter email adress" role="input" value="Cy Ganderton" type="password" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                    </td>
                                    <td> <input aria-label="enter email adress" role="input" value="Cy Ganderton" type="email" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                    </td>
                                    <td> <input aria-label="enter email adress" role="input" value="Cy Ganderton" type="number" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                                    </td>
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
        </div>
    );
}

export default Dashboard;
