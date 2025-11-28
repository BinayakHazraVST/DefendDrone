import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import {
  Shield,
  Radar,
  Target,
  Eye,
  Cpu,
  Radio,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";

import engineersExamining from "@assets/generated_images/indian_engineers_examining_drones.png";
import teamCollaboration from "@assets/generated_images/indian_engineering_team_collaboration.png";
import handsAssembling from "@assets/generated_images/indian_hands_assembling_electronics.png";
import testingFacility from "@assets/generated_images/indian_drone_testing_facility.png";
import armyLaunching from "@assets/generated_images/indian_army_launching_drone.png";
import commandCenter from "@assets/generated_images/indian_army_command_center.png";
import droneLanding from "@assets/generated_images/drone_landing_indian_army_field.png";
import officerControlling from "@assets/generated_images/indian_officer_controlling_drone.png";
import armedDrone from "@assets/generated_images/armed_military_drone_with_weapons.png";
import droneAttackVideo from "@assets/generated_videos/armed_drone_attacking_with_weapons.mp4";
import droneWithGunsVideo from "@assets/generated_videos/military_drone_with_guns_flying.mp4";
import engineersWithDrone from "@assets/generated_images/engineers_building_armed_tactical_drone.png";
import modernArmedDroneVideo from "@assets/generated_videos/modern_armed_tactical_drone_flying.mp4";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  clearanceLevel: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#technology", label: "Technology" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const capabilities = [
  {
    icon: Radar,
    title: "Advanced Surveillance",
    description:
      "Real-time reconnaissance with AI-enhanced target identification and tracking across diverse Indian terrains.",
  },
  {
    icon: Target,
    title: "Precision Operations",
    description:
      "GPS-denied navigation capabilities with sub-meter accuracy for critical border security missions.",
  },
  {
    icon: Eye,
    title: "Stealth Technology",
    description:
      "Low observable design with reduced radar cross-section optimized for high-altitude operations.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description:
      "Indigenous machine learning algorithms for autonomous decision-making and adaptive mission planning.",
  },
  {
    icon: Radio,
    title: "Secure Communications",
    description:
      "Encrypted data links with anti-jamming technology and satellite connectivity for remote areas.",
  },
  {
    icon: Shield,
    title: "Border Protection",
    description:
      "Counter-drone capabilities and electronic warfare suite for comprehensive territorial defense.",
  },
];

const stats = [
  { value: "15+", label: "Years of Service" },
  { value: "500+", label: "Units Deployed" },
  { value: "99.7%", label: "Mission Success" },
  { value: "24/7", label: "Operational Ready" },
];

const timeline = [
  {
    year: "2009",
    title: "Project Initiation",
    description: "D.E.F.E.N.D project launched with DRDO collaboration for indigenous drone development",
    status: "completed",
  },
  {
    year: "2012",
    title: "First Prototype",
    description: "Successfully tested the first prototype with advanced surveillance capabilities",
    status: "completed",
  },
  {
    year: "2015",
    title: "Army Integration",
    description: "Integrated with Indian Army for field operations and tactical deployment",
    status: "completed",
  },
  {
    year: "2018",
    title: "AI Enhancement",
    description: "Implemented indigenous AI algorithms for autonomous mission planning",
    status: "completed",
  },
  {
    year: "2021",
    title: "Counter-Drone Systems",
    description: "Deployed advanced electronic warfare and counter-drone capabilities",
    status: "completed",
  },
  {
    year: "2024",
    title: "Next Generation",
    description: "Current development: Next-gen drone with hypersonic capabilities and stealth technology",
    status: "in-progress",
  },
  {
    year: "2026",
    title: "Global Integration",
    description: "Planned integration with allied nation defense systems for collaborative operations",
    status: "planned",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      clearanceLevel: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description:
          "Thank you for your inquiry. Our team will respond within 24-48 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2"
              data-testid="link-logo"
            >
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl tracking-wider text-foreground">
                D.E.F.E.N.D
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-medium text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-medium text-sm uppercase tracking-wide py-2 px-4 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="video-hero"
          >
            <source
              src="/drone-hero-video.mp4"
              type="video/mp4"
            />
          </video>
          {/* Light Dark Overlay to improve text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 via-transparent to-green-900/5" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm tracking-wider uppercase bg-white/10 border-white/20 text-white backdrop-blur-sm"
            >
              Indian Defence Technology Initiative
            </Badge>
            <h1
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white mb-6"
              data-testid="text-hero-title"
            >
              D.E.F.E.N.D
            </h1>
            <div className="flex flex-col items-center gap-2 mb-8">
              <p className="text-lg sm:text-xl text-white/90 font-medium tracking-wide">
                <span className="text-orange-400">D</span>rone{" "}
                <span className="text-white">E</span>ngineering{" "}
                <span className="text-orange-400">F</span>or{" "}
                <span className="text-white">E</span>nhanced{" "}
                <span className="text-green-400">N</span>ational{" "}
                <span className="text-green-400">D</span>efence
              </p>
            </div>
            <p
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
              data-testid="text-hero-description"
            >
              Pioneering indigenous aerial defence systems for Bharat. Innovation,
              precision, and unwavering commitment to national security. Jai Hind!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("#about")}
                className="bg-white/10 border border-white/30 text-white backdrop-blur-sm px-8 font-semibold tracking-wide"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                className="bg-transparent border-white/30 text-white backdrop-blur-sm px-8 font-semibold tracking-wide"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </section>

      {/* About / Mission Section */}
      <section id="about" className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 uppercase tracking-wider">Our Mission</Badge>
              <h2
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6"
                data-testid="text-about-title"
              >
                Defending Bharat, Securing Tomorrow
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The D.E.F.E.N.D initiative represents the pinnacle of Indian
                innovation in unmanned aerial systems. Developed in collaboration
                with DRDO and Indian defence forces, we create cutting-edge
                indigenous drone technology that strengthens our national security.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our team of world-class Indian engineers, military strategists, and
                technology experts work tirelessly to ensure our armed forces have
                access to the most advanced, reliable, and Made-in-India aerial
                defence systems.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="p-4 text-center"
                  >
                    <p className="font-heading text-2xl md:text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-md overflow-hidden">
                <img
                  src={testingFacility}
                  alt="D.E.F.E.N.D drone testing and calibration facility"
                  className="w-full h-auto object-cover rounded-md"
                  data-testid="img-about-drone"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Decorative Elements - Indian tricolor inspired */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-orange-500/40 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-green-600/40 rounded-bl-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 uppercase tracking-wider">
              Capabilities
            </Badge>
            <h2
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4"
              data-testid="text-technology-title"
            >
              Indigenous Technology
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              State-of-the-art systems designed and manufactured in India for
              superiority across all terrains - from Himalayan peaks to coastal waters.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-elevate">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <cap.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className="font-heading text-lg font-bold uppercase tracking-wide mb-2"
                    data-testid={`text-capability-${index}`}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 uppercase tracking-wider">Gallery</Badge>
            <h2
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4"
              data-testid="text-gallery-title"
            >
              Development & Deployment
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From DRDO laboratories to field operations - excellence at every stage.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Engineering Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                Engineering Excellence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: engineersExamining,
                    alt: "Indian engineers examining drone components",
                    caption: "Component Analysis",
                  },
                  {
                    src: teamCollaboration,
                    alt: "Indian engineering team collaboration",
                    caption: "Team Collaboration",
                  },
                  {
                    src: handsAssembling,
                    alt: "Hands assembling drone electronics",
                    caption: "Precision Assembly",
                  },
                  {
                    src: testingFacility,
                    alt: "Indian drone testing facility",
                    caption: "Testing & Calibration",
                  },
                ].map((img, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-md"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-engineering-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Military Deployment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Indian Army In Action
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    src: armyLaunching,
                    alt: "Indian Army personnel launching drone",
                    caption: "Field Deployment",
                  },
                  {
                    src: commandCenter,
                    alt: "Indian Army command center",
                    caption: "Command Center",
                  },
                  {
                    src: droneLanding,
                    alt: "Drone landing in Indian terrain",
                    caption: "Mission Complete",
                  },
                  {
                    src: officerControlling,
                    alt: "Indian Army officer controlling drone",
                    caption: "Tactical Control",
                  },
                ].map((img, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-md"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-military-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 uppercase tracking-wider">Get In Touch</Badge>
            <h2
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4"
              data-testid="text-contact-title"
            >
              Contact Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to learn more about the D.E.F.E.N.D initiative? Our team is
              standing by.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 md:p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    data-testid="form-contact"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Rajesh Kumar"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="rajesh@example.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your organization"
                                {...field}
                                data-testid="input-organization"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="clearanceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Security Clearance (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-clearance">
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Public
                                </SelectItem>
                                <SelectItem value="restricted">
                                  Restricted
                                </SelectItem>
                                <SelectItem value="confidential">
                                  Confidential
                                </SelectItem>
                                <SelectItem value="secret">
                                  Secret
                                </SelectItem>
                                <SelectItem value="top-secret">
                                  Top Secret
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your inquiry..."
                              className="min-h-32 resize-none"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="p-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
                  Headquarters
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">D.E.F.E.N.D Research Centre</p>
                      <p className="text-muted-foreground text-sm">
                        DRDO Bhawan, Rajaji Marg
                        <br />
                        New Delhi - 110011
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground text-sm">
                        Monday - Friday: 0900 - 1730 IST
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
                  Contact Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        General Inquiries
                      </p>
                      <p className="font-medium" data-testid="text-phone-general">
                        +91 11 2301 XXXX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Defence Partnerships
                      </p>
                      <p className="font-medium" data-testid="text-phone-sales">
                        +91 11 2301 YYYY
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium" data-testid="text-email">
                        info@defend.drdo.gov.in
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide mb-4">
                  Connect With Us
                </h3>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" data-testid="button-linkedin">
                    <SiLinkedin className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" data-testid="button-twitter">
                    <SiX className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-lg tracking-wider">
                  D.E.F.E.N.D
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Drone Engineering For Enhanced National Defence. Protecting Bharat
                through indigenous innovation. Jai Hind!
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold uppercase tracking-wide mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold uppercase tracking-wide mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Technical Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Press Releases
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Partner Program
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold uppercase tracking-wide mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Security Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm text-center sm:text-left">
                &copy; {new Date().getFullYear()} D.E.F.E.N.D Project - Ministry of Defence, Government of India. All rights
                reserved.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  RESTRICTED
                </Badge>
                <Badge variant="outline" className="text-xs">
                  MAKE IN INDIA
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
