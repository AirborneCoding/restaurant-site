import React from "react";
import Img from "../shared/Img";

const Footer = () => {
    return <footer className="bg-black px-6 py-12">
        <div className=" max-w-screen-xl mx-auto px-6">
            <div className="flex pb-8">
                <div className="flex flex-grow">
                    <div>
                        <Img
                            className="w-24 h-24 rounded-full"
                            src="https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-logo.jpg"
                            alt="logo"
                        />
                    </div>
                </div>
                <div className="flex space-x-12">
                    <div className="flex flex-col space-y-2">
                        <span className="text-white poppins">About Online Food</span>
                        <span className="text-white poppins">Read our blog</span>
                        <span className="text-white poppins">Sign up to deliver</span>
                        <span className="text-white poppins">Add your restaurant</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white poppins">Get Help</span>
                        <span className="text-white poppins">Ask any question</span>
                        <span className="text-white poppins">Order Now</span>
                        <span className="text-white poppins">Contact</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-white poppins">Facebook</span>
                        <span className="text-white poppins">Instagram</span>
                        <span className="text-white poppins">Twitter</span>
                        <span className="text-white poppins">Youtube</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center pt-8">
                <div className="flex flex-grow">
                    <span className="poppins text-gray-500">
                        Developed by Zakaria Airborne
                    </span>
                </div>
                <div className="flex justify-end items-center space-x-6">
                    <span className="poppins text-white cursor-pointer">
                        Privacy Policy
                    </span>
                    <span className="poppins text-white cursor-pointer">Terms of Use</span>
                    <span className="poppins text-white cursor-pointer">Pricing</span>
                </div>
            </div>
        </div>
    </footer>

};

export default Footer;
