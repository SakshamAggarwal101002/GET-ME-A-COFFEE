import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-white text-center px-4 h-[44vh]">
        <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl font-bold">
          Buy Me a Coffee
          <span>
            <img src="/coffee.gif" width={88} alt="Coffee animation" />
          </span>
        </div>
        <p className="text-base md:text-lg">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/login">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-center"
            >
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-center"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="container mx-auto text-white pb-32 pt-14 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">Fans can buy you a coffee.</h2>
        <div className="flex flex-col md:flex-row gap-10 justify-around items-center">
          {["/man.gif", "/coin.gif", "/group.gif"].map((src, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-3 text-center max-w-xs">
              <img className="bg-slate-400 rounded-full p-2" width={88} src={src} alt="Supporter" />
              <p className="font-bold">Fans want to help</p>
              <p>Your fans are available for you to help you.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="container mx-auto text-white pb-32 pt-14 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-14">Learn more about us.</h2>
        <div className="w-full max-w-4xl aspect-video flex justify-center items-center">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/0jIeCAOkgcQ"
            title="Kávé összefoglaló - marketing videó"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
