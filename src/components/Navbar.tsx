import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
const Navbar = async () => {
  const user = await currentUser();

  // if (!user) return <div>Not signed in</div>;

  return (
    <div className="w-full fixed justify-between items-center top-0 h-20 border-b flex px-6 lg:px-24 z-50 bg-white">
      <Link href='/' className="flex justify-center items-center">
        <Image src={logo} alt="logo" width={80}/>
        <span className="text-2xl">AiFred</span>
      </Link>
     
        {/* <Image src={user ? user?.imageUrl : ''} alt='img profile' width={64} height={64}/> */}
        <SignedIn >
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>

    </div>
  );
};

export default Navbar;
