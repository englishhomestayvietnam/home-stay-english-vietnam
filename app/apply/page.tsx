import ApplyClient from "./ApplyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Apply Now | English Homestay Vietnam",
    description: "Apply for our volunteer, internship, or homestay programs.",
};

export default function ApplyPage() {
    return <ApplyClient />;
}
