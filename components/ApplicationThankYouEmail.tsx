import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ApplicationThankYouEmailProps {
    fullName: string;
}

export default function ApplicationThankYouEmail({
    fullName,
}: ApplicationThankYouEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>We received your application!</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-10 px-4">
                        <Heading className="text-2xl font-bold text-gray-800 mb-4">
                            Application Received
                        </Heading>
                        <Text className="text-gray-700 text-base mb-6">
                            Hi {fullName},
                        </Text>
                        <Text className="text-gray-700 text-base mb-6">
                            Thank you for applying to English Homestay Vietnam. We have successfully received your application.
                        </Text>
                        <Text className="text-gray-700 text-base mb-6">
                            Our team will review your application and get back to you shortly with the next steps.
                        </Text>
                        <Hr className="border-gray-300 my-6" />
                        <Text className="text-gray-500 text-sm">
                            English Homestay Vietnam<br />
                            Connecting cultures through education.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
