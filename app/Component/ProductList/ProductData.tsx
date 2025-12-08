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
      { id:1,name: "Classic Leather Wallet", img: Wallet, price: 799 ,rating:4.5},
      { id:2,name: "Slim Card Holder Wallet", img: Wallet, price: 599 ,rating:4.0},
      { id:3,name: "Premium Bifold Wallet", img: Wallet, price: 999, rating:3.5 },
      { id:4,name: "Vintage Brown Wallet", img: Wallet, price: 899 ,rating:4.2 },
      { id:5,name: "Minimalist Black Wallet", img: Wallet, price: 749 ,rating:3.8 },
      { id:6,name: "Classic Leather Wallet", img: Wallet, price: 799 ,rating:4.5 },
      { id:7,name: "Slim Card Holder Wallet", img: Wallet, price: 599 , rating:4.0 },
      { id:8,name: "Premium Bifold Wallet", img: Wallet, price: 999 , rating:3.5 },
      { id:9,name: "Vintage Brown Wallet", img: Wallet, price: 899 , rating:4.2 },
      { id:10,name: "Minimalist Black Wallet", img: Wallet, price: 749, rating:3.8 },
    ],
  },

  {
    category: "Bracelets",
    products: [
      { id:11,name: "Stainless Steel Bracelet", img: Braceletssteel, price: 499 },
      { id:12,name: "Black Bead Bracelet", img: Bracelets, price: 349 },
      { id:13,name: "Silver Chain Bracelet", img: Braceletssteel, price: 599 },
      { id:14,name: "Leather Strap Bracelet", img: Bracelets, price: 399 },
      { id:15,name: "Gold Polished Bracelet", img: Bracelets, price: 699 },
    ],
  },

  {
    category: "Rings",
    products: [
      { id:16,name: "Black Titanium Ring", img: BackRing, price: 399 },
      { id:17,name: "Silver Matte Ring", img: BackRing, price: 449 },
      { id:18,name: "Gold Plated Ring", img: BackRing, price: 499 },
      { id:19,name: "Engraved Steel Ring", img: BackRing, price: 599 },
      { id:20,name: "Minimalist Band Ring", img: BackRing, price: 349 },
    ],
  },

  {
    category: "Neck Chains",
    products: [
      {id:21, name: "Silver Curb Chain", img:chain, price: 999 },
      {id:22, name: "Gold Finish Chain", img:chain, price: 1199 },
      {id:23, name: "Black Stainless Chain", img:chain, price: 899 },
      { id:24,name: "Rope Style Chain", img:chain, price: 1099 },
      {id:25, name: "Minimal Thin Chain", img:chain , price: 799 },
    ],
  },

  {
    category: "Kada",
    products: [
      { id:26,name: "Steel Kada", img: kada, price: 699 },
      { id:27,name: "Black Matte Kada", img: kada, price: 749 },
      { id:28,name: "Classic Silver Kada", img: kada, price: 899 },
      { id:29,name: "Gold Plated Kada", img: kada, price: 999 },
      { id:30,name: "Engraved Pattern Kada", img: kada, price: 1099 },
    ],
  },
];
