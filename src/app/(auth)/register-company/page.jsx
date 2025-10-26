"use client";
import Image from "next/image";
import Signup from "../../../components/Signup";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegisterCompany from "@/components/RegisterCompany";
export default function HeroSplit() {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:min-h-screen bg-[url(/signup.svg)] sm:bg-[url(/bgImage.png)] bg-cover bg-center">
        <div className=" p-2 md:px-12 md:py-6  ">
          <div className=""></div>
          <RegisterCompany />
        </div>

        <div className="relative  w-[1/2] h-full">
          <Image
            src="/signup.svg"
            alt="Showcase"
            fill
            priority
            className=" absolute  object-cover object-center"
          />

          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
