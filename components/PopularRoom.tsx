import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";

import Image from "next/image";
import React from "react";
import PopularRoomCard from "./PopularRoomCard";

function PopularRoom() {
  const rooms: IPopularCard[] = [
    {
      type: "Single",
      image: "single.jpg",
      desc: "A cozy and well-furnished single room, perfect for solo travelers or business professionals. This room features a comfortable twin-size bed, a sleek workspace, and soft ambient lighting. Enjoy high-speed Wi-Fi, a smart TV, and a private bathroom with complimentary toiletries. Ideal for a restful stay after a long day of work or exploration.",
      price: 50,
      rating: 4.2,
    },
    {
      type: "Double",
      image: "double.webp",
      desc: "A spacious and stylish double room designed for couples or friends traveling together. The room features a plush queen-size bed, a modern seating area, and large windows that offer breathtaking city or garden views. Equipped with a minibar, air conditioning, and a fully stocked coffee station, this room provides comfort and convenience.",
      price: 80,
      rating: 4.5,
    },
    {
      type: "Deluxe",
      image: "deluxe.jpeg",
      desc: "Indulge in luxury with our deluxe suite, an elegant retreat for those seeking sophistication and comfort. This suite boasts a king-size bed with premium bedding, a spacious living area, and a private balcony overlooking scenic views. Perfect for honeymooners or guests desiring a first-class experience.",
      price: 120,
      rating: 4.8,
    },
  ];

  return (
    <div className="flex flex-col justify-center  flex-1 px-72 font-inter text-fourth mt-24">
      <h1 className="text-5xl text-fourth font-extrabold mb-8">
        Popular Roomtype
      </h1>
      <Carousel className="">
        <CarouselContent className="">
          {rooms.map((room, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <PopularRoomCard
                type={room.type}
                desc={room.desc}
                price={room.price}
                rating={room.rating}
                image={room.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default PopularRoom;
