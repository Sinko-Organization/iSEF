import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface Props {
  signIn: () => void;
}

const Navbar: FC<Props> = ({ signIn }) => {
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-gray-900">
                    <span>
                      <Image
                        src="/images/isef-logo.png"
                        alt="N"
                        width="120"
                        height="120"
                        className="w-8"
                      />
                    </span>
                  </span>
                </Link>
              </div>
            </>
          )}
        </Disclosure>

        <div
          onClick={signIn}
          className="hidden cursor-pointer px-6 py-2 text-white bg-pink-400 rounded-md md:ml-5 mr-3 space-x-4 lg:flex nav__item"
        >
          Sign In
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
