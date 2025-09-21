import React, { useState } from "react";

// Optional: Extract interface to a separate file like types/NGODto.ts
interface NGODto {
    organizationName: string;
    email: string;
    password: string;
    address: string;
    contactPersonName: string;
    contactPersonPhone: string;
}

const NGORegister: React.FC = () => {
    const [formData, setFormData] = useState<NGODto>({
        organizationName: "",
        email: "",
        password: "",
        address: "",
        contactPersonName: "",
        contactPersonPhone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/ngo/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("NGO registered successfully!");

                // Reset form
                setFormData({
                    organizationName: "",
                    email: "",
                    password: "",
                    address: "",
                    contactPersonName: "",
                    contactPersonPhone: "",
                });
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (err) {
            alert("Error connecting to server. Check console.");
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 shadow-lg rounded-xl bg-white space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">NGO Registration</h2>

            <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Organization Name"
                required
                className="w-full p-2 border rounded-lg"
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-2 border rounded-lg"
            />

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full p-2 border rounded-lg"
            />

            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded-lg"
            />

            <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Contact Person Name"
                required
                className="w-full p-2 border rounded-lg"
            />

            <input
                type="text"
                name="contactPersonPhone"
                value={formData.contactPersonPhone}
                onChange={handleChange}
                placeholder="Contact Person Phone"
                required
                className="w-full p-2 border rounded-lg"
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                Register NGO
            </button>
        </form>
    );
};

export default NGORegister;
