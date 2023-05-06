import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function ResetPass() {
    const [sidebar, setsidebar] = useState();
    const navigate = useNavigate();

    //INSTANSTIATE VARIABLES
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [loading, setLoading] = useState(false);
    const [newPass_, setNewPass_] = useState("");
    const [repeatPass_, setRepeatPass_] = useState("");
    const [status, setStatus] = useState(1);
    function goHome() {
        navigate('/')
    }


    //Email change field
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    //Code change field
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };
    //Code change field
    const handleSetPass = (event) => {
        setEmail(event.target.value);
    };
    //Code change field
    const handleRepeatPass = (event) => {
        setEmail(event.target.value);
    };

    //SEND CODE
    const handleSendCode = () => {



    }
    //HANDLING CHANGES TO THE FORM INPUTS
    function handleChange(e) {

        const key = e.target.id;
        setLogin({ ...login, [key]: e.target.value });
    }

    //CHANGE LOADING STATE
    const changeLoading =()=>{
        setLoading(!loading);
    }

    //SEND VERIFICATION CODE VIA MAIL
    async function   sendVerificationCode(event){
        event.preventDefault();
        changeLoading();
        // alert('working')
        fetch("http://localhost:1337/api/send-reset-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email

            })

        }).then((res) => res.json())
            .then((data) => {


                if (data.status == "ok") {
                    console.log(data);
                    toast.success('Verification sent successfully!')
                    setStatus(2)
                } else {
                    toast.error('Verification sent failed, email provided does not exist')
                    setEmail("")
                }
            })
            .catch((err) => {
                //console.log(err.message);

                toast.error('Failed to login')
            });
            changeLoading()

    }


    //CONFIRM CODE SENT TO EMAIL HERE
    const handleConfirmCode = (event) => {
        event.preventDefault();

        // alert('working')
        fetch("http://localhost:1337/api/verify-reset-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: code

            })

        }).then((res) => res.json())
            .then((data) => {


                if (data.status == "ok") {
                    console.log(data);
                    toast.success('Code Verification successful!')
                    setStatus(3)
                } else {
                    toast.error('Wrong verification code!')
                    setCode("")
                }
            })
            .catch((err) => {
                //console.log(err.message);

                toast.error('Failed to login')
            });
    }


    //SET NEW PASSWORD
    const handleSetNewPass = (event) => {
        event.preventDefault();
        //lets check if the password matches
        if (newPass_ === repeatPass_) {
            // alert('working')
            fetch("http://localhost:1337/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                    newPass: repeatPass_

                })

            }).then((res) => res.json())
                .then((data) => {


                    if (data.status == "ok") {
                        console.log(data);
                        toast.success('Password changed successful!')
                        goHome();
                        setStatus(1)
                    } else {
                        toast.error('Something went wrong!')
                    }
                })
                .catch((err) => {
                    //console.log(err.message);

                    toast.error('Failed to login')
                });
        }
        else {
            toast.warn("Password do not match!");
        }
    }


    return (
        <div className="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <Toaster />
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-4">


                    <div>
                        {status === 1 ? <form onSubmit={sendVerificationCode}>
                            <div>
                                <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 mb-3 text-gray-800">
                                    Enter email to reset password.
                                </p>
                                {/* <p>{email}</p> */}

                                <lable className="text-sm font-medium leading-none text-gray-800">Enter code sent to:</lable>
                                <input value={email} onChange={handleEmailChange} name placeholder="Enter email adress" role="input" type="email" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />

                            </div>
                            <div className="mt-8 flex text-center justify-center  align-middle">
                                {loading ? <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683389201/mern-authentication/loading-gif_jfmsqu.gif" className="h-4 w-4" /> : <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                    Send verification
                                </button>}

                            </div>

                        </form> : status === 2 ? <form onSubmit={handleConfirmCode}>
                            <div>
                                <p tabIndex={0} role="heading" aria-label="Login to your account" className="   leading-6 mb-3 text-gray-800">
                                    Enter code sent to {email}.
                                </p>
                                <input value={code} onChange={handleCodeChange} placeholder="Enter code sent to email here" role="input" type="number" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />

                            </div>
                            <div className="mt-8">

                                <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                    Submit
                                </button>
                                <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                                    Wrong email?{" "}
                                    <span onClick={() => { setStatus(1), setEmail("") }} tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                        {" "}
                                        Click here
                                    </span>
                                </p>
                            </div>
                        </form> : <form onSubmit={handleSetNewPass}>
                            <div>
                                <lable className="text-sm font-medium leading-none text-gray-800">Enter new password</lable>
                                <input value={newPass_} onChange={handleSetPass} placeholder="Enter new password" role="input" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            </div>
                            <div>
                                <lable className="text-sm font-medium leading-none text-gray-800">Repeat new password</lable>
                                <input value={repeatPass_} onChange={handleRepeatPass} name placeholder="Repeat new password" role="input" type="password" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                            </div>
                            <div className="mt-8">
                                <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                                    Submit
                                </button>
                            </div>
                        </form>}
                    </div>






                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  " />
                    </div>
                    <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
                        <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>



                </div>
            </div>
        </div>
    );
}

export default ResetPass;
