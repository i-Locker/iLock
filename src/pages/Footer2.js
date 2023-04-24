export default function Footer() {
  return (
    <footer className="pb-4">
      <div className="max-w-6xl xl:max-w-6xl mx-auto divide-y px-4 sm:px-6 md:px-8">
        <div className="flex flex-col-reverse justify-center pt-5  lg:flex-row bg-top ">
          <ul className="flex mx-auto pt-2">
            <li>
              <a
                href="/"
                className="text-md text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
              >
                © 2021 Decentralized Pictures LLC.
              </a>
            </li>
          </ul>

          <ul className="flex mx-auto space-x-4 lg:mb-0 ">
            <li>
              <a
                href="/"
                className="text-md text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-md text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
              >
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="/"
                className="text-md text-gray-400 transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
