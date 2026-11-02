import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "english.homestaynn@gmail.com",
      link: "mailto:english.homestaynn@gmail.com"
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
      value: "Số 246 Hải Âu 3, Vinhomes Ocean Park 1, Kiêu Kỵ, Gia Lâm, Hà Nội",
      link: "https://maps.app.goo.gl/muV15De6xK9ekzUj6?g_st=ic"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      link: "https://www.facebook.com/share/1H5hU6zbqS/?mibextid=wwXIfr"
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
            {"Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
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

          {/* Embedded Google Map Section */}
          <div className="mb-12 overflow-hidden rounded-xl border border-border/60 bg-card shadow-card">
            <div className="p-4 sm:p-6 border-b border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base">Homestay Location</h3>
                  <p className="text-xs text-muted-foreground">Số 246 Hải Âu 3, Vinhomes Ocean Park 1, Kiêu Kỵ, Gia Lâm, Hà Nội</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild className="shrink-0 gap-2 text-xs font-semibold hover:bg-primary hover:text-white transition-smooth">
                <a
                  href="https://maps.app.goo.gl/muV15De6xK9ekzUj6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  View on Google Maps
                </a>
              </Button>
            </div>
            <div className="relative w-full h-72 sm:h-88 bg-muted">
              <iframe
                title="English Homestay Vietnam Location Map"
                src="https://maps.google.com/maps?q=English+Homestay+Vi%E1%BB%87t+Nam+-+Ti%E1%BA%BFng+Anh+giao+ti%E1%BA%BFp+to%C3%A0n+c%E1%BA%A7u,+246+H%E1%BA%A3i+%C3%82u+3+Vinhome+Ocean+Park,+1,+Ki%C3%AAu+K%E1%BB%B5,+Gia+L%C3%A2m,+H%C3%A0+N%E1%BB%99i+100000&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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
