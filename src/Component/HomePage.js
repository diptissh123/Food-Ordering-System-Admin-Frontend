import { useEffect, useState } from "react";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

// Import images
import food2 from "./images/food2.jpg";
import food3 from "./images/food3.jpg";
import food4 from "./images/food4.jpg";
import food5 from "./images/food5.jpg";
import food6 from "./images/food6.jpg";
import food7 from "./images/food7.jpg";

// Category Icons
import pizzaIcon from "./images/pizzaIcon.png";
import burgerIcon from "./images/BurgerIcon.png";
import pastaIcon from "./images/Pasta.png";
import friesIcon from "./images/Fries.png";
import drinksIcon from "./images/Drinks.png";
import allIcon from "./images/All.png"; 

function HomePage() {
    const [search, setSearch] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const apiUrl = selectedCategory === "All"
            ? "http://localhost:8084/food-ordering/food-items"
            : `http://localhost:8084/food-ordering/foodType/${selectedCategory}`;
    
        axios.get(apiUrl)
        .then(response => {
            console.log("API Response for", selectedCategory, ":", response.data);
    
            // Ensure the response is always an array
            const data = Array.isArray(response.data) ? response.data : [response.data];
            
            setFoodItems(data);
        })
        .catch(error => {
            console.error("Error fetching food items:", error);
            setFoodItems([]);
        });
    }, [selectedCategory]);

    const handleSearch = () => {
        fetch(`http://localhost:8084/food-ordering/search?foodName=${search}`)
            .then((res) => res.json())
            .then((data) => setFoodItems(data))
            .catch((err) => console.error("Error searching food:", err));
    };
    

    const categories = [
        { name: "All", icon: allIcon },
        { name: "pizza", icon: pizzaIcon },
        { name: "burger", icon: burgerIcon },
        { name: "pasta", icon: pastaIcon },
        { name: "fries", icon: friesIcon },
        { name: "drinks", icon: drinksIcon },
    ];

    return (
        <div className="container-fluid vh-100 d-flex flex-column p-4">
             {/* Search Bar */}
         <div className="d-flex justify-content-center mb-4 mt-3">
                <div className="input-group w-50">
                    <input
                        type="text"
                        placeholder="Search for food..."
                        className="form-control text-center"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className="scrolling-container">
                <div className="scrolling-images">
                    <img src={food2} alt="Food 1" />
                    <img src={food3} alt="Food 2" />
                    <img src={food4} alt="Food 3" />
                    <img src={food5} alt="Food 4" />
                    <img src={food6} alt="Food 5" />
                    <img src={food7} alt="Food 6" />
                    <img src={food2} alt="Food 1" />
                    <img src={food3} alt="Food 2" />
                    <img src={food4} alt="Food 3" />
                    <img src={food5} alt="Food 4" />
                    <img src={food6} alt="Food 5" />
                    <img src={food7} alt="Food 6" />
                </div>
            </div>

            <div className="d-flex justify-content-center flex-wrap gap-3 my-3">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`btn d-flex align-items-center ${
                            selectedCategory === category.name ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <img src={category.icon} alt={category.name} className="category-icon me-2" />
                        <span>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
                    </button>
                ))}
            </div>

            <div className="row">
                {foodItems.map((food) => (
                    <div key={food.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={`data:image/jpeg;base64,${food.image}`} className="card-img-top" alt={food.foodName} />
                            <div className="card-body">
                                <h5 className="card-title">{food.foodName}</h5>
                                <p className="card-text">{food.foodDescription}</p>
                                <h6 className="text-primary">Rs.{food.foodPrice} each</h6>
                               
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
