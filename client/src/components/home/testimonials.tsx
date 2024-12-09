import Img from "../shared/Img";

const testimonials = [
    {
        id: 1,
        name: 'Ahmed R.',
        text: "Les meilleurs dim sums que jai jamais mangés ! Une ambiance accueillante et un service impeccable.",
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 2,
        name: 'Fatima Z.',
        text: "Une expérience gastronomique authentique. Je recommande fortement le Canard Laqué !",
        img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="body-container text-center">
                <h2 className="text-3xl font-bold mb-6">Témoignages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white shadow-lg rounded-lg p-6 text-left"
                        >
                            <Img
                                className="w-16 h-16 rounded-full mb-4"
                                src={testimonial.img}
                                alt={testimonial.name}
                            />
                            <h3 className="font-semibold mb-2">{testimonial.name}</h3>
                            <p className="text-gray-600 italic">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
