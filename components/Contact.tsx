import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "info@englishhomestayvietnam.com",
      link: "mailto:info@englishhomestayvietnam.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "WhatsApp",
      value: "+84 968 199 900",
      link: "https://wa.me/84968199900"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      value: "xã số 21a ngõ 22 Gia Lâm Hà Nội",
      link: "https://maps.google.com/?q=Trâu Quỳ, Gia Lâm, Hà Nội"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address 2",
      value: "số 246 Hải Âu 3 Vinhome Ocean Park 1 Gia Lâm Hà Nội",
      link: "https://share.google/37RlR1DSXLvlWt9hg"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      link: "https://www.facebook.com/EnglishHomestayVietnam"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      link: "https://www.instagram.com/englishhomestayvietnam/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-card hover:shadow-soft transition-smooth group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-smooth">
                  {info.icon}
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{info.label}</h3>
                <p className="text-muted-foreground text-sm group-hover:text-primary transition-smooth">
                  {info.value}
                </p>
              </a>
            ))}
          </div>

          <div className="text-center bg-card rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Follow Our Journey
            </h3>
            <p className="text-muted-foreground mb-6">
              Stay updated with our latest stories, events, and volunteer experiences on social media.
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  asChild
                  className="hover:bg-primary hover:text-white transition-smooth"
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
