import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import image1 from '../../assets/images/my/1.jpg';
import image2 from '../../assets/images/my/2.jpg';
import image3 from '../../assets/images/my/3.jpg';
import image4 from '../../assets/images/my/4.jpg';
import image5 from '../../assets/images/my/5.jpg';
import image6 from '../../assets/images/my/6.jpg';
import image7 from '../../assets/images/my/7.jpg';

const Scroll = () => {
    return (
        <div className="bg-neutral-800">
            <div className="flex h-48 items-center justify-center">
                <span className="font-semibold uppercase text-neutral-500">
                    Scroll down
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </span>
            </div>
            <HorizontalScrollCarousel />
            <div className="flex h-48 items-center justify-center">
                <span className="font-semibold uppercase text-neutral-500">
                    Scroll up
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </span>
            </div>
        </div>
    );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-500%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
            <div className="sticky top-0 flex overflow-hidden">
                <motion.div style={{ x, display: 'flex' }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
        >
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: '100vh',
                    width: '100vw'
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>
            <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}
                </p>
            </div>
        </div>
    );
};

export default Scroll;

const cards = [
    {
        url: image1,
        title: "Title 1",
        id: 1,
    },
    {
        url: image2,
        title: "Title 2",
        id: 2,
    },
    {
        url: image3,
        title: "Title 3",
        id: 3,
    },
    {
        url: image4,
        title: "Title 4",
        id: 4,
    },
    {
        url: image5,
        title: "Title 5",
        id: 5,
    },
    {
        url: image6,
        title: "Title 6",
        id: 6,
    },
    {
        url: image7,
        title: "Title 7",
        id: 7,
    },
];