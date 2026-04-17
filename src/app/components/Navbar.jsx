"use client";
import Link from "next/link";
import React from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useWishlist } from "@/app/hooks/useWishlist";
import { useLogoutUserMutation } from "@/redux/services/authApi";
import { useGetCartQuery } from "@/redux/services/cartApi";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const { user, isLoading } = useAuth();
  const { wishlistCount } = useWishlist();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const { data: cartData } = useGetCartQuery(undefined, { skip: !user });
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const cartItems = Array.isArray(cartData) ? cartData : cartData?.data || [];
  const cartCount = cartItems.reduce((sum, cart) => {
    const quantityFromItems = (cart?.products || []).reduce(
      (itemSum, item) => itemSum + (Number(item?.quantity) > 0 ? Number(item.quantity) : 0),
      0
    );
    return sum + quantityFromItems;
  }, 0);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call logout API - the mutation handles cache clearing
      await logoutUser().unwrap();
      
      // Navigate after logout completes
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still navigate even if logout fails
      router.push("/");
    }
  };

  const navItem = (
    <>
      <li>
        <Link
          href={"/shop"}
          className="text-white/80 transition hover:bg-transparent hover:text-[#D4AF37]"
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className="text-white/80 transition hover:bg-transparent hover:text-[#D4AF37]"
        >
          About Us
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full">
        <div className="container max-w-screen-2xl">
          <div className="navbar py-5 rounded-2xl border border-[#D4AF37]/15 bg-[#111111]/95 text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="navbar-start px-2 md:px-6">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost text-white hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box border border-[#D4AF37]/15 bg-[#171717] p-2 shadow-xl"
                >
                  {navItem}
                </ul>
              </div>

              <Link href={"/"} className="btn btn-ghost gap-1 text-xl hover:bg-transparent">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#D4AF37] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  D
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#c9a42f] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  O
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#b89220] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  R
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#D4AF37] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  P
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#c9a42f] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  O
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#b89220] text-sm font-bold text-black sm:h-5 sm:w-5 sm:text-sm md:h-8 md:w-8 md:text-2xl">
                  N
                </span>
              </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItem}</ul>
            </div>

            <div className="hidden md:block">
              <label className="flex items-center gap-3 rounded-xl border border-[#D4AF37]/15 bg-[#171717] px-3 py-2 text-white">
                <svg
                  className="h-[1em] opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>

                <input
                  type="search"
                  className="grow bg-transparent text-white placeholder:text-white/40 focus:outline-none"
                  placeholder="Search"
                />
              </label>
            </div>

            <div className="navbar-end flex items-center gap-1 md:gap-2.5 md:px-10">
              {/* <div>
                <label className="swap swap-rotate text-white">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    checked={theme === "dark"}
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  />

                  <svg
                    className="swap-off h-7 w-7 fill-current text-[#D4AF37]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  <svg
                    className="swap-on h-7 w-7 fill-current text-[#D4AF37]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div> */}

              <div className="h-8 w-8 flex items-center justify-center">
                <Link
                  href={"/wishlist"}
                  className="relative inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-[#D4AF37]"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-black text-[10px] leading-[18px] font-bold text-center">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="h-8 w-8 flex items-center justify-center">
                <Link
                  href={"/cart"}
                  className="relative inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-[#D4AF37]"
                >
                  <CgShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-black text-[10px] leading-[18px] font-bold text-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>

              <div className="h-8 w-8 flex items-center justify-center">
                {isLoading ? (
                  <div className="animate-pulse h-8 w-8 flex items-center justify-center">
                    <FaUserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                ) : user ? (
                  <div className="dropdown dropdown-end h-8 w-8 flex items-center justify-center">
                    <button className="flex h-8 w-8 items-center justify-center text-white hover:text-[#D4AF37] transition focus:outline-none">
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-sm">
                        {user?.first_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                      </div>
                    </button>
                    <ul className="dropdown-content mt-2 top-full right-0 z-[60] menu p-2 shadow bg-[#171717] rounded-box w-52 border border-[#D4AF37]/15">
                      <li className="mb-1">
                        <div className="text-white/70 text-xs pointer-events-none">
                          {user?.first_name} {user?.last_name}
                        </div>
                        <div className="text-white/50 text-xs pointer-events-none">
                          {user?.email}
                        </div>
                      </li>
                      <li><Link href="/profile/user" className="text-white hover:text-black hover:bg-[#D4AF37]">My Profile</Link></li>
                      <li><Link href="/cart" className="text-white hover:text-black hover:bg-[#D4AF37]">My Cart</Link></li>
                      <li><Link href="/orders" className="text-white hover:text-black hover:bg-[#D4AF37]">My Orders</Link></li>
                      <li><button onClick={handleLogout} disabled={isLoggingOut} className={`text-white hover:text-black hover:bg-red-500 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}>{isLoggingOut ? 'Logging out...' : 'Logout'}</button></li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={`/signin?redirect=${encodeURIComponent(pathname || "/")}`}
                    className="btn rounded-full border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-[#c9a42f]"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;