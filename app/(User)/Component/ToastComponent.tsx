"use client";

import { toast, ToastOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiInfo, 
  FiAlertTriangle,
  FiShoppingBag,
  FiHeart,
  FiTrash2,
  FiPackage,
  FiStar
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect } from "react";

import React from "react";



type ToastType = "success" | "error" | "info" | "warning";
type ActionType = "cart_add" | "cart_remove" | "wishlist_add" | "wishlist_remove" | "out_of_stock" | "price_drop";

interface NotifyProps {
  message?: string;
  type?: ToastType;
  duration?: number;
  action?: ActionType;
  productName?: string;
  productImage?: string;
  quantity?: number;
}

/* 🎨 Luxury Color Palette */
const COLORS = {
  ivory: "rgba(255, 253, 250, 0.97)",
  charcoal: "#1A1A1A",
  gold: "#C7B27C",
  platinum: "#E8E8E8",
  success: "#2E7D32",
  error: "#C62828",
  info: "#1565C0",
  warning: "#F57C00",
  darkCharcoal: "#0A0A0A"
};

/* 📱 Responsive Breakpoints */
const responsiveStyles = {
  mobile: {
    padding: "14px 20px",
    fontSize: "14px",
    borderRadius: "12px",
    gap: "10px",
  },
  tablet: {
    padding: "16px 24px",
    fontSize: "14.5px",
    borderRadius: "16px",
    gap: "12px",
  },
  desktop: {
    padding: "18px 28px",
    fontSize: "15px",
    borderRadius: "20px",
    gap: "14px",
  }
};

/* 🎭 Action-Specific Configurations */
const ACTION_CONFIG: Record<ActionType, {
  title: string;
  defaultMessage: string;
  icon:React.ReactNode;
  color: string;
  duration: number;
}> = {
  cart_add: {
    title: "Added to Cart",
    defaultMessage: "Item added to your shopping bag",
    icon: <FiShoppingBag className="w-5 h-5" />,
    color: COLORS.success,
    duration: 2000
  },
  cart_remove: {
    title: "Removed from Cart",
    defaultMessage: "Item removed from shopping bag",
    icon: <FiTrash2 className="w-5 h-5" />,
    color: COLORS.error,
    duration: 1800
  },
  wishlist_add: {
    title: "Added to Wishlist",
    defaultMessage: "Item saved to your wishlist",
    icon: <FiHeart className="w-5 h-5" />,
    color: COLORS.gold,
    duration: 2000
  },
  wishlist_remove: {
    title: "Removed from Wishlist",
    defaultMessage: "Item removed from wishlist",
    icon: <FiHeart className="w-4 h-4" />,
    color: COLORS.error,
    duration: 1800
  },
  out_of_stock: {
    title: "Out of Stock",
    defaultMessage: "This item is currently unavailable",
    icon: <FiPackage className="w-5 h-5" />,
    color: COLORS.warning,
    duration: 2500
  },
  price_drop: {
    title: "Price Alert",
    defaultMessage: "Price has dropped on your saved item",
    icon: <FiStar className="w-5 h-5" />,
    color: COLORS.info,
    duration: 3000
  }
};

/* 🎩 Toast Theme Styles */
const TOAST_THEME: Record<ToastType, { 
  style: ToastOptions["style"]; 
  icon: React.ReactNode;
}> = {
  success: {
    style: {
      background: COLORS.ivory,
      color: COLORS.charcoal,
      borderLeft: `4px solid ${COLORS.success}`,
    },
    icon: <FiCheckCircle className="w-5 h-5 text-green-600" />
  },
  error: {
    style: {
      background: COLORS.ivory,
      color: COLORS.error,
      borderLeft: `4px solid ${COLORS.error}`,
    },
    icon: <FiXCircle className="w-5 h-5 text-red-600" />
  },
  info: {
    style: {
      background: COLORS.ivory,
      color: COLORS.info,
      borderLeft: `4px solid ${COLORS.info}`,
    },
    icon: <FiInfo className="w-5 h-5 text-blue-600" />
  },
  warning: {
    style: {
      background: COLORS.ivory,
      color: COLORS.warning,
      borderLeft: `4px solid ${COLORS.warning}`,
    },
    icon: <FiAlertTriangle className="w-5 h-5 text-yellow-600" />
  }
};

/* 🚀 Main Notification Component */
export const notify = ({
  message,
  type = "success",
  duration,
  action,
  productName,
  productImage,
  quantity = 1
}: NotifyProps) => {
  
  // Determine responsive styles
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  const responsive = isMobile ? responsiveStyles.mobile : 
                     isTablet ? responsiveStyles.tablet : 
                     responsiveStyles.desktop;

  // Get action configuration if provided
  const actionConfig = action ? ACTION_CONFIG[action] : null;
  const finalDuration = duration || (actionConfig ? actionConfig.duration : 1600);
  const finalMessage = message || (actionConfig ? actionConfig.defaultMessage : "");

  // Build the toast content component
  const ToastContent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      {/* Icon Section */}
      <div className={`shrink-0 w-10 h-10 rounded-sm flex items-center justify-center 
        ${actionConfig ? `bg-${actionConfig.color.replace('#', '')}/10` : 'bg-gray-50'}`}>
        {actionConfig ? actionConfig.icon : TOAST_THEME[type].icon}
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        {actionConfig && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-light tracking-wider text-sm uppercase" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {actionConfig.title}
            </span>
            {quantity > 1 && (
              <span className="text-xs bg-charcoal/10 text-charcoal px-2 py-0.5 rounded-sm">
                ×{quantity}
              </span>
            )}
          </div>
        )}
        
        <p className="text-sm font-light text-charcoal/90 leading-relaxed">
          {productName ? (
            <>
              <span className="font-medium">{productName}</span> {finalMessage.toLowerCase()}
            </>
          ) : (
            finalMessage
          )}
        </p>
      </div>

      {/* Action Button for Cart Add */}
      {action === 'cart_add' && (
        <button
          onClick={() => {
            // Navigate to cart or close toast
            window.location.href = '/Cart';
          }}
          className="text-xs tracking-widest  uppercase border border-charcoal px-3 py-1.5 
                   hover:bg-charcoal hover:text-white hover:bg-black transition-all duration-300 
                   whitespace-nowrap shrink-0"
        >
          VIEW CART
        </button>
      )}
    </motion.div>
  );

  // Toast options
  const options: ToastOptions = {
    position: isMobile ? "bottom-center" : "top-right",
    autoClose: finalDuration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false, // We handle icon in custom content
    style: {
      ...(actionConfig ? {
        background: COLORS.ivory,
        color: COLORS.charcoal,
        borderLeft: `4px solid ${actionConfig.color}`,
      } : TOAST_THEME[type].style),
      fontFamily: `"Inter", "Helvetica Neue", "Segoe UI", sans-serif`,
      fontWeight: 400,
      fontSize: responsive.fontSize,
      borderRadius: responsive.borderRadius,
      padding: responsive.padding,
      boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      maxWidth: isMobile ? "90vw" : "420px",
      minWidth: isMobile ? "auto" : "380px",
      width: isMobile ? "100%" : "auto",
      margin: isMobile ? "16px" : "20px",
    },
  };

  toast(<ToastContent />, options);
};

/* 🎯 Pre-defined Action Functions */
export const toastActions = {
  addToCart: (productName?: string, quantity: number = 1) => notify({
    action: "cart_add",
    productName,
    quantity,
  }),

  removeFromCart: (productName?: string) => notify({
    action: "cart_remove",
    productName,
  }),

  addToWishlist: (productName?: string) => notify({
    action: "wishlist_add",
    productName,
  }),

  removeFromWishlist: (productName?: string) => notify({
    action: "wishlist_remove",
    productName,
  }),

  outOfStock: (productName?: string) => notify({
    action: "out_of_stock",
    productName,
  }),

  priceDrop: (productName?: string, oldPrice?: string, newPrice?: string) => notify({
    action: "price_drop",
    productName,
    message: oldPrice && newPrice 
      ? `Dropped from ${oldPrice} to ${newPrice}` 
      : "Price has been reduced",
  }),
};

/* 🎨 Custom Toast Container */
export const LuxuryToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    style={{
      width: "auto",
      maxWidth: "420px",
    }}
    toastStyle={{
      marginBottom: "12px",
      overflow: "hidden",
    }}
  />
);

/* 📱 Usage Examples:
// Basic notifications
toastActions.addToCart("Armani Silk Shirt", 2);
toastActions.removeFromCart("Designer Jeans");
toastActions.addToWishlist("Leather Handbag");
toastActions.removeFromWishlist("Wool Blazer");

// Direct usage
notify({ 
  message: "Item added successfully", 
  type: "success" 
});

// With custom action
notify({ 
  action: "cart_add", 
  productName: "Cashmere Sweater",
  quantity: 1
});
*/