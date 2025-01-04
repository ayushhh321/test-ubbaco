import Link from "next/link";
import React from "react";

export default function FooterF() {
  return (
    <div className="main-container relative overflow-hidden mx-auto bg-gradient-to-b from-[#ff2626] to-[#ff6730] flex flex-col md:flex-row px-6 py-10 lg:px-16 lg:py-16">
      <div className="flex flex-col md:w-[422px] md:h-[242px] gap-[64px] items-start relative z-[1] mb-8 md:mb-0">
        <div className="flex flex-col gap-[22px] items-start relative z-[2]">
          <span className="text-[35px] font-semibold leading-[48px] text-[#f3f3f3]">
            Contact Us
          </span>
          <div className="flex gap-[15px] items-center">
            <div className="w-[30px] h-[30px] bg-[url(/mail.png)] bg-cover bg-no-repeat relative overflow-hidden" />
            <span className="text-[27px] font-normal text-[#f3f3f3]">
              info@ubbaco.com
            </span>
          </div>
        </div>
        <div className="flex gap-[15px] items-center">
          <div className="text-[24px] font-semibold leading-[36px] text-[#fff]">
            <span className="capitalize">We would </span>
            <span className="lowercase">love to hear from you! </span>
            <span className="capitalize">Reach </span>
            <span className="lowercase">out with your queries or feedback</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:w-[268px] md:h-[130px] gap-[22px] relative z-10">
        <span className="text-[35px] font-semibold leading-[48px] text-[#f3f3f3]">
          Get in touch
        </span>
        <div className="flex gap-[40px] items-center">
          <Link href="https://www.instagram.com/ubbaco">
            <div className="w-[60px] h-[60px] bg-[url(/insta.png)] bg-cover bg-no-repeat relative overflow-hidden"></div>
          </Link>
          <Link href="https://x.com/Ubbaco">
            <div className="w-[60px] h-[60px] bg-[url(/twitter.png)] bg-cover bg-no-repeat relative overflow-hidden"></div>
          </Link>
          <Link href="https://www.linkedin.com/company/ubbaco-fashion-delivered-in-10minutes">
            <div className="w-[60px] h-[60px] bg-[url(/linkdn.png)] bg-cover bg-no-repeat relative overflow-hidden"></div>
          </Link>
        </div>
        <div className="absolute left-[-80px] top-0 bottom-0 w-1 h-[230px] bg-white"></div>
      </div>

      {/* Adjusted strips with increased height and aligned edges */}
      <div className="w-[2000.33px] h-[80.32px] origin-top-left rotate-[4.13deg] opacity-10 bg-white rounded-[10px] absolute bottom-0 md:top-[370px]" />
      <div className="w-[2000.33px] h-[80.32px] origin-top-left rotate-[4.13deg] opacity-10 bg-white rounded-[10px] absolute bottom-0 md:top-[290px]" />
      <div className="w-[2000.72px] h-[80.32px] origin-top-left rotate-[175.87deg] opacity-10 bg-white rounded-[10px] absolute bottom-0 left-[1600.31px]" />
      <div className="w-[2000.72px] h-[80.32px] origin-top-left rotate-[175.87deg] opacity-10 bg-white rounded-[10px] absolute bottom-0 left-[1911.31px]" />
    </div>
  );
}
