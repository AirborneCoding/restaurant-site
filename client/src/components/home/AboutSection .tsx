import Link from "next/link";
import Img from "../shared/Img";

const AboutSection = () => {
    return (
        <>
            <section className="py-20">
                <div className="body-container">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 lg:w-2/3">
                            <div className="text-2xl md:text-4xl lg:text-6xl text-white font-bold mb-6 ">
                                Bienvenu chez <br className="hidden md:block" />
                                <span className="text-red-500 font-pandaFont1 t">panda</span> restaurant
                            </div>
                            <p className="text-sm md:text-basetext-gray-400 mb-8">
                                Chez Panda Restaurant, nous vous proposons une expérience culinaire unique avec
                                des plats japonais et asiatiques authentiques, préparés avec les ingrédients les
                                plus frais. Que vous veniez pour un petit déjeuner rapide, un déjeuner entre
                                amis ou un dîner spécial, nous avons quelque chose pour satisfaire toutes vos
                                envies.
                            </p>
                            <div className="flex gap-2">
                                <Link
                                    href="/about"
                                    className="bg-red-500 hover:bg-red-600 text-black font-bold py-3 px-6 rounded-md font-pandaFont1"
                                >
                                    explorer notre l&apos;histoire
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
                            <Img
                                src="https://dtf-cdn.com/images/production/233618b5e73b086d87b309e03b4e5edfd11c54a6-2500x2500.png?w=800&q=80&fm=webp"
                                alt="Hero Image"
                                className="rounded-lg shadow-lg h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="body-container text-center py-20">
                <div className="mb-8">
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <h4 className="font-bold font-pandaFont1 tracking-[4px]">CUISINES</h4>
                            <p className="text-xs sm:text-sm md:text-base">Japonaise, Sushi, Asiatique</p>
                        </div>
                        <div>
                            <h4 className="font-bold font-pandaFont1 tracking-[4px]">Repas</h4>
                            <p className="text-xs sm:text-sm md:text-base">Petit déjeuner, Déjeuner, Dîner</p>
                        </div>
                        <div>
                            <h4 className="font-bold font-pandaFont1 tracking-[4px]">FONCTIONNALITÉS</h4>
                            <p className="text-xs sm:text-sm md:text-base">Service de livraison, Réservations, Places assises, Service de table</p>
                        </div>
                    </div>
                </div>
                <Img
                    className="w-full h-64 object-cover rounded-lg"
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/2a/0d/1c/best-sushi-wok-restaurant.jpg?w=800&h=-1&s=1"
                    alt="Restaurant ambiance"
                />
            </section>
        </>
    );
};

export default AboutSection;
