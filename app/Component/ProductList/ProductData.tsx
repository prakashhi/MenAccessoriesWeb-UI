import Wallet from "@/public/Images/360_F_1600118914_oqH2aBI5IbROdsbTrdvEKyKfGoDcawq6.jpg"
import Bracelets from '@/public/Images/65632d1d01b9615224632afa-3pcs-love-bracelets-stainless-steel.jpg'
import Braceletssteel from '@/public/Images/stainless-steel-bracelet.jpg'
import BackRing from '@/public/Images/RBT-CERAMIC-BLACK-GOLD-DIAMOND-WEDDING-BAND-.jpg'
import chain from '@/public/Images/fbf47f095f32123b02374354153fd33a.jpg'
 import kada from '@/public/Images/gents-plain-kada.jpg'

export const ProductData = [
  {
    category: "Wallets",
    products: [
      { name: "Classic Leather Wallet", img: Wallet, price: 799 },
      { name: "Slim Card Holder Wallet", img: Wallet, price: 599 },
      { name: "Premium Bifold Wallet", img: Wallet, price: 999 },
      { name: "Vintage Brown Wallet", img: Wallet, price: 899 },
      { name: "Minimalist Black Wallet", img: Wallet, price: 749 },
    ],
  },

  {
    category: "Bracelets",
    products: [
      { name: "Stainless Steel Bracelet", img: Braceletssteel, price: 499 },
      { name: "Black Bead Bracelet", img: Bracelets, price: 349 },
      { name: "Silver Chain Bracelet", img: Braceletssteel, price: 599 },
      { name: "Leather Strap Bracelet", img: Bracelets, price: 399 },
      { name: "Gold Polished Bracelet", img: Bracelets, price: 699 },
    ],
  },

  {
    category: "Rings",
    products: [
      { name: "Black Titanium Ring", img: BackRing, price: 399 },
      { name: "Silver Matte Ring", img: BackRing, price: 449 },
      { name: "Gold Plated Ring", img: BackRing, price: 499 },
      { name: "Engraved Steel Ring", img: BackRing, price: 599 },
      { name: "Minimalist Band Ring", img: BackRing, price: 349 },
    ],
  },

  {
    category: "Neck Chains",
    products: [
      { name: "Silver Curb Chain", img:chain, price: 999 },
      { name: "Gold Finish Chain", img:chain, price: 1199 },
      { name: "Black Stainless Chain", img:chain, price: 899 },
      { name: "Rope Style Chain", img:chain, price: 1099 },
      { name: "Minimal Thin Chain", img:chain , price: 799 },
    ],
  },

  {
    category: "Kada",
    products: [
      { name: "Steel Kada", img: kada, price: 699 },
      { name: "Black Matte Kada", img: kada, price: 749 },
      { name: "Classic Silver Kada", img: kada, price: 899 },
      { name: "Gold Plated Kada", img: kada, price: 999 },
      { name: "Engraved Pattern Kada", img: kada, price: 1099 },
    ],
  },
];
