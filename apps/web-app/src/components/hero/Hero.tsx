import Image from "next/image";
import React from "react";
import type { FC } from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

interface Props {
  signIn: () => void;
}

const Hero: FC<Props> = ({ signIn }) => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-5xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight xl:leading-tight ">
              Intelligent Students&apos; E-Folder
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
              The Intelligent Students&apos; E-folder is a web app that helps
              students manage their academic performance by calculating grades,
              generating honors&apos; list PDFs, and recommending courses based
              on academic performance.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                onClick={signIn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 cursor-pointer py-4 text-lg font-medium text-center text-white bg-pink-400 rounded-md "
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src="/images/e-folder.jpg"
              width="500"
              height="500"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

const Container: FC<ContainerProps> = (props) => {
  return (
    <div className={`container p-8 mx-auto xl:px-0 ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
};

export default Hero;
