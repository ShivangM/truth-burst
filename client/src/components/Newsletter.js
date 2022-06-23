import React, { useState } from "react";
import axios from 'axios'
import {AiFillMail} from 'react-icons/ai'
import { Link } from "react-router-dom";

export default function Newsletter() {

    const [email, setEmail] = useState("");
    const ENDPOINT = (process.env.REACT_APP_ENDPOINT || "http://localhost:5000/") + "newsletter"

    const handleSubmit = async ()=>{
        const res = await axios.post(ENDPOINT, {email})
        setEmail("")
        alert(res.data.response)
    }

    return (
        <div className="bg-[#FFC3C3]">
            <div className="mx-4 md:mx-12 py-8 md:py-12 grid place-content-center px-4 md:px-0">
                <div className="lg:flex justify-start items-center lg:gap-28">
                    <div className>
                        <h1 className="font-bold text-5xl text-gray-800">Newsletter</h1>
                        <p className="pt-8 md:pt-4 text-gray-800">Sign up for our newsletter to get latest updates about the game! you can unsubscribe anytime from the bottom of our mail</p>
                        <div className="mt-8 md:flex justify-start md:gap-4">
                            <input type="email" placeholder="Your Email" className="placeholder-gray-600 w-full md:w-1/2 p-4 grid place-items-center rounded-md focus:outline-none" onChange={e=>setEmail(e.target.value)} value={email}/>
                            <button className="w-full md:w-auto bg-[#FF5D5D] text-white px-8 py-4 rounded-md hover:bg-[#fc5656] grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none" onClick={handleSubmit}>Subscribe</button>
                        </div>
                        <p className="pt-4 text-xs text-gray-800">Read our <Link to="/tnc" className="cursor-pointer no-underline hover:underline">privacy policy</Link></p>
                    </div>
                    <div className="pt-8 lg:pt-0">
                        <AiFillMail className="text-[20rem] text-[#FF5D5D] text-center w-full"/>
                    </div>
                </div>
            </div>
        </div>
    );
}


