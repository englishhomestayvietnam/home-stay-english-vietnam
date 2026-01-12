import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface Props {
  fullName: string;
  email: string;
  country : string;
  sex : string;
  startDate: string | Date;
  endDate?: string | Date;
  duration: string;
  message?: string;
  groupMembers?: {
    fullName: string;
    country: string;
    sex: string;
  }[];
}

export default function AdminNewApplicationEmail({
  fullName,
  email,
  country,
  sex,
  startDate,
  endDate,
  duration,
  message,
  groupMembers,
}: Props) {
  const start = new Date(startDate).toLocaleDateString();
  const end = endDate ? new Date(endDate).toLocaleDateString() : undefined;
  return (
    <Html>
      <Head />
      <Preview>New application submitted</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-10 px-4">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              New Application
            </Heading>
            <Section className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
              <Text className="text-gray-700 text-base">
                <strong>Name:</strong> {fullName}
              </Text>
              <Text className="text-gray-700 text-base">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-gray-700 text-base">
                <strong>Country:</strong> {country}
              </Text>
              <Text className="text-gray-700 text-base">
                <strong>Sex:</strong> {sex}
              </Text>
              <Text className="text-gray-700 text-base">
                <strong>Start date:</strong> {start}
              </Text>
              {end && (
                <Text className="text-gray-700 text-base">
                  <strong>End date:</strong> {end}
                </Text>
              )}
              <Text className="text-gray-700 text-base">
                <strong>Duration:</strong> {duration}
              </Text>
              {message && (
                <Text className="text-gray-700 text-base">
                  <strong>Message:</strong> {message}
                </Text>
              )}

              {groupMembers && groupMembers.length > 0 && (
                <>
                  <Hr className="border-gray-200 my-4" />
                  <Heading as="h3" className="text-lg font-bold text-gray-800 mb-2">
                    Group Members
                  </Heading>
                  {groupMembers.map((member, index) => (
                    <Section key={index} className="mb-2 pl-4 border-l-2 border-gray-300">
                      <Text className="text-gray-700 text-sm m-1">
                        <strong>Name:</strong> {member.fullName}
                      </Text>
                      <Text className="text-gray-700 text-sm m-1">
                        <strong>Country:</strong> {member.country}
                      </Text>
                      <Text className="text-gray-700 text-sm m-1">
                        <strong>Sex:</strong> {member.sex}
                      </Text>
                    </Section>
                  ))}
                </>
              )}
            </Section>
            <Link
              href="https://englishhomestayvietnam.com/admin/applications"
              className="text-blue-600"
            >
              Review in Admin
            </Link>
            <Hr className="border-gray-300 my-6" />
            <Text className="text-gray-500 text-sm">English Homestay Vietnam</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
