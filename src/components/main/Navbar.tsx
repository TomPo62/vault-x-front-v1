'use client'
import Link from "next/link";
import { useState } from "react";
import { ImUpload2 } from "react-icons/im";
import SearchBar from "../ui/SearchBar";
import BetaIndicator from "../ui/BetaIndicator";
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-[99] md:bg-opacity-90 backdrop-blur-xl md:backdrop-blur-md transition duration-300 ease-in-out pb-4 sm:pb-0">
        <BetaIndicator/>

    <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 text-primary">
      <div className="flex flex-row items-center justify-between p-4">
        <Link
          href="/"
          className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline font-[family-name:var(--font-geist-sans)]"
        >
          <span className="text-4xl tracking-tighter md:text-4x1 lg:text-3xl">
            Veltyr
          </span>
        </Link>
        <button
          className="text-primary cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none "
          type="button"
          aria-label="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e2e2e2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <div
        className={
          "md:flex flex-grow items-center" +
          (navbarOpen ? " flex" : " hidden")
        }
      >
        <nav className="flex-col flex-grow ">
          <ul className="flex flex-grow justify-end flex-wrap items-center">
            <li className="mr-6">
              <SearchBar/>
            </li>

            <li>
              <Link
                href="/public-files"
                className="font-medium text-primary hover:text-first-hover px-5 py-3 flex items-center transition-one"
              >
                Files
              </Link>
            </li>
            <li>
              <Link
                href="/veltyr-docs"
                className="font-medium text-primary hover:text-first-hover px-5 py-3 flex items-center transition-one"
              >
                Docs
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center px-4 py-2 mt-2 font-medium text-background transition-one bg-primary hover:bg-first-hover rounded text-md md:mt-0 md:ml-4"
                href="/upload"
              >
                <span className="justify-center" >Upload</span>
                <ImUpload2 className="w-4 h-4 ml-2" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </nav>
  )
}
