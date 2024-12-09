// 'use client'
// import { GPTmenu } from "@/utils/data";
// import Img from "../shared/Img";

// const FeaturedDishes = () => {

//     return (
//         <section className="py-16">
//             <div className="body-container text-center">
//                 <h2 className="text-3xl font-bold mb-6">Plats en Vedette</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {GPTmenu?.map((cate) => (
//                         <div key={cate.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//                             <Img
//                                 className="w-full h-40 object-cover"
//                                 src={cate?.image}
//                                 alt={`panda restaurant ${cate.category}`}
//                             />
//                             <div className="p-4">
//                                 <h3 className="font-semibold text-lg">{cate.category}</h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeaturedDishes;



'use client';

import { GPTmenu } from "@/utils/data";
import Img from "../shared/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const FeaturedDishes = () => {
    return (
        <section className="py-16">
            <div className="body-container text-center">
                <h2 className="text-3xl font-bold mb-6 font-pandaFont1">notre Plats categories en Vedette</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    // pagination={{ clickable: true }}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {GPTmenu?.map((cate) => (
                        <SwiperSlide key={cate.id}>
                            <div className="relative">
                                <Img
                                    className="w-full h-40 object-cover"
                                    src={cate?.image}
                                    alt={`panda restaurant ${cate.category}`}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white font-semibold text-lg">
                                        {cate.category}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedDishes;




/* 
const dishes = [
    { id: 1, name: 'Canard Laqué', img: "https://picsum.photos/600/400/?random=1" },
    { id: 2, name: 'Nouilles aux Légumes', img: "https://picsum.photos/600/400/?random=2" },
    { id: 3, name: 'Riz Cantonnais', img: "https://picsum.photos/600/400/?random=3" },
    { id: 4, name: 'Poulet Kung Pao', img: "https://picsum.photos/600/400/?random=4" },
];
*/
/* 
 <section className="py-16">
            <div className="body-container text-center">
                <h2 className="text-3xl font-bold mb-6">Plats en Vedette</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dishes.map((dish) => (
                        <div key={dish.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                className="w-full h-40 object-cover"
                                src={dish.img}
                                alt={dish.name}
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{dish.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
*/