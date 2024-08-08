import React, { useState, useEffect } from "react";
import axios from "axios";
import EachContestant from "./EachContestant";

const Contestant = () => {
    const [images, setImages] = useState([]);

    const fetchContestants = async () => {
        try {
            const response = await axios.get("https://votesy-server.vercel.app/api/userFiles");
            console.log("Fetched images:", response.data);

            const urls = response.data.urls;

            if (!Array.isArray(urls)) {
                throw new Error("Invalid response format");
            }

            setImages(urls);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchContestants();
    }, []);

    return (
        <section
            className="bg-pink-600 pt-12 sm:pt-16 lg:pt-20 xl:pt-24 px-4 sm:px-6 lg:px-8 mx-auto sm:pb-20 lg:pb-22 py-12 sm:py-16 lg:py-20 xl:py-32"
            id="our-products border-3"
        >
            <div className="max-w-screen-xl mx-auto text-center lg:max-w-3xl mb-[70px]">
                <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    OUR CONTESTANTS
                </h2>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 max-w-sm justify-center items-center mx-auto mt-12 text-center sm:mt-16 lg:max-w-none lg:text-left md:items-start gap-8 md:gap-12 py">
                {images.map((item, index) => (
                    <div key={item.key}>
                        <EachContestant
                            name={`Contestant ${String(index + 1).padStart(3, '0')}`}
                            image={item.url}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Contestant;
