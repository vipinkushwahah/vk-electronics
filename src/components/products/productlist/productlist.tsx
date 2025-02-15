import React, { useEffect, useState } from "react";
import ProductCard from "../product";
import axios from "axios";
import SkeletonLoader from "../../hooks/skeletonloader/skeletonloader";
import { Helmet } from "react-helmet-async"; // Import Helmet

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
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
                image: product.image,
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

            <Helmet>
                <title>Smartphones - VK Electronics</title>
                <meta name="description" content="Browse and shop the latest smartphones at VK Electronics. Get amazing deals and discounts on top mobile brands!" />
                <meta name="keywords" content="smartphones, mobile phones, electronics, VK Electronics, buy smartphones" />
                <meta property="og:title" content="Smartphones - VK Electronics" />
                <meta property="og:description" content="Explore a wide range of smartphones at VK Electronics with great offers." />
                <meta property="og:image" content="https://vk-electronics.netlify.app/default-smartphone-image.jpg" />
                <meta property="og:url" content="https://vk-electronics.netlify.app/smartphone" />
            </Helmet>

            <h2 className="product-container">Mobile Phones</h2>

            {loading && <SkeletonLoader variant="product" items={6} />}
            {error && <p className="error">{error}</p>}

            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
