import React from "react";

function About() {
  return (
    <section
      id="about"
      className="py-[104px] flex flex-col justify-center items-center gap-8 px-5"
    >
      <p className="w-fit flex gap-2 justify-center items-center border rounded-full p-3">
        <span className="size-2 rounded-full bg-violet-700 inline-block" />
        <span className="text-[14px] font-bold">About us</span>
      </p>
      <p className="text-xl md:text-2xl font-semibold w-full md:w-[80%] lg:w-[80%] mx-auto md:text-center">
        Our mission is simple to help you speak English with confidence. This
        AI-powered mentor listens, responds, and gives personalized feedback to
        improve your fluency, grammar, and pronunciation. No pressure, no
        judgment just real conversations that help you grow
      </p>
    </section>
  );
}

export default About;
