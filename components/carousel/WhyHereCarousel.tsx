"use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LogoOutdoor from "@/public/images/illustrations/outdoor.png";
import LogoPark from "@/public/images/illustrations/playzone.png";
import LogoTowel from "@/public/images/illustrations/towel.png";
import LogoPlate from "@/public/images/illustrations/plate.png";
import LogoFamily from "@/public/images/illustrations/family.png";

import Autoplay from "embla-carousel-autoplay";
import WhyHereCard from "../carouselCard/WhyHereCard";
function WhyHereCarousel() {
  return (
    <div className="w-full -ml-4 mt-3 border-b border-gray-300 flex flex-col">
      <h1 className="text-2xl font-bold">The Joy of Staying Here</h1>
      <Carousel
        className="w-full mt-6 -mb-10"
        plugins={[
          Autoplay({
            delay: 3500,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <WhyHereCard
              imageSrc={LogoOutdoor}
              headerText="Perfect for Nature Lovers"
              text="Just 850 m to Lumintang Park and 2.3 km to Puputan Badung Square."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <WhyHereCard
              imageSrc={LogoPark}
              headerText="Close to Amusement Parks"
              text="Only 2 km to Citraland Waterpark."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <WhyHereCard
              imageSrc={LogoPlate}
              headerText="Easy access to find diner"
              text="In front of hotel there many diner"
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <WhyHereCard
              imageSrc={LogoFamily}
              headerText="Great for Group Stays"
              text="Enjoy fantastic facilities like a spacious living room."
            />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <WhyHereCard
              imageSrc={LogoTowel}
              headerText="Ideal for Relaxation"
              text="Pamper yourself with spa, wellness, and more."
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default WhyHereCarousel;
