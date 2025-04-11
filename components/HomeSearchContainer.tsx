"use client";
import React, { useEffect, useState } from "react";
import HomeSearchForm from "./form/HomeSearchForm";
import FilterContainer from "./FilterContainer";

function HomeSearchContainer() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`w-full   sticky top-0 bg-white z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto p-3">
        <HomeSearchForm />
        <FilterContainer />
      </div>
    </section>
  );
}

export default HomeSearchContainer;
