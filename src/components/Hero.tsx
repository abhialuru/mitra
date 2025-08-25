import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <main className="w-full flex flex-col items-center p-5">
      <nav className="w-full flex justify-between items-center rounded-lg">
        <Link className="cursor-pointer" href="/">
          <div className="text-2xl font-bold text-violet-700">Mitra</div>
        </Link>
        <div className="flex gap-10 items-center">
          <Link
            className="cursor-pointer hidden md:inline-block"
            href="#features"
          >
            <p>Features</p>
          </Link>
          <Link className="cursor-pointer hidden md:inline-block" href="#about">
            <p>About</p>
          </Link>

          <Link className="cursor-pointer" href="/meet">
            <button className="p-3 rounded-lg bg-violet-700 text-white">
              speak now
            </button>
          </Link>
        </div>
      </nav>
      <div className="w-fit flex flex-col gap-4 items-center pt-[104px]">
        <p className="flex gap-2 justify-center items-center border rounded-full p-3">
          <span className="size-2 rounded-full bg-violet-700 inline-block" />
          <span className="text-[14px] font-bold">
            Improve your spoken English
          </span>
        </p>
        <h1 className="text-4xl lg:text-[64px] leading-[110%] text-center flex flex-col">
          <span className="flex justify-center items-center gap-[14px]">
            Your friendly <span className="text-violet-700">AI</span>
            <span className="w-fit h-[60px] md:inline-block hidden">
              <Image
                className="w-full h-full object-fill"
                src="/mitra.svg"
                alt="mitra-icons"
                width={20}
                height={20}
              />
            </span>
          </span>
          <span>
            <span className="text-violet-700">Mentor</span> for better English
          </span>
        </h1>
        <p className="text-lg text-center w-full md:w-[60%]">
          Have real conversations, get instant feedback, and boost your
          confidence with your personal AI English coach
        </p>
        <Link className="cursor-pointer" href="/meet">
          <button className="text-lg font-bold bg-violet-700 text-white rounded-xl p-3 cursor-pointer">
            Start a conversation
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Hero;
