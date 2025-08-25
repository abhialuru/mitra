import Image from "next/image";
import React from "react";

function Features() {
  const features = [
    {
      img: "/microphone.svg",
      heading: "Real-Time voice conversations",
      description:
        "Talk to an AI that listens like a human. Practice real English conversations whenever you want — no appointments, no awkwardness.",
    },
    {
      img: "/feedback.svg",
      heading: "Real-Time voice conversations",
      description:
        "Get instant feedback after every chat. Improve grammar, fluency, vocabulary, and more — like a tutor in your pocket, always available.",
    },
    {
      img: "/clock.svg",
      heading: "Anytime, Anywhere",
      description:
        "Practice for interviews or chat casually. Your AI mentor is here 24/7 — no pressure, no judgment, just real conversation.",
    },
  ];

  return (
    <section id="features" className="w-full px-5">
      <p className="w-fit flex gap-2 justify-center items-center border rounded-full p-3 mx-auto">
        <span className="size-2 rounded-full bg-violet-700 inline-block" />
        <span className="text-[14px] font-bold">Features</span>
      </p>
      <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-center mt-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="w-full md:w-[50%] lg:w-[30%] flex flex-col gap-4 p-5 border rounded-4xl"
          >
            <div className="size-12">
              <Image
                src={feature.img}
                className="w-full h-full object-fill"
                alt="icons"
                width={48}
                height={48}
              />
            </div>
            <h4 className="text-lg font-bold">{feature.heading}</h4>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
