'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    asChild?: boolean; // For future if needed (e.g. Radix Slot) - keeping simplistic now
    href?: string;     // If provided, renders as motion.a
}

// Separate component to handle 'href' logic if needed, but for now we keep it simple.
// Note: If passed 'href', we should theoretically use Link from next/link for internal routing,
// but wrapping motion around next/link requires a bit of setup.
// For now, we will assume standard button usage or external links.
// For internal links, wrap the Button in NextLink or use click handler.

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const variants = {
            primary: "bg-brand-primary text-white border border-transparent shadow-lg hover:bg-brand-dark hover:shadow-xl",
            secondary: "bg-brand-secondary text-brand-dark border border-transparent hover:bg-brand-accent hover:text-brand-primary",
            outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
            ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10",
            link: "bg-transparent text-brand-primary underline-offset-4 hover:underline p-0 h-auto",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        const baseStyles = "inline-flex items-center justify-center rounded-full font-serif font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

        return (
            <motion.button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
