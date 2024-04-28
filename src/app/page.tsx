import ShinyButton from "@/components/ShinyButton";
import Image from "next/image";
import bigLogo from "@/assets/big-logo.png";
import preview from "@/assets/preview.png";
import mock from "@/assets/mock.png";
import chat from "@/assets/chat-portrait.png";
export default async function Home() {
  return (
    <>
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
            First AI lackey for daily time organization. Empower yourself with
            our cutting-edge tool for efficient time management.
          </p>
          <ShinyButton />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={bigLogo}
            alt="logo"
            width={400}
            className="lg:w-[800px]"
          />
        </div>
      </div>

      <div className="flex max-w-[1400px] flex-col lg:flex-col w-full mt-48 lg:pt-24 mx-auto min-h-screen p-4">
        <h2 className="text-4xl lg:text-7xl text-center text-balance  mx-auto ">
          Accessebility & Comfort
        </h2>
        <h3 className="text-2xl lg:ext-4xl text-center text-balance mt-12 lg:w-1/2 mx-auto ">
          Aifred is tool built on top of Google Calendar
        </h3>
        <p className="text-center text-balance lg:w-1/2 my-12 mx-auto">
          Not as any other time management tool where you need to add all your
          events by yourself. We did all this job for you:)
        </p>
        <div className="flow-root sm:mt-24 justify-center items-center">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              src={preview}
              width={1905}
              height={917}
              alt="dashboard preview"
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8  shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>

      <div className="flex max-w-[1400px] flex-col lg:flex-row w-full lg:pt-24 mx-auto h-screen">
        <div className="flex-1 flex justify-center flex-col items-center lg:items-start gap-6 p-4">
          <h3 className=" text-4xl">Priority your tasks!</h3>
          <div className="w-full h-[2px] bg-black opacity-50 "></div>
          <p className=" text-center lg:text-start text-balance lg:text-lg">
            Prioritize your tasks and events by assigning them distinct colors.
            This feature facilitates quick identification of what truly matters
            and provides Aifred with additional context for your day, enhancing
            its optimization.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={mock}
            alt="dashboard preview"
            quality={100}
            width={354}
            height={706}
          />
        </div>
      </div>

      <div className="flex max-w-[1400px] flex-col lg:flex-row w-full lg:pt-24 mx-auto h-screen mt-16 p-4">
        <div className="flex-1 flex justify-center items-center order-2 lg:order-1">
          <Image
            src={chat}
            alt="dashboard preview"
            quality={100}
            width={354}
            height={706}
          />
        </div>
        <div className="flex-1 flex justify-center flex-col items-start gap-6 order-1 lg:order-2">
          <h3 className="text-4xl">Let Aifred to help you!</h3>
          <div className="w-full h-[2px] bg-black opacity-50  "></div>
          <p className="text-center lg:text-start text-balance lg:text-lg">
            Engage in conversations with Aifred for swift access to your
            schedule. Request event additions, deletions, and day optimization
            effortlessly. Say goodbye to the hassle of overlapping tasks and
            feeling overwhelmed!
          </p>
        </div>
      </div>
    </>
  );
}
