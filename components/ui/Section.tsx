import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    noPadding?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, noPadding = false, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(
                    "relative overflow-hidden",
                    !noPadding && "py-16 sm:py-24 md:py-32",
                    className
                )}
                {...props}
            >
                {children}
            </section>
        );
    }
);

Section.displayName = "Section";
