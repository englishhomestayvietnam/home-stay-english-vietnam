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

interface Props {
  fullName?: string;
  startDate?: string | Date;
  duration?: string;
}

export default function ApplicationApprovedEmail({
  fullName = "Volunteer",
  startDate,
  duration = "",
}: Props) {
  const start = startDate ? new Date(startDate).toLocaleDateString() : "";
  return (
    <Html>
      <Head />
      <Preview>Application approved</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-10 px-4">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              Congratulations
            </Heading>
            <Text className="text-gray-700 text-base mb-6">Hi {fullName},</Text>
            <Text className="text-gray-700 text-base mb-6">
              Your application has been approved.
            </Text>
            <Section className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
              <Text className="text-gray-700 text-base mb-2">
                <strong>Start date:</strong> {start}
              </Text>
              <Text className="text-gray-700 text-base">
                <strong>Duration:</strong> {duration}
              </Text>
            </Section>
            <Text className="text-gray-700 text-base mb-6">
              We will contact you soon with next steps. If you have questions,
              reply to this email.
            </Text>
            <Hr className="border-gray-300 my-6" />
            <Text className="text-gray-500 text-sm">English Homestay Vietnam</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

