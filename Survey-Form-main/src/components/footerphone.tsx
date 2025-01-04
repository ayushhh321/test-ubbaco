import Link from "next/link";
import React from "react";

export default function FooterPhone() {
  return (
    <div className="w-full h-auto bg-gradient-to-b from-[#ff2927] to-[#ff6730] overflow-hidden px-6 py-8 relative md:hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-[480px] h-[100px] absolute -left-20 bottom-0 origin-top-left rotate-[5.65deg] bg-white rounded-[50px]" />
        <div className="w-[480px] h-[100px] absolute -right-20 bottom-0 origin-top-left rotate-[-5.65deg] bg-white rounded-[50px]" />
        <div className="absolute inset-x-0 bottom-4 text-center text-white text-sm font-medium">
          Copyright @Ubbaco 2025
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-xl font-semibold">Contact Us</h2>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[url(/mail.png)] bg-cover" />
            <p className="text-white text-base font-medium">info@ubbaco.com</p>
          </div>
        </div>
        <p className="text-white text-base font-medium">
          We&apos;d love to hear from you! Reach out with your queries or feedback.
        </p>
      </div>

      {/* Social Media Section */}
      <div className="mt-8 flex flex-col items-start gap-4">
        <h2 className="text-white text-xl font-semibold">Get in touch</h2>
        <div className="flex gap-4 z-40">
          <Link href="https://www.instagram.com/ubbaco">
          <div className="w-10 h-10 bg-[url(/insta.png)] bg-cover " />
          </Link>
           <Link href="https://x.com/Ubbaco">
          <div className="w-10 h-10 bg-[url(/twitter.png)] bg-cover" />
           </Link>
          <Link href="https://www.linkedin.com/company/ubbaco-fashion-delivered-in-10minutes">
          <div className="w-10 h-10 bg-[url(/linkdn.png)] bg-cover " />
          </Link>
        </div>
      </div>
    </div>
  );
}
