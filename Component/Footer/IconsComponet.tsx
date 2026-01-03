import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";

 

export default function SocialIcons() {
  const icons = [
    {
      Icon: Facebook,
      label: "Facebook",
      link: "https://www.facebook.com/9rockamd/",
    },
    {
      Icon: Instagram,
      label: "Instagram",
      link: "https://www.instagram.com/9rockstudio/",
    },
    {
      Icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/company/9rock/about/",
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      link: "https://wa.me/9427599999",
    },
  ];

  return (
    <div className="flex gap-3 mt-6">
      {icons.map(({ Icon, label ,link}, i) => (
        <Link
          key={i}
          href={link}
          aria-label={label}
          className="
            group
            w-9 h-9
            flex items-center justify-center
            rounded-full
            border border-gray-200
            text-gray-500
            bg-white
            transition-all duration-300 ease-out
            hover:border-black
            hover:text-black
            hover:-translate-y-0.5
          "
        >
          <Icon
            size={16}
            strokeWidth={1.4}
            className="
              transition-transform duration-300 ease-out
              group-hover:scale-110
            "
          />
        </Link>
      ))}
    </div>
  );
}
