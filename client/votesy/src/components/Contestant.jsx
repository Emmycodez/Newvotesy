import { contestants } from "../constants";
import EachContestant from "./EachContestant";
import ClickVote from "./ClickVote";

const Contestant = () => {
  return (
    <section
      className="bg-pink-600 pt-12 sm:pt-16 lg:pt-20 xl:pt-24 px-4 sm:px-6 lg:px-8 mx-auto sm:pb-20 lg:pb-22 py-12 sm:py-16 lg:py-20 xl:py-32"
      id="our-products border-3"
    >
      <div className="max-w-screen-xl mx-auto text-center lg:max-w-3xl mb-[70px]">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          OUR CONTESTANTS
        </h2>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 max-w-sm justify-center items-center mx-auto mt-12 text-center sm:mt-16 lg:max-w-none lg:text-left md:items-start gap-8 md:gap-12 py">
        {contestants.map((item) => (
          <div key={item.id}>
            <EachContestant name={item.name} image={item.image} />
            <div className="text-sm font-normal text-gray-700 mt-2 sm:text-base sm:mt-3 text-center h-14 py-[10px]">
              <ClickVote />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contestant;
