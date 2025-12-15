import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";


export default function ContactComponent() {
  return (
    <div className="max-w-sm">
      {/* TITLE */}
      <h3
        className="
         text-lg font-semibold
          mb-6
        "
      >
        Contact
      </h3>

      {/* LIST */}
      <ul className="space-y-4 text-[13px] text-gray-600 leading-relaxed">
        {/* ADDRESS */}
        <li className="flex gap-3 items-start">
          <MapPin size={16} strokeWidth={1.4} className="mt-0.5 text-gray-400" />
          <span>
            Vasupujya Bungalows, 1, Opp. Bagyashree Apartments,
            <br />
            Ahmedabad, Gujarat 380015
          </span>
        </li>

        {/* PHONE */}
        <li className="flex gap-3 items-center">
          <Phone size={16} strokeWidth={1.4} className="text-gray-400" />
          <a
            href="tel:+919427599999"
            className="hover:text-black transition-colors"
          >
            +91 94275 99999
          </a>
        </li>

        {/* EMAIL */}
        <li className="flex gap-3 items-center">
          <Mail size={16} strokeWidth={1.4} className="text-gray-400" />
          <Link
            href="mailto:9rockinternational@gmail.com"
            className="hover:text-black transition-colors"
          >
            9rockinternational@gmail.com
          </Link>
        </li>
      </ul>
    </div>
  );
}
