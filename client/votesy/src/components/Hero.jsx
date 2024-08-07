import VoteButton from "./VoteButton";
import { himg } from "../assets";

const Hero = () => {
  return (
    <section
      className="w-full flex flex-col relative mx-auto px-5 md:px-10 lg:px-15 container pt-[150px] pb-[100px] -mt-[5.25]"
      id="hero"
    >
      <div className="max-w-[62rem] mx-auto text-center">
        <h1 className="mb-6 font-semibold text-[2.5rem] leading-[3.26rem] md:leading-[3.75rem] md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem] text-gray-700">
          Vote for your  
          <span className="inline-block relative text-pink-600">&nbsp;Favorite</span>
          contestant for the online Brand Ambassador Program
        </h1>
        <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
          Support your favorite contestant to win the online Brand Ambassador
          program
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
          <VoteButton />
        </div>
      </div>
      <div className="flex flex-col mt-6 sm:flex-row items-center justify-center sm:gap-5 sm:mt-8 lg:justify-start border-solid border-4 border-pink-600 rounded-lg py-2">
        <img
          src={himg}
          className="w-full"
          alt="hero-image"
          width={1440}
          height={1800}
        />
      </div>
    </section>
  );
};

export default Hero;
