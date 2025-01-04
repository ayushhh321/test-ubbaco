import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="main-container w-[1440px] h-[480px] relative overflow-hidden mx-auto my-0 bg-gradient-to-b from-[#ff2626] to-[#ff6730] hidden md:flex">
      <div className="flex w-[422px] h-[242px] flex-col gap-[64px] items-start flex-nowrap absolute top-[59px] left-[64px] z-[1]">
        <div className="flex w-[268px] flex-col gap-[22px] items-start shrink-0 flex-nowrap relative z-[2]">
          <span className="h-[48px] self-stretch shrink-0 basis-auto text-[35px] font-semibold leading-[48px] text-[#f3f3f3] relative text-left whitespace-nowrap z-[3]">
            Contact Us
          </span>
          <div className="flex gap-[15px] items-center self-stretch shrink-0 flex-nowrap relative z-[4]">
            <div className="w-[30px] h-[30px] shrink-0 bg-[url(/mail.png)] bg-cover bg-no-repeat relative overflow-hidden z-[5]" />
            <span className="h-[36px] shrink-0 basis-auto  text-[27px] font-normal leading-[36px] text-[#f3f3f3] relative text-left whitespace-nowrap z-[6]">
              info@ubbaco.com
            </span>
          </div>
        </div>
        <div className="flex gap-[15px] items-center self-stretch shrink-0 flex-nowrap relative z-[7]">
          <div className="grow shrink-0 basis-0  text-[24px] font-semibold leading-[36.005px] relative text-left z-[8]">
            <span className=" text-[27px] font-normal leading-[36.005px] text-[#fff] relative text-left capitalize">
              We&apos;d
            </span>
            <span className=" text-[27px] font-normal leading-[36.005px] text-[#fff] relative text-left lowercase">
              {" "}
              love to hear from you!{" "}
            </span>
            <span className=" text-[27px] font-normal leading-[36.005px] text-[#fff] relative text-left capitalize">
              Reach
            </span>
            <span className=" text-[27px] font-normal leading-[36.005px] text-[#fff] relative text-left lowercase">
              {" "}
              out with your queries or feedback
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-[268px] h-[130px] flex-col gap-[22px] items-start flex-nowrap absolute top-[59px] left-[1023px] z-10">
        <span className="h-[48px] self-stretch shrink-0 basis-auto  text-[35px] font-semibold leading-[48px] text-[#f3f3f3] relative text-left whitespace-nowrap z-[11]">
          Get in touch
        </span>
        <div className="flex gap-[40px] items-center self-stretch shrink-0 flex-nowrap relative z-[12]">
          <Link href="https://www.instagram.com/ubbaco">
          <div className="w-[60px] h-[60px] shrink-0 bg-[url(/insta.png)] bg-cover bg-no-repeat relative overflow-hidden z-[13]"></div>
          </Link>
          <Link href="https://x.com/Ubbaco">
          <div className="w-[60px] h-[60px] shrink-0 bg-[url(/twitter.png)] bg-cover bg-no-repeat relative overflow-hidden z-[14]"></div>
          </Link>
          <Link href="https://www.linkedin.com/company/ubbaco-fashion-delivered-in-10minutes">
          <div className="w-[60px] h-[60px] shrink-0 bg-[url(/linkdn.png)] bg-cover bg-no-repeat relative overflow-hidden z-[15]"></div>
          </Link>
        </div>
        <div className="absolute left-[-80px] top-0 bottom-0 w-1 h-[230px] bg-white z-0"></div>{" "}
        {/* Main white line on the left */}
      </div>

      {/* Adjusted strips with increased height and aligned edges */}
      <div className="w-[2000.33px] h-[80.32px] origin-top-left rotate-[4.13deg] opacity-10 bg-white rounded-[10px] top-[370px] absolute" />
      <div className="w-[2000.33px] h-[80.32px] origin-top-left rotate-[4.13deg] opacity-10 bg-white rounded-[10px] top-[290px] absolute" />
      <div className="w-[2000.72px] h-[80.32px] left-[1600.31px] top-[400.99px] absolute origin-top-left rotate-[175.87deg] opacity-10 bg-white rounded-[10px]" />
      <div className="w-[2000.72px] h-[80.32px] left-[1911.31px] top-[320.99px] absolute origin-top-left rotate-[175.87deg] opacity-10 bg-white rounded-[10px]" />



    </div>
  );
}
