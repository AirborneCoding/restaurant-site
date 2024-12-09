'use client'
import { motion } from "framer-motion";
import Img from "../shared/Img";


const Imgs = [
    'https://allmenus.ma/wp-content/uploads/2024/07/panda.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-2.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-2.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-3.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-4.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-5.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-6.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-7.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-8.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-9.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-10.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-11.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-12.jpg',
    'https://allmenus.ma/wp-content/uploads/2024/07/panda-rabat-13.jpg',
];


const Menu2 = () => {
    return (
        <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {
                Imgs.map((img, index) => (
                    <motion.figure
                        key={index}
                        className="overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                    >
                        <Img src={img} alt="le menu de la restauran panda" className="w-full h-full object-cover" />
                    </motion.figure>
                ))
            }
        </section>
    );
};

export default Menu2;