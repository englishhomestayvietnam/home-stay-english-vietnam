import WelcomeBookPage from "./WelcomeBook";

export const metadata = {
  title: "Volunteer Welcome Book | English Homestay Vietnam",
  description: "Official welcome manual for volunteers teaching English in Hanoi, Vietnam. Includes check-in/out protocols, house rules, WiFi basics, emergency contacts, weekly schedules, and FAQs.",
  keywords: [
    "volunteer welcome book",
    "english homestay welcome manual",
    "teach english vietnam welcome guide",
    "vietnam volunteer house rules",
    "volunteer schedule hanoi",
    "homestay volunteer guidelines",
    "volunteer check in vietnam"
  ],
  openGraph: {
    title: "Volunteer Welcome Book | English Homestay Vietnam",
    description: "Official welcome manual for volunteers teaching English in Hanoi, Vietnam. Check-in/out, house rules, WiFi, emergencies, and FAQs.",
    url: "https://www.englishhomestayvietnam.com/welcome",
    type: "website",
  }
};

export default function Page() {
  return <WelcomeBookPage />;
}
