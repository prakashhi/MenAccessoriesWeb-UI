import SocialIcons from "./IconsComponet";
import ContactComponent from "./ContectComponet";
import { UsePanel } from "@/context/Context";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Footer() {
  const { CateMateListState, userDataContext, setLoginModel } = UsePanel();

  const router = useRouter();

  const handleOrderTrack = (e: React.MouseEvent) => {
    if (userDataContext.info) {
      router.push("/accountInfo?tab=orders");
    } else {
      // ✅ Save redirect path
      localStorage.setItem("postLoginRedirect", "/accountInfo?tab=orders");

      setLoginModel((prev) => ({
        ...prev,
        LoginModel: true,
      }));
    }
  };
  return (
    <>
      <footer className="bg-white text-black pt-12 pb-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Men Accessories</h2>
            <p className="text-sm text-gray-600 leading-6">
              Premium men’s bracelet, rings, brooch & grooming essentials.
            </p>

            {/* SOCIAL ICONS */}
            <SocialIcons />
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {CateMateListState.MenCategory.map((val, index) => (
                <li key={index}>
                  <Link
                    href={`/category/${val.id}`}
                    className="hover:text-black transition"
                  >
                    {val.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button
                  onClick={handleOrderTrack}
                  className="hover:text-black cursor-pointer transition"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="hover:text-black transition"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-black transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <ContactComponent />
        </div>

        {/* BOTTOM */}
        {/* <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Men Accessories. All Rights Reserved.
        </div> */}
      </footer>
    </>
  );
}
