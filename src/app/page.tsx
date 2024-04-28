import ShinyButton from "@/components/ShinyButton";
import Image from "next/image";
import bigLogo from "@/assets/big-logo.png";
export default async function Home() {
  return (
    <div className="flex max-w-[1400px] flex-col lg:flex-row w-full lg:pt-24 mx-auto h-screen">
      <div className="flex-1 p-4 flex flex-col items-center lg:items-start">
        {" "}
        <h1 className=" w-full flex flex-col lg:flex-row items-center lg:items-center lg:gap-6 mt-24 lg:mt-32 text-[75px] lg:text-[100px]">
          <span className="font-light ">Meet</span>{" "}
          <span className=" bg-gradient-to-r from-indigo-500 to-purple-500 font-bold inline-block text-transparent bg-clip-text">
            Aifred
          </span>
        </h1>
        <p className="lg:text-xl  mt-2 lg:mt-5 mb-8 lg:mb-12 lg:text-start text-center text-balance">
          First AI lackey for daily time organization. Empower yourself with our
          cutting-edge tool for efficient time management.
        </p>
        <ShinyButton />
      </div>
      <div className="flex-1 flex justify-center items-start">
        <Image src={bigLogo} alt="logo" width={400} className="lg:w-[800px]" />
      </div>
    </div>
  );
}
