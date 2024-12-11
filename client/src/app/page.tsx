
import AboutSection from "@/components/home/AboutSection ";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/testimonials";
import { useAppSelector } from "@/hooks/redux/redux-toolkit";
import { RootState } from "@/redux/store";
import { GPTmenu } from "@/utils/data";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  // const jsonString = JSON.stringify(GPTmenu);
  // console.log(jsonString);


  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedDishes />
        {/* <Testimonials /> */}
      </main>
    </>

  )
};

export default page;
// npm install redux-persist
