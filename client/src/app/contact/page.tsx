'use client'
import { motion } from 'framer-motion';

const page = () => {
    return (
        <section className="min-h-screen ">
            {/* Hero Section */}
            <motion.div
                className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipPnWqSbZ0ZYRma6JD12FhNzXPQBAGu6HxLlrgpW=s680-w680-h510')" }}
                // style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-bold text-center italic">Contact Us</h1>
                </div>
            </motion.div>

            {/* Contact Information & Form Section */}
            <div className="body-container py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Information */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-red-600">Get in Touch with Us</h2>
                    <p className="text-gray-700 text-lg leading-8">
                        Que vous souhaitiez rejoindre notre équipe, organiser un grand événement ou collaborer sur une nouvelle aventure, nous serions ravis de vous entendre ! Veuillez remplir le formulaire et notre équipe vous répondra sous peu.
                    </p>

                    <div className="space-y-3">
                        <p className="text-gray-700 text-lg">
                            📍 <span className="font-semibold">Adresse:</span> Magasin 1, Riad, 3 Av. Annakhil, Rabat 10000
                        </p>
                        <p className="text-gray-700 text-lg">
                            📞 <span className="font-semibold">Phone:</span>05375-65752
                        </p>
                        <p className="text-gray-700 text-lg">
                            ✉️ <span className="font-semibold">Téléphone:</span> contact@panda.ma
                        </p>
                        <p className="text-gray-700 text-lg">
                            ⏰ <span className="font-semibold">Horaires de travail:</span> Monday - Sunday: 11:00 AM - 11:00 PM
                        </p>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    className="bg-[#EFEBDA] p-8 rounded-lg shadow-lg space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div>
                        <label className="text-gray-700 font-semibold" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 block w-full border border-gray-300 p-3 rounded-lg focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-semibold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 block w-full border border-gray-300 p-3 rounded-lg focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 font-semibold" htmlFor="subject">Sujet</label>
                        <select
                            id="subject"
                            className="mt-2 block w-full border border-gray-300 p-3 rounded-lg focus:ring-red-500 focus:border-red-500"
                            required
                        >
                            <option value="">Select a subject</option>
                            <option value="career">Career Opportunities</option>
                            <option value="events">Event Orders</option>
                            <option value="collaboration">Collaborations</option>
                            <option value="general">General Inquiry</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700 font-semibold" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            className="mt-2 block w-full border border-gray-300 p-3 rounded-lg focus:ring-red-500 focus:border-red-500"
                            placeholder="Write your message here..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default page;
