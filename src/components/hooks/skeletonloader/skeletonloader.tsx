// SkeletonLoader.tsx
import React from "react";
import "./skeletonLoader.scss";

interface SkeletonLoaderProps {
    variant: "product" | "gadget" | "home-appliance"; // To distinguish between product and gadget loaders
    items?: number; // To control how many skeleton loaders to display (optional)
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant, items = 1 }) => {
    return (
        <>
            <div className="skeleton-loader">
                {[...Array(items)].map((_, index) => (
                    <div key={index} className={`skeleton-${variant}-card`}>
                        <div className={`skeleton-${variant}-image`}></div>
                        <div className={`skeleton-${variant}-details`}>
                            <div className={`skeleton-${variant}-title`}></div>
                            <div className={`skeleton-${variant}-price`}></div>
                            <div className={`skeleton-${variant}-description`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SkeletonLoader;
