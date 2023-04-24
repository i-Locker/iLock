import React from "react";

if (typeof window === "object") {
  // Burger menus
  document.addEventListener("DOMContentLoaded", function () {
    // open
    const burger = document.querySelectorAll(".navbar-burger");
    const menu = document.querySelectorAll(".navbar-menu");

    if (burger.length && menu.length) {
      for (var i = 0; i < burger.length; i++) {
        burger[i].addEventListener("click", function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }

    // close
    const close = document.querySelectorAll(".navbar-close");
    const backdrop = document.querySelectorAll(".navbar-backdrop");

    if (close.length) {
      for (var i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }

    if (backdrop.length) {
      for (var i = 0; i < backdrop.length; i++) {
        backdrop[i].addEventListener("click", function () {
          for (var j = 0; j < menu.length; j++) {
            menu[j].classList.toggle("hidden");
          }
        });
      }
    }
  });
}

export default function Nav() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div>
      <nav class="max-w-7xl mx-auto relative px-4 py-4 flex justify-between items-center bg-white">
        <a
          href="/"
          className=" text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
        >
          <h1 className="text-5xl Avenir tracking-tighter text-gray-900 md:text-4x1 lg:text-5xl">
            illoMX
          </h1>
        </a>
        <div class="lg:hidden">
          <button class="navbar-burger flex items-center text-gray-400 p-3">
            <svg
              class="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a
              class="text-base text-gray-400 hover:text-gray-500 font-light"
              href="/market"
            >
              market3
            </a>
          </li>

          <li>
            <a
              class="text-md text-gray-400 hover:text-gray-500 font-light"
              href="/dashboard"
            >
              dashboard
            </a>
          </li>

          <li>
            <a
              class="text-md text-gray-400 hover:text-gray-500 font-light"
              href="/faq"
            >
              faq
            </a>
          </li>
        </ul>

        <a
          class="hidden lg:inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 inline-flex items-center px-10 py-3 font-semibold text-white   active:bg-blue-600 rounded-md text-md transition duration-200"
          href="#"
        >
          Connect
        </a>
      </nav>
    </div>
  );
}
