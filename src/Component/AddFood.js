import React, { useState } from "react";


function AddFood() {
    const [formData, setFormData] = useState({
        
            foodName: "",
            foodPrice: "",
            foodType: "",
            foodDescription: "",
            image: null,
       
        
    });

    const [preview, setPreview] = useState(null);

    // Handles changes for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handles file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append("foodName", formData.foodName);
        formDataToSend.append("foodPrice", formData.foodPrice);
        formDataToSend.append("foodType", formData.foodType);
        formDataToSend.append("foodDescription", formData.foodDescription);
        formDataToSend.append("image", formData.image); // Append image file
    
        console.log("FormData being sent:");
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
        }
    
        try {
            const response = await fetch("http://localhost:8084/food-ordering/food-items", {
                method: "POST",
                body: formDataToSend, // **Do NOT set Content-Type manually**
            });
    
            if (!response.ok) {
                throw new Error("Failed to add food item");
            }
    
            const result = await response.text();
            console.log("Server Response:", result);
            alert(result);
    
            // Reset form after successful submission
            setFormData({
                foodName: "",
                foodPrice: "",
                foodType: "",
                foodDescription: "",
                image: null,
            });
            setPreview(null);
            document.getElementById("fileInput").value = ""; // Reset file input manually
        } catch (error) {
            console.error("Error adding food item:", error);
            alert("Failed to add food item");
        }
    };
    

    return (
        <div className="container mt-4">
            <h2>Add Food Item</h2>
            <form onSubmit={handleSubmit}>
                {/* Food Name Input */}
                <div className="mb-3">
                    <label className="form-label">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        className="form-control"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Food Price Input */}
                <div className="mb-3">
                    <label className="form-label">Food Price</label>
                    <input
                        type="number"
                        name="foodPrice"
                        className="form-control"
                        value={formData.foodPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Food Type Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Food Type</label>
                    <select
                        name="foodType"
                        className="form-control"
                        value={formData.foodType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Burger">Burger</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Fries">Fries</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>

                {/* Food Description Input */}
                <div className="mb-3">
                    <label className="form-label">Food Description</label>
                    <textarea
                        name="foodDescription"
                        className="form-control"
                        value={formData.foodDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Food Image Input */}
                <div className="mb-3">
                    <label className="form-label">Food Image</label>
                    <input
                        type="file"
                        id="fileInput"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Preview" style={{ width: "150px", height: "150px", borderRadius: "10px" }} />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Add Food
                </button>
            </form>
        </div>
    );
}

export default AddFood;
