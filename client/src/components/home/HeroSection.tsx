import Link from "next/link";


const HeroSection = () => {
    return (
        <section className="relative bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/2a/0d/19/best-sushi-wok-restaurant.jpg?w=800&h=-1&s=1')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-pandaFont1 tracking-widest">Bienvenue chez Panda</h1>
                <p className="text-lg md:text-xl mb-6">
                    Découvrez le meilleur de la cuisine chinoise au cœur du Maroc
                </p>
                <Link
                    href='/menu'
                    className="bg-primary text-white px-6 py-3 rounded-full transform transition duration-500 hover:scale-105">
                    Explorez le Menu
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
