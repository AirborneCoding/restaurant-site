'use client';

import Img from '@/components/shared/Img';
import { motion } from 'framer-motion';

const Imgs = [
    'https://lh3.googleusercontent.com/p/AF1QipM4Hq7OxUfYdL6tnxAGA086tuDV4BDAShTzlRBK=s680-w680-h510',
    'https://lh3.googleusercontent.com/p/AF1QipOIrfQVJPT4TlsdrfYdny3-2DvADyi4mGweTF0F=s680-w680-h510',
    'https://lh3.googleusercontent.com/p/AF1QipMvekyapWLT_qDpYhXWu0ohEubZoOdAZLsnLKeo=s680-w680-h510',
    'https://lh3.googleusercontent.com/p/AF1QipNUmj1AY2PxvbPcmpt-QsB3lt-jVP_qbcP9KcNe=s680-w680-h510',
    'https://lh3.googleusercontent.com/p/AF1QipMC8dLIM2AN0hjrLKeGMVPsK4vGEp0g83G-CKqo=s680-w680-h510',
    'https://lh5.googleusercontent.com/p/AF1QipOwmNqf9FUCENbe9XnibQdH0KwG3XHVhyn984H5=w130-h163-n-k-no-nu',
];

const Page = () => {
    return (
        <section className="">
            {/* Hero Section */}
            <motion.div
                className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-[#EFEBDA] text-5xl font-extrabold text-center italic">
                        Welcome to Panda Restaurant
                    </h1>
                </div>
            </motion.div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-semibold text-center text-red-600 mb-4">Our Story</h2>
                    <p className="text-gray-400 text-lg leading-8 text-center max-w-3xl mx-auto">
                        Niché au cœur du Maroc, le restaurant Panda propose à ses clients les saveurs authentiques de la Chine.
                        Créé avec la vision de mélanger la cuisine traditionnelle chinoise à l&apos;hospitalité marocaine,
                        notre restaurant est devenu un havre de paix pour les gourmands à la recherche d&apos;une expérience culinaire unique.
                    </p>
                </motion.div>

                {/* Our Cuisine Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Cuisine</h2>
                    <p className="text-gray-400 text-lg leading-8 max-w-3xl mx-auto">
                        Chez Panda, nous célébrons les saveurs riches et variées des plats traditionnels chinois, préparés
                        avec des ingrédients frais et locaux. Nos chefs créent une expérience authentique avec
                        chaque plat, du savoureux Dim Sum au délicieux canard laqué. Chaque bouchée vous emmène dans un
                        voyage culinaire des rues animées de Pékin aux salons de thé calmes de Shanghai.
                    </p>
                </motion.div>

                {/* Gallery Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
                >
                    {Imgs.map((img, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="overflow-hidden rounded-lg shadow-lg"
                        >
                            <Img
                                src={img}
                                alt={`Panda Restaurant`}
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Us Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mt-10"
                >
                    <h2 className="text-3xl font-semibold text-red-600 mb-4">Visit Us</h2>
                    <p className="text-gray-400 text-lg leading-8 max-w-3xl mx-auto">
                        Situé au cœur du Maroc, le restaurant Panda est ouvert tous les jours pour vous accueillir. Que vous nous rejoigniez pour un dîner en famille ou pour une célébration spéciale, nos portes sont toujours ouvertes. Savourez les saveurs de la Chine ici même au Maroc !
                    </p>
                    <p className="mt-4 text-lg font-semibold text-[#EFEBDA]">
                        <span className="text-red-500">Address</span>: Magasin 1, Riad, 3 Av. Annakhil, Rabat 10000
                        <br />
                        <span className="text-red-500">Phone</span>: 05375-65752
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Page;
