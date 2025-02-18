import React, { useEffect, useState } from "react";
import ProductCard from "../product";
import axios from "axios";
import SkeletonLoader from "../../hooks/skeletonloader/skeletonloader";

interface Product {
    _id: string;
    title: string;
    description: string;
    image?: string; // URL image
    images?: Array<{ data: string }>; // Base64 encoded image(s)
    price: number;
    mrp: number;
    discount: number;
    bankOffer?: number;
    bankname?: string;
    colorVariants?: string;
    textColor?: string;
    bgColor?: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://vk-electronics-backend.onrender.com/products/smartphone");
            const formattedProducts = response.data.map((product: any) => ({
                _id: product._id,
                title: product.name,
                description: product.description,
                image: product.image || product.images?.[0]?.data || "",  // Ensure the image source is handled correctly
                price: product.price,
                mrp: product.mrp || product.price,
                discount: product.discount || 0,
                bankOffer: product.bankOffer || 0,
                bankname: product.bankname || "",
                colorVariants: product.colorVariants || "",
                textColor: product.textColor || "#000000",
                bgColor: product.bgColor || "#ffffff",
            }));

            setProducts(formattedProducts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`https://vk-electronics-backend.onrender.com/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div>
            <h2 className="product-container">Mobile Phones</h2>

            {loading && <SkeletonLoader variant="product" items={6} />}
            {error && <p className="error">{error}</p>}

            <div className="product-list">
                {products.map((product) => {
                    return (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onDelete={handleDelete}
                        />
                    );
                })}
            </div>
        </div>
    );
};


export default ProductList;
