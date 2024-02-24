"use client";

import { ActiveElement, NavbarProps } from "@/types/types";
import Image from "next/image";
import { memo } from "react";
import ActiveUsers from "./currentUser/ActiveUsers";

const Navbar = ({ activeElement }: any) => {
  // const isActive = (value: string | Array<ActiveElement>) =>
  //   (activeElement && activeElement.value === value) ||
  //   (Array.isArray(value) &&
  //     value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 py-2 text-white">
      <Image src="/assets/logo.png" className="rounded-xl" alt="FigPro Logo" width={90} height={90} />
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar
  // (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
