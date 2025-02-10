import ProductCard from "../product";

const products = [
    {
        id: 1,
        title: "iQOO Z9x 5G (Tornado Green, 4GB RAM, 128GB Storage)",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv7WOHfR5H1x0IyUFDZgmi6lBmnvF26U_iWpD1y5FGi1ZIePBDZ7ePD2vab_FPwgCGSFsKlgXtF3gEf1Vhk9BJ7MNmhmC_UvDQH3o3iukP",
        // rating: 4.2,
        // reviews: 6107,
        // bought: "2K+",
        price: 11999,
        mrp: 17999,
        discount: 33,
        bankOffer: 10999,
        // deliveryDate: "Wed, 12 Feb",
        // fastestDelivery: "Tue, 11 Feb",
        colorVariants: "+1 other color/pattern",
    },
    {
        id: 2,
        title: "iQOO Z9 Lite 5G (Mocha Brown, 4GB RAM, 128GB Storage)",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv7WOHfR5H1x0IyUFDZgmi6lBmnvF26U_iWpD1y5FGi1ZIePBDZ7ePD2vab_FPwgCGSFsKlgXtF3gEf1Vhk9BJ7MNmhmC_UvDQH3o3iukP",
        // rating: 4.0,
        // reviews: 3191,
        // bought: "4K+",
        price: 10499,
        mrp: 14499,
        discount: 28,
        bankOffer: 9999,
        // deliveryDate: "Wed, 12 Feb",
        // fastestDelivery: "Tomorrow, 10 Feb",
        colorVariants: "+1 other color/pattern",
    },
    {
        id: 2,
        title: "iQOO Z9 Lite 5G (Mocha Brown, 4GB RAM, 128GB Storage)",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv7WOHfR5H1x0IyUFDZgmi6lBmnvF26U_iWpD1y5FGi1ZIePBDZ7ePD2vab_FPwgCGSFsKlgXtF3gEf1Vhk9BJ7MNmhmC_UvDQH3o3iukP",
        // rating: 4.0,
        // reviews: 3191,
        // bought: "4K+",
        price: 10499,
        mrp: 14499,
        discount: 28,
        bankOffer: 9999,
        // deliveryDate: "Wed, 12 Feb",
        // fastestDelivery: "Tomorrow, 10 Feb",
        colorVariants: "+1 other color/pattern",
    },
    {
        id: 2,
        title: "iQOO Z9 Lite 5G (Mocha Brown, 4GB RAM, 128GB Storage)",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv7WOHfR5H1x0IyUFDZgmi6lBmnvF26U_iWpD1y5FGi1ZIePBDZ7ePD2vab_FPwgCGSFsKlgXtF3gEf1Vhk9BJ7MNmhmC_UvDQH3o3iukP",
        // rating: 4.0,
        // reviews: 3191,
        // bought: "4K+",
        price: 10499,
        mrp: 14499,
        discount: 28,
        bankOffer: 9999,
        // deliveryDate: "Wed, 12 Feb",
        // fastestDelivery: "Tomorrow, 10 Feb",
        colorVariants: "+1 other color/pattern",
    },
    {
        id: 2,
        title: "iQOO Z9 Lite 5G (Mocha Brown, 4GB RAM, 128GB Storage)",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv7WOHfR5H1x0IyUFDZgmi6lBmnvF26U_iWpD1y5FGi1ZIePBDZ7ePD2vab_FPwgCGSFsKlgXtF3gEf1Vhk9BJ7MNmhmC_UvDQH3o3iukP",
        // rating: 4.0,
        // reviews: 3191,
        // bought: "4K+",
        price: 10499,
        mrp: 14499,
        discount: 28,
        bankOffer: 9999,
        // deliveryDate: "Wed, 12 Feb",
        // fastestDelivery: "Tomorrow, 10 Feb",
        colorVariants: "+1 other color/pattern",
    },
];

const ProductList = () => {
    return (
        <div>
            <div className="product-container">Mobile Phones</div>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
