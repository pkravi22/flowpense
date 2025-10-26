"use client";
import Image from "next/image";
import Login from "../../../components/login";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function HeroSplit() {
  const { user, token, refreshToken } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (user && refreshToken && user.companyId) {
      router.replace("/admin/dashboard");
    }
  }, [user]);
  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-2   lg:min-h-screen  bg-[url(/main.svg)] sm:bg-[url(/bgImage.png)] bg-cover bg-center">
        <div className=" p-2 md:px-12 md:py-6  ">
          <div className=""></div>
          <div className=" ">
            <Login />
          </div>
        </div>

        <div className="relative  w-[1/2] h-full bg-[#d7ce90]">
          <Image
            src="/main.svg"
            alt="Showcase"
            fill
            priority
            className=" absolute  object-contain object-center"
          />

          <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
