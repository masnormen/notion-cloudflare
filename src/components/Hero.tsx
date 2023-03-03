/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";

import cn from "@/lib/cn";

interface HeroProps {
  postTitle?: string;
}

function Hero({ postTitle }: HeroProps) {
  return (
    <header
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-background",
        postTitle ? "h-fit py-28 px-4" : "h-screen"
      )}
    >
      {/* Green Rectangle */}
      <div className="animate-slowspin-30 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-tertiary md:h-4/6" />

      {/* Pink Rectangle */}
      <div className="animate-slowspin filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-secondary md:h-4/6" />

      {/* Yellowish Rectangle */}
      <div className="animate-slowspin-60 filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] bg-quaternary md:h-4/6" />

      {/* Circle */}
      <div className="animate-slowspin-rev bg-pattern-wavy filter-noisy absolute z-0 flex aspect-square h-3/6 max-h-[75vw] items-center justify-center rounded-full bg-background shadow-sm md:h-[70%]">
        <svg
          viewBox="0 0 100 100"
          className="aspect-square h-[80%] font-mono text-[0.41rem] font-bold uppercase text-stroke opacity-25"
        >
          <defs>
            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text fill="currentColor">
            <textPath xlinkHref="#circle">Lorem ipsum dolor sit amet consectetur adipiscing elit !</textPath>
          </text>
        </svg>
      </div>

      {/* Image Portrait */}
      {!postTitle && (
        <picture className="pointer-events-none absolute bottom-0 z-10 flex h-screen w-full select-none items-end justify-center">
          <source
            className="filter-noisier ml-1 h-4/6 w-fit select-none object-contain drop-shadow-2xl md:ml-2"
            srcSet="/portrait.webp"
            type="image/webp"
          />
          <img
            className="filter-noisier ml-1 h-4/6 w-fit select-none object-contain drop-shadow-2xl md:ml-2"
            alt="Portrait of Me"
            src="/portrait.png"
          />
        </picture>
      )}

      {/* Title text */}

      {postTitle ? (
        <div className="shadow-xs z-30 max-w-screen-lg bg-background bg-opacity-70 py-4 text-center duration-300">
          <h1 className="inline decoration-clone text-center font-fancy text-4xl tracking-wide text-stroke drop-shadow-sm sm:text-6xl sm:!leading-[1.3] md:p-4">
            {postTitle}
          </h1>
        </div>
      ) : (
        <Link href="/" className="z-30 max-w-screen-lg">
          <div className="shadow-xs text-center drop-shadow-md duration-300 hover:-rotate-6">
            <h1 className="filter-gooey inline bg-background decoration-clone p-4 pb-3 text-center font-fancy text-[12vw] !leading-[1.4] tracking-wide text-stroke sm:text-7xl sm:!leading-[1.25]">
              <span>Nourman</span>
              <br />
              <span>Hajar</span>
            </h1>
          </div>
        </Link>
      )}

      {!postTitle && (
        <>
          {/* Software Engineer text */}
          <div className="absolute left-1/2 top-1/4 z-20 flex -translate-x-1/2 -translate-y-3/4 flex-col items-center justify-center text-center md:top-[80%] md:-translate-y-28 md:-translate-x-64">
            <div className="mt-2 rotate-[-2deg] drop-shadow-lg duration-300 hover:rotate-[5deg]">
              <h2 className="filter-gooey inline rounded bg-stroke decoration-clone px-3 pt-2 pb-3 text-center font-mono text-2xl text-highlight md:text-[1.4rem]">
                software_
                <br />
                engineer();
              </h2>
            </div>
          </div>

          {/* Indonesia text */}
          <div className="absolute right-1/2 top-3/4 z-20 flex translate-x-1/2 -translate-y-3/4 flex-col items-center justify-center text-center md:translate-x-72 md:-translate-y-16">
            <div className="mt-2 rotate-6 drop-shadow-lg duration-300 hover:-rotate-6 md:rotate-6">
              <h2 className="filter-gooey whitespace-nowrap rounded bg-tertiary px-4 py-2 text-center text-lg text-stroke">
                based in Indonesia 🇮🇩
              </h2>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Hero;
