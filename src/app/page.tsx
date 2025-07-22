"use client";
import ContactPage from "./contact/page";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <div className="relative rounded-full w-5 h-5 sm:w-7 sm:7 md:w-10 md:h-10 lg:w-15 lg:h-15 transform hover:scale-105">
          <Image
            src="/images/corporate.JPG"
            alt="Joshua Belandres"
            fill
            className="object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>
      </div>
      <ContactPage />
    </div>
  );
}
