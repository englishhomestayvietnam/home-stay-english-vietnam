import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface ReviewThankYouEmailProps {
  userName?: string;
  reviewTitle?: string | null;
  reviewText?: string ;
  rating?: number;
  reviewId?: string;
}

export const ReviewThankYouEmail = ({
  userName = "Volunteer",
  reviewTitle = "Amazing volunteer experience!",
  reviewText = "I had a wonderful time volunteering here. The host family was very welcoming and the food was delicious. I highly recommend this program to anyone looking to experience local culture.",
  rating = 5,
  reviewId = "12345",
}: ReviewThankYouEmailProps) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  const previewText = `Thanks for your review, ${userName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#46b96c",
                brandDark: "#3a9959",
                brandLight: "#eefbf3",
              },
            },
          },
        }}
      >
        <Body className="bg-slate-50 my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px] bg-white shadow-sm">
            {/* Logo Section */}
            <Section className="mt-[20px]">
              <Img
                src="https://englishhomestayvietnam.com/logo.png"
                width="150"
                alt="English Homestay Vietnam"
                className="my-0 mx-auto"
              />
            </Section>

            {/* Hero / Success Message */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thank you for your review!
            </Heading>
            
            <Text className="text-black text-[14px] leading-[24px]">
              Hi <strong>{userName}</strong>,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We truly appreciate you taking the time to share your experience. Your feedback helps future volunteers make informed decisions and helps hosts improve their programs.
            </Text>

            {/* Approval Status Notice */}
            <Section className="bg-brandLight border border-dashed border-brand/50 rounded p-4 my-5">
              <Text className="text-brandDark font-semibold text-[14px] m-0 uppercase tracking-wide">
                Pending Approval
              </Text>
              <Text className="text-slate-600 text-[14px] leading-[22px] m-0 mt-2">
                Your review has been submitted and is currently waiting for approval from our team. It will be publicly visible on the platform once the moderation process is complete.
              </Text>
            </Section>

            {/* Review Snapshot Card */}
            <Section className="bg-slate-50 rounded p-4 border border-slate-100 my-4">
              <Row>
                <Column>
                   <Text className="m-0 text-slate-500 text-xs uppercase tracking-wider font-bold">
                    You Rated
                   </Text>
                   <div className="flex my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < rating ? "#eab308" : "#d1d5db", // yellow-500 vs gray-300
                          fontSize: "24px",
                          lineHeight: "1",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <Text className="text-slate-900 font-medium text-base m-0 mt-1">
                    &ldquo;{reviewTitle}&rdquo;
                  </Text>
                  <Text className="text-slate-600 text-[14px] leading-[22px] m-0 mt-2 italic">
                    &ldquo;{reviewText}&rdquo;
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Primary Action */}
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-brand hover:bg-brandDark rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`https://englishhomestayvietnam.com/reviews`}
              >
                View Your Review
              </Button>
            </Section>
            
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* Secondary Actions (Matching Form Footer) */}
            <Text className="text-[#666666] text-[12px] leading-[24px] mb-4">
              Looking for your next adventure?
            </Text>
            
            <Row>
              <Column align="center" className="w-1/2 pr-2">
                 <Link
                  href={`https://englishhomestayvietnam.com`}
                  className="text-brand border border-solid border-brand rounded block w-full py-2 text-center text-[14px] font-medium no-underline bg-white hover:bg-brandLight"
                >
                  Go Home
                </Link>
              </Column>
              <Column align="center" className="w-1/2 pl-2">
                 <Link
                  href={`https://englishhomestayvietnam.com/reviews`}
                  className="text-brand border border-solid border-brand rounded block w-full py-2 text-center text-[14px] font-medium no-underline bg-white hover:bg-brandLight"
                >
                  Read Reviews
                </Link>
              </Column>
            </Row>

            {/* Footer */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              © 2025 English Homestay Vietnam. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReviewThankYouEmail;