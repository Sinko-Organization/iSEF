import educationAnimation from "@web-app/lottie/education.json";
import Lottie from "lottie-react";
import type { FC } from "react";

const EducationLoader: FC = () => {
  return (
    <Lottie
      animationData={educationAnimation}
      loop={true}
      className="w-fit m-auto"
    />
  );
};
export default EducationLoader;
