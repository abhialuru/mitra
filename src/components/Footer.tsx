import React from "react";

function Footer() {
  return (
    <footer className="w-full pt-[104px]">
      <div className="flex flex-col gap-8 justify-center items-center">
        <h1 className="text-3xl font-bold w-fit">
          Start Your First Conversation Today
        </h1>
        <button className="w-fit text-lg font-bold bg-violet-700 text-white rounded-xl p-3">
          Start a conversation
        </button>
      </div>
      <div className="px-10 flex gap-8 pt-[104px] pb-10">
        <div className="text-lg font-bold text-violet-700">Mitra</div>
        <p>&copy; 2025 All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
