import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from "react-router-dom";

function Dashboard({ updateLoginCheck }) {
    const [trail, setTrail] = useState([]);
    const [authCkeck, setAuthCheck] = useState(false);



    //FETCH AUDIT TRAIL DATA
    useEffect(() => {
        fetch("http://localhost:1337/api/get-trail", {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        }).then((res) => res.json())
            .then((data) => {

                if (data.status == "ok") {

                    setTrail(data.data)
                    setAuthCheck(true)
                    console.log(data.data)
                }
                else {
                    setAuthCheck(false)
                }
            })
            .catch((err) => {
                console.log(data)

                //console.log(err.message);
                setAuthCheck(false)

            });

    }, [])

    return (
        <>
            {!authCkeck ? <div className="items-center justify-center align-center text-center   bg-white shadow rounded  p-20 mt-2">

                <h3>Opps! You need to login first to access this page!</h3><br />
                <NavLink to="/" className="btn btn-sm">Take me to log in</NavLink>
            </div> :

                <div className="overflow-x-auto">
                <h3 className="ml-4 m" > Adit Trail</h3>
                <h6 className="ml-4 mb-1">System Audit Trail: Track all changes made to the system. Secure, private, and transparent.</h6>

                    <table className="table table-compact w-[90%] m-4">
                        <thead>
                            <tr>
                                <th></th>
                                <th>UserID</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Action</th>
                                <th>Time</th>

                            </tr>
                        </thead>
                        <tbody>
                            {trail.map((currentValue, index, array) => (

                                <tr>
                                    <th >{index+1}</th>
                                    <td>{currentValue.userID}</td>
                                    <td>{currentValue.role==1?"Regulary user":currentValue.role==2?"Administrator":"Anonymous"}</td>
                                    <td>{currentValue.name}</td>
                                    <td>{currentValue.action}</td>
                                    <td>{currentValue.time}</td>
                                    
                                </tr>))}



                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>UserID</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Action</th>
                                <th>Time</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>}
        </>

    )


}

export default Dashboard;
