import React from 'react'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'

function Footer() {
    return (
        <footer className="bg-black py-6">
            <div className="flex flex-col mx-auto text-white justify-center lg:flex-row lg:justify-around">
                
                <div className="flex flex-col lg:flex-row justify-around items-center lg:w-1/3">
                    <img className='w-1/6 xl:w-1/12' src="https://shivangmishra.me/logo.svg" alt="logo" />
                    <p className="mt-6 lg:mt-0">
                        Copyright © {new Date().getFullYear()} Shivang Mishra
                    </p>
                </div>

                <div className="flex justify-center lg:justify-between items-center text-darkGray mt-6 lg:mt-0">
                    <a
                        className="transition duration-500 hover:text-white"
                        target="_blank" rel="noreferrer"
                        href="http://shivangmishra.me"
                    >
                        Portfolio
                    </a>
                    <span className="text-2xl font-bold text-white mx-6">
                        |
                    </span>
                    <a
                        className="transition duration-500 hover:text-white"
                        target="_blank" rel="noreferrer"
                        href="https://github.com/ShivangM"
                    >
                        Github
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-6 lg:mt-0">
                    <a
                        className="mx-3 hover:opacity-75 text-3xl"
                        target="_blank" rel="noreferrer"
                        href="https://www.facebook.com/shivangmishra24/"
                    >
                        <AiFillFacebook />

                    </a>
                    <a
                        className="mx-3 hover:opacity-75 text-3xl"
                        target="_blank" rel="noreferrer"
                        href="https://twitter.com/ShivangM24"
                    >
                        <AiFillTwitterCircle />
                    </a>
                    <a
                        className="mx-3 hover:opacity-75 text-3xl"
                        target="_blank" rel="noreferrer"
                        href="https://www.instagram.com/shivangm24/"
                    >
                        <AiFillInstagram />
                    </a>
                    <a
                        className="mx-3 hover:opacity-75 text-3xl"
                        target="_blank" rel="noreferrer"
                        href="https://www.linkedin.com/in/shivangm24/"
                    >
                        <AiFillLinkedin/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer