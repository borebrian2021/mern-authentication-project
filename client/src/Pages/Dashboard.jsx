import React, { useState } from "react";

function Dashboard() {
    const [sidebar, setsidebar] = useState();
    return (
        <div className=" bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div className="  items-center justify-center bg-white shadow rounded  p-10 mt-2">
                <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 mb-3 text-gray-800">
                    Welcome Brian,

                </p>  <p tabIndex={0} role="heading"  className="text-2xl font-extrabold leading-6 mb-3 text-gray-800">
                    Admin

                </p>
                <p tabIndex={0} role="heading"  className="text-1xl text-2xl leading-6 mb-3 text-gray-800">
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
        <th>company</th> 
        <th>location</th> 
        <th>Last Login</th> 
        <th>Favorite Color</th>
      </tr>
    </thead> 
    <tbody>
      <tr>
        <th>1</th> 
        
        <td><input aria-label="enter email adress" role="input" value="Cy Ganderton" type="email" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
        </td> 
       
        <td>
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
        </div>
        </div>
        </td> 
        <td> <td><input aria-label="enter email adress" role="input" value="Cy Ganderton" type="email" className=" border border-blue-500 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
        </td> </td> 
        <td>Littel, Schaden and Vandervort</td> 
        <td>Canada</td> 
        <td>12/16/2020</td> 
        <td>Blue</td>
      </tr>
      <tr>
        <th>2</th> 
        
        <td>Hart Hagerty</td> 
        <td>
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
        </div>
            </td> 
        <td>Desktop Support Technician</td> 
        <td>Zemlak, Daniel and Leannon</td> 
        <td>United States</td> 
        <td>12/5/2020</td> 
        <td>Purple</td>
      </tr>
      <tr>
        <th>3</th> 
        <td>Brice Swyre</td> 
        <td>
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
        </div>
            </td> 
        <td>Tax Accountant</td> 
        <td>Carroll Group</td> 
        <td>China</td> 
        <td>8/15/2020</td> 
        <td>Red</td>
      </tr>
      <tr>
        <th>4</th> 
        <td>Marjy Ferencz</td> 
        <td>
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
        </div>
            </td> 
        <td>Office Assistant I</td> 
        <td>Rowe-Schoen</td> 
        <td>Russia</td> 
        <td>3/25/2021</td> 
        <td>Crimson</td>
      </tr>
      <tr>
        <th>5</th> 
        <td>Yancy Tear</td> 
        <td>
        <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" alt="Avatar Tailwind CSS Component" />
              </div>
        </div>
            </td> 
        <td>Community Outreach Specialist</td> 
        <td>Wyman-Ledner</td> 
        <td>Brazil</td> 
        <td>5/22/2020</td> 
        <td>Indigo</td>
      </tr>
      
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
