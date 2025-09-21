import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const DonationSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [donorName, setDonorName] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/payment/success?session_id=${sessionId}`
                );
                // backend returns { fullName, amount }
                setDonorName(res.data.fullName);
                setAmount(res.data.amount);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) fetchPaymentDetails();
    }, [sessionId]);

    if (loading) return <div className="text-center text-black mt-40">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
            <div className="max-w-md w-full bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-8 text-center">
                <h1 className="text-3xl font-bold text-black mb-4">Donation Successful 🎉</h1>
                <p className="text-black/80 mb-6">
                    Thank you <span className="text-primary font-semibold">{donorName}</span> for your generous donation of{" "}
                    <span className="text-primary font-semibold">Rs. {amount}</span>.
                </p>
                <p className="text-black/80 mb-4">Your support helps us bridge the accessibility gap.</p>
                <Link
                    to="/"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default DonationSuccess;
