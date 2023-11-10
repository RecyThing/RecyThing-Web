import logo from "../../assets/recything-logo.png";
import app_store_badge from "../../assets/app-store-badge.svg";
import google_play_badge from "../../assets/google-play-badge.svg";

function Footer() {
  return (
    <>
      <footer className="px-4 divide-y bg-[#F6FEF6]">
        <div className="container flex flex-col justify-between py-10 lg:py-16 mx-auto gap-10 lg:flex-row lg:px-[72px]">
          <div>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-start space-x-3 lg:justify-start"
            >
              <img className="w-[198px]" src={logo} alt="" />
            </a>
            <div className="flex gap-6 mt-6 text-[20px]">
              <a href="">Download</a>
              <a href="">Tentang Kami</a>
            </div>
            <div className="flex justify-start space-x-3 gap-5 mt-6">
              <a
                rel="noopener noreferrer"
                href="#"
                title="Instagram"
                className="flex items-center p-[10px] bg-slate-300 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Facebook"
                className="flex items-center p-[10px] bg-slate-300 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Twitter"
                className="flex items-center p-[10px] bg-slate-300 rounded-full"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                title="Youtube"
                className="flex items-center p-[10px] bg-slate-300 rounded-full"
              >
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </a>
            </div>
            <div className="hidden lg:block py-6 text-sm text-start dark:text-gray-400">
              © 2023 Recything. All rights reserved
            </div>
          </div>
          <div className="flex text-sm gap-9 lg:gap-20 sm:grid-cols-4">
            <div className="space-y-3">
              <ul className="flex flex-col gap-6 lg:text-lg">
                <p className="font-bold leading-none">Pintasan</p>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Beranda
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Fitur
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Promo
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <ul className="flex flex-col gap-6 lg:text-lg">
                <p className="font-bold leading-none">Eksternal</p>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    RecyThing
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    RecyThing
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    RecyThing
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <ul className="flex flex-col gap-6 lg:text-lg">
                <p className="font-bold leading-none">Media Sosial</p>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Instagram
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Facebook
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Twitter
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 lg:flex-col">
            <a href="">
              <img className="lg:w-[196px]" src={app_store_badge} alt="" />
            </a>
            <a href="">
              <img className="lg:w-[196px]" src={google_play_badge} alt="" />
            </a>
          </div>
        </div>
        <div className="block lg:hidden py-6 text-sm text-center dark:text-gray-400">
          © 2023 Recything. All rights reserved
        </div>
      </footer>
    </>
  );
}

export default Footer;
