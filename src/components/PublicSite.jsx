import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Menu as MuiMenu,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  Cloud,
  DollarSign,
  FileText,
  Home,
  Laptop,
  Lock,
  Mail,
  Menu as MenuIcon,
  MapPin,
  Monitor,
  PhoneCall,
  Router,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wifi,
  Wrench
} from "lucide-react";
import heroImage from "../assets/asheville-it-service-hero.webp";
import logoMark from "../assets/robbins-technologies-mark.png";
import logoLockup from "../assets/robbins-technologies-logo.png";

const publicTheme = createTheme({
  palette: {
    primary: {
      main: "#1458f5",
      dark: "#111a2f",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#0b2d6f"
    },
    text: {
      primary: "#111a2f",
      secondary: "#526176"
    },
    background: {
      default: "#f5f8ff",
      paper: "#ffffff"
    }
  },
  typography: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    button: {
      fontWeight: 900,
      textTransform: "none"
    }
  },
  shape: {
    borderRadius: 7
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          minHeight: 42,
          borderRadius: 7,
          fontWeight: 900,
          letterSpacing: 0
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 42,
          borderRadius: 7,
          fontWeight: 890,
          letterSpacing: 0,
          textTransform: "none"
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          fontWeight: 850
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined"
      }
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined"
      }
    }
  }
});

const serviceAreas = [
  "Asheville",
  "Buncombe County",
  "Hendersonville",
  "Waynesville",
  "Black Mountain",
  "Weaverville",
  "Mars Hill",
  "Marion",
  "Morganton",
  "Boone",
  "Northwestern NC"
];

const proofPoints = [
  { label: "Remote-first triage", icon: Laptop },
  { label: "On-site when needed", icon: Wrench },
  { label: "Small business ready", icon: Building2 },
  { label: "Monthly care available", icon: ShieldCheck }
];

const trustSignals = [
  { value: "Asheville", label: "local WNC base" },
  { value: "Remote + on-site", label: "support model" },
  { value: "Homes + teams", label: "client fit" },
  { value: "Plain English", label: "no runaround" }
];

const servicePaths = [
  {
    title: "Home Support",
    icon: Home,
    audience: "For households, freelancers, and remote workers",
    summary: "Computer cleanup, Wi-Fi, printers, email, backups, and everyday tech problems handled clearly.",
    includes: ["Slow computer repair", "Printer and Wi-Fi help", "Account and email setup"],
    action: "Fix home tech"
  },
  {
    title: "Business Setup",
    icon: Building2,
    audience: "For new offices, new hires, and small teams",
    summary: "Workstations, Microsoft 365 or Google Workspace, shared files, printers, routers, and onboarding.",
    includes: ["New device rollout", "Email and file sharing", "Network and printer setup"],
    action: "Plan a setup"
  },
  {
    title: "Managed IT",
    icon: ShieldCheck,
    audience: "For teams that need ongoing support",
    summary: "Monthly care, priority response, health checks, vendor coordination, security basics, and documentation.",
    includes: ["Priority support lane", "Monthly health checks", "Backup and security review"],
    action: "See monthly care"
  }
];

const differencePoints = [
  {
    title: "Local enough to show up",
    detail: "Remote support starts fast, and on-site service is available around Asheville and nearby WNC communities.",
    icon: MapPin
  },
  {
    title: "Clear enough to trust",
    detail: "You get practical notes, recommendations, and next steps without jargon or mystery invoices.",
    icon: ClipboardList
  },
  {
    title: "Structured enough for business",
    detail: "Setup and monthly support use checklists, inventories, and repeatable support lanes.",
    icon: Server
  }
];

const serviceTabs = [
  {
    name: "Home Support",
    icon: Home,
    intro: "Computer, Wi-Fi, printer, email, backup, and device help without the runaround.",
    services: [
      {
        title: "Remote Support",
        icon: Laptop,
        detail: "Fast help for slow computers, account access, software installs, cleanup, and everyday troubleshooting."
      },
      {
        title: "On-Site Repair",
        icon: Wrench,
        detail: "In-person diagnostics, upgrades, printer fixes, Wi-Fi issues, and hardware troubleshooting."
      },
      {
        title: "Backup Setup",
        icon: Cloud,
        detail: "Practical backup plans for important files, photos, business documents, and recovery confidence."
      }
    ]
  },
  {
    name: "Business IT",
    icon: Building2,
    intro: "Setup and support for small teams that need reliable technology without a full-time IT hire.",
    services: [
      {
        title: "Office Setup",
        icon: Monitor,
        detail: "New workstations, secure email, shared files, printers, onboarding, and cleanup projects."
      },
      {
        title: "Network & Wi-Fi",
        icon: Wifi,
        detail: "Router replacement, Wi-Fi coverage, wired devices, printers, and basic network documentation."
      },
      {
        title: "Vendor Coordination",
        icon: PhoneCall,
        detail: "A steady technical contact for internet providers, software vendors, device warranties, and migrations."
      }
    ]
  },
  {
    name: "Managed IT",
    icon: ShieldCheck,
    intro: "Monthly support for small offices that want priority response, maintenance, and better visibility.",
    services: [
      {
        title: "Priority Support",
        icon: Clock3,
        detail: "A dedicated support lane for recurring clients, urgent triage, and planned IT changes."
      },
      {
        title: "Security Basics",
        icon: Lock,
        detail: "Account hardening, password practices, update checks, backup reviews, and practical protection."
      },
      {
        title: "Health Checks",
        icon: Server,
        detail: "Monthly review of devices, network basics, backup status, user changes, and support trends."
      }
    ]
  }
];

const plans = [
  {
    name: "Remote Help",
    price: "$95/hr",
    bestFor: "Quick fixes for home users, freelancers, and small teams",
    includes: ["Computer cleanup", "Email and printer help", "Software setup", "Backup guidance"]
  },
  {
    name: "Local Visit",
    price: "$125/hr",
    bestFor: "On-site repairs and network troubleshooting near Asheville",
    includes: ["One-hour minimum", "Wi-Fi and router fixes", "Hardware installs", "Workstation setup"]
  },
  {
    name: "Small Business Care",
    price: "$599/mo",
    bestFor: "Priority support for teams that need a dependable IT lane",
    includes: ["Priority remote support", "Monthly health checks", "User and device inventory", "Security and backup review"]
  },
  {
    name: "Managed Office",
    price: "$1,250/mo",
    bestFor: "Ongoing IT operations for offices that need consistent coverage",
    includes: ["Monitoring and patch cadence", "Vendor coordination", "Quarterly roadmap", "Response-time targets"]
  }
];

const processSteps = [
  {
    title: "Request Support",
    detail: "Share what is broken, slow, missing, or ready to set up.",
    icon: Mail
  },
  {
    title: "Triage First",
    detail: "Remote help starts fast. On-site work is scheduled when hands-on access is needed.",
    icon: PhoneCall
  },
  {
    title: "Fix and Document",
    detail: "You get plain-language notes, next steps, and the setup details worth keeping.",
    icon: ClipboardList
  },
  {
    title: "Keep It Healthy",
    detail: "Recurring clients get maintenance, security basics, and a cleaner path for future support.",
    icon: ShieldCheck
  }
];

const faqs = [
  {
    question: "Do you offer remote support?",
    answer: "Yes. Remote support is the fastest option for many computer, email, account, software, and cleanup issues. If the problem needs physical access, the request moves to an on-site visit."
  },
  {
    question: "Can you help a small business set up its office technology?",
    answer: "Yes. Setup work can include computers, email, file sharing, printers, router and Wi-Fi configuration, backups, user onboarding, and a simple support plan after launch."
  },
  {
    question: "What areas do you serve?",
    answer: "Robbins Technologies is built around Asheville and northwestern North Carolina, with remote help available broadly and on-site work prioritized around Asheville and nearby communities."
  },
  {
    question: "Do monthly plans replace hourly support?",
    answer: "No. Hourly support stays available for one-time fixes and call-ins. Monthly plans are for homes or businesses that want priority support, recurring health checks, and a more predictable IT lane."
  }
];

const businessPlanSections = [
  {
    title: "Executive Summary",
    icon: ClipboardList,
    body: "Robbins Technologies provides practical IT repair, remote support, in-person service, business setup, and monthly IT support for Asheville and northwestern North Carolina. The launch strategy starts lean, sells trust and speed first, then grows recurring support contracts with small teams."
  },
  {
    title: "Target Customers",
    icon: Users,
    body: "Primary customers are local homes, freelancers, retail shops, restaurants, clinics, trades, nonprofits, short-term rental operators, and small offices with 2 to 25 staff who need reliable help without a full-time IT hire."
  },
  {
    title: "Positioning",
    icon: Target,
    body: "The brand promise is local, clear, and responsive: remote when possible, on-site when needed, with plain-language fixes and ongoing support plans that keep small operations moving."
  },
  {
    title: "Revenue Model",
    icon: DollarSign,
    body: "Launch with hourly repair and setup work, then convert repeat customers into monthly support. The goal is to build a stable base of recurring revenue while keeping call-ins available for urgent jobs."
  }
];

const roadmap = [
  "Publish the landing page, Google Business Profile, service area pages, and intake email.",
  "Create launch offers for remote repair, on-site visits, and small business setup packages.",
  "Visit local business groups, coworking spaces, real estate offices, clinics, and service companies.",
  "Track every job by issue type, response time, revenue, referral source, and plan-fit score.",
  "Convert the first 10 repeat clients into monthly support agreements."
];

const sources = [
  {
    label: "U.S. Census QuickFacts: Asheville city population and local profile",
    href: "https://www.census.gov/quickfacts/fact/table/ashevillecitynorthcarolina/SBO010223"
  },
  {
    label: "Mountain BizWorks: 26 westernmost North Carolina counties",
    href: "https://www.mountainbizworks.org/about-us/our-region/"
  },
  {
    label: "Explore Asheville: visitor economy and local business context",
    href: "https://www.exploreasheville.com/community/value-visitor-economy"
  },
  {
    label: "City of Asheville Economic Development",
    href: "https://www.ashevillenc.gov/department/community-economic-development/economic-development/"
  }
];

const businessPlanTabLabels = ["Overview", "Services", "Market", "Roadmap", "Financials"];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

function scrollToSection(id, onNavigate) {
  if (window.location.pathname !== "/") onNavigate("/");
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 90);
}

function BrandMark() {
  return (
    <span className="brand-mark rt-brand-mark rt-logo-mark" aria-hidden="true">
      <img src={logoMark} alt="" loading="eager" decoding="async" />
    </span>
  );
}

function BrandLockup({ footer = false }) {
  return (
    <img
      className={`rt-logo-lockup ${footer ? "footer" : ""}`}
      src={logoLockup}
      alt="Robbins Technologies"
      loading="eager"
      decoding="async"
    />
  );
}

function PublicNav({ onNavigate, compact = false }) {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);

  const goSection = (event, id) => {
    event.preventDefault();
    scrollToSection(id, onNavigate);
  };

  const closeMobileMenu = () => setMobileMenuAnchor(null);

  const goMobileSection = (id) => {
    closeMobileMenu();
    scrollToSection(id, onNavigate);
  };

  const goMobileRoute = (path) => {
    closeMobileMenu();
    onNavigate(path);
  };

  return (
    <header className={`public-nav rt-public-nav ${compact ? "compact" : ""}`}>
      <button className="public-brand rt-public-brand" type="button" onClick={() => onNavigate("/")}>
        <BrandLockup />
        <span className="rt-brand-copy">
          <strong>Asheville IT Support</strong>
          <small>Remote, on-site, and monthly care</small>
        </span>
      </button>
      <nav aria-label="Public navigation">
        <Button className="rt-nav-link" component="a" href="/#paths" onClick={(event) => goSection(event, "paths")}>Services</Button>
        <Button className="rt-nav-link" component="a" href="/#managed-it" onClick={(event) => goSection(event, "managed-it")}>Managed IT</Button>
        <Button className="rt-nav-link" component="a" href="/#service-area" onClick={(event) => goSection(event, "service-area")}>Service Area</Button>
        <Button className="rt-nav-link rt-business-link" type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</Button>
        <Button className="rt-nav-cta" component="a" href="/#contact" onClick={(event) => goSection(event, "contact")}>Schedule Support</Button>
        <Button className="public-login rt-login-link" type="button" onClick={() => onNavigate("/login")}>
          Client Login
        </Button>
      </nav>
      <div className="rt-mobile-nav-controls" aria-label="Mobile navigation controls">
        <Button className="rt-mobile-cta" type="button" onClick={() => goMobileSection("contact")}>
          Schedule
        </Button>
        <Button
          className="rt-mobile-menu-button"
          type="button"
          aria-controls={mobileMenuOpen ? "rt-mobile-menu" : undefined}
          aria-expanded={mobileMenuOpen ? "true" : undefined}
          aria-haspopup="menu"
          onClick={(event) => setMobileMenuAnchor(event.currentTarget)}
        >
          <MenuIcon size={17} /> Menu
        </Button>
      </div>
      <MuiMenu
        id="rt-mobile-menu"
        anchorEl={mobileMenuAnchor}
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        className="rt-mobile-menu"
        slotProps={{
          paper: {
            className: "rt-mobile-menu-paper"
          }
        }}
      >
        <MenuItem onClick={() => goMobileSection("paths")}>Services</MenuItem>
        <MenuItem onClick={() => goMobileSection("managed-it")}>Managed IT</MenuItem>
        <MenuItem onClick={() => goMobileSection("service-area")}>Service Area</MenuItem>
        <MenuItem onClick={() => goMobileRoute("/business-plan")}>Business Plan</MenuItem>
        <MenuItem onClick={() => goMobileSection("contact")}>Schedule Support</MenuItem>
        <MenuItem onClick={() => goMobileRoute("/login")}>Client Login</MenuItem>
      </MuiMenu>
    </header>
  );
}

function SectionHeading({ kicker, title, children }) {
  return (
    <div className="rt-section-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function SupportRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState({
    name: "",
    contact: "",
    service: "Remote Support",
    detail: ""
  });

  const serviceOptions = useMemo(
    () => serviceTabs.flatMap((tab) => tab.services.map((service) => service.title)),
    []
  );

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`${request.service} request`);
    const body = encodeURIComponent(
      `Name: ${request.name}\nContact: ${request.contact}\nService: ${request.service}\n\nWhat is going on?\n${request.detail}`
    );
    return `mailto:support@robbinstechnologies.com?subject=${subject}&body=${body}`;
  }, [request]);

  return (
    <form
      className="support-form rt-support-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        window.location.href = mailto;
      }}
    >
      <TextField
        className="rt-form-field"
        id="support-name"
        name="name"
        label="Name or business"
        value={request.name}
        onChange={(event) => setRequest((current) => ({ ...current, name: event.target.value }))}
        placeholder="Your name or business"
        autoComplete="name"
        required
        slotProps={{ htmlInput: { "aria-label": "Name or business" } }}
      />
      <TextField
        className="rt-form-field"
        id="support-contact"
        name="contact"
        label="Email or phone"
        value={request.contact}
        onChange={(event) => setRequest((current) => ({ ...current, contact: event.target.value }))}
        placeholder="Best way to reach you"
        autoComplete="email"
        required
        slotProps={{ htmlInput: { "aria-label": "Email or phone" } }}
      />
      <FormControl className="rt-form-field" required>
        <InputLabel id="support-service-label">Service</InputLabel>
        <Select
          labelId="support-service-label"
          id="support-service"
          name="service"
          value={request.service}
          label="Service"
          onChange={(event) => setRequest((current) => ({ ...current, service: event.target.value }))}
          inputProps={{ "aria-label": "Service" }}
        >
          {serviceOptions.map((service) => <MenuItem key={service} value={service}>{service}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        className="rt-form-field full"
        id="support-detail"
        name="detail"
        label="What needs fixed or set up?"
        value={request.detail}
        onChange={(event) => setRequest((current) => ({ ...current, detail: event.target.value }))}
        placeholder="Computer, network, email, printer, new office setup, monthly support..."
        required
        multiline
        minRows={4}
        slotProps={{ htmlInput: { "aria-label": "What needs fixed or set up?" } }}
      />
      <div className="rt-form-footer">
        <Button className="public-primary rt-primary" type="submit" variant="contained">
          Prepare request <Mail size={17} />
        </Button>
        <p aria-live="polite">
          {submitted ? "Your email client is opening with the support request ready." : "Most requests start with remote triage, then move on-site when needed."}
        </p>
      </div>
    </form>
  );
}

function ServicesTabs() {
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const activeTab = serviceTabs[activeServiceTab];

  return (
    <div className="rt-tabs-shell">
      <Tabs
        className="rt-tab-list"
        value={activeServiceTab}
        onChange={(_, value) => setActiveServiceTab(value)}
        aria-label="Service categories"
        variant="scrollable"
        scrollButtons="auto"
      >
        {serviceTabs.map((item) => {
          const Icon = item.icon;
          return (
            <Tab
              key={item.name}
              className="rt-tab"
              id={`service-tab-${item.name}`}
              aria-controls={`service-panel-${item.name}`}
              label={<span className="rt-tab-label"><Icon size={17} />{item.name}</span>}
            />
          );
        })}
      </Tabs>
      <div
        className="rt-tab-panel"
        id={`service-panel-${activeTab.name}`}
        role="tabpanel"
        aria-labelledby={`service-tab-${activeTab.name}`}
      >
        <p>{activeTab.intro}</p>
        <div className="rt-service-grid">
          {activeTab.services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                className="rt-service-card"
                key={service.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42 }}
              >
                <span><Icon size={21} /></span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <a href="#contact">Request this <ChevronRight size={15} /></a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlansSection() {
  return (
    <div className="rt-plan-grid">
      {plans.map((plan, index) => (
        <motion.article
          className={`rt-plan-card ${index === 2 ? "featured" : ""}`}
          key={plan.name}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: index * 0.04, duration: 0.4 }}
        >
          <div>
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.bestFor}</p>
          </div>
          <div className="rt-plan-includes">
            {plan.includes.map((item) => <span key={item}><Check size={15} />{item}</span>)}
          </div>
          <a href="#contact">Start here <ArrowRight size={16} /></a>
        </motion.article>
      ))}
    </div>
  );
}

function FaqSection() {
  return (
    <div className="rt-faq-list">
      {faqs.map((item) => (
        <Accordion className="rt-faq-item" key={item.question} disableGutters elevation={0}>
          <AccordionSummary className="rt-faq-button" expandIcon={<ChevronDown size={18} />}>
            {item.question}
          </AccordionSummary>
          <AccordionDetails className="rt-faq-panel">{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

function ServicePathCards() {
  return (
    <div className="rt-path-grid">
      {servicePaths.map((path, index) => {
        const Icon = path.icon;
        return (
          <motion.article
            className={`rt-path-card path-${index + 1}`}
            key={path.title}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            transition={{ delay: index * 0.05, duration: 0.44 }}
          >
            <div className="rt-path-card-top">
              <span className="rt-path-icon"><Icon size={24} /></span>
              <div>
                <h3>{path.title}</h3>
                <small>{path.audience}</small>
              </div>
            </div>
            <p>{path.summary}</p>
            <div className="rt-path-list">
              {path.includes.map((item) => <span key={item}><Check size={15} />{item}</span>)}
            </div>
            <Button className="rt-path-button" component="a" href="#contact">
              {path.action} <ArrowRight size={16} />
            </Button>
          </motion.article>
        );
      })}
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="rt-trust-strip" aria-label="Robbins Technologies credibility">
      {trustSignals.map((signal) => (
        <div key={signal.value}>
          <strong>{signal.value}</strong>
          <span>{signal.label}</span>
        </div>
      ))}
    </section>
  );
}

function ServiceAreaMap() {
  return (
    <div className="rt-map-panel" aria-label="Asheville and Western North Carolina service coverage">
      <div className="rt-map-rings" aria-hidden="true">
        <span className="ring ring-one" />
        <span className="ring ring-two" />
        <span className="ring ring-three" />
      </div>
      <div className="rt-map-pin primary"><MapPin size={16} /> Asheville hub</div>
      <div className="rt-map-pin north">Weaverville</div>
      <div className="rt-map-pin east">Black Mountain</div>
      <div className="rt-map-pin south">Hendersonville</div>
      <div className="rt-map-pin west">Waynesville</div>
    </div>
  );
}

function PublicFooter({ onNavigate }) {
  return (
    <footer className="rt-footer">
      <div className="rt-footer-brand">
        <BrandLockup footer />
        <div>
          <span>IT support for Asheville and Western North Carolina.</span>
        </div>
      </div>
      <div className="rt-footer-links">
        <a href="#paths">Services</a>
        <a href="#plans">Plans</a>
        <a href="#service-area">Service Area</a>
        <button type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</button>
        <button type="button" onClick={() => onNavigate("/login")}>Client Login</button>
      </div>
    </footer>
  );
}

export function PublicLanding({ onNavigate }) {
  return (
    <ThemeProvider theme={publicTheme}>
      <div className="public-site rt-public-site">
        <PublicNav onNavigate={onNavigate} />

        <main>
          <section className="public-hero rt-hero rt-hero-v2" style={{ "--hero-image": `url(${heroImage})` }}>
            <div className="rt-hero-inner">
              <motion.div
                className="rt-hero-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52 }}
              >
                <h1>Asheville IT Support Without the Runaround</h1>
                <p>
                  Remote help, on-site repair, business setup, and monthly IT care for Western North Carolina homes and small teams.
                </p>
                <div className="hero-actions rt-hero-actions">
                  <Button className="public-primary rt-primary" component="a" href="#contact" variant="contained">
                    Schedule Support <ArrowRight size={17} />
                  </Button>
                  <Button className="public-secondary rt-secondary" component="a" href="#paths" variant="outlined">
                    View Services
                  </Button>
                </div>
              </motion.div>

              <motion.aside
                className="rt-hero-card"
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.52 }}
                aria-label="Robbins Technologies service routes"
              >
                <div className="rt-hero-card-logo">
                  <BrandMark />
                  <div>
                    <strong>Robbins Technologies</strong>
                    <span>Serving Asheville and WNC</span>
                  </div>
                </div>
                {proofPoints.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="rt-hero-route" key={item.label}>
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </motion.aside>
            </div>
          </section>

          <TrustStrip />

          <section className="public-band rt-section rt-path-section" id="paths">
            <SectionHeading
              kicker="Services"
              title="Pick the support path that matches the problem."
            >
              Robbins Technologies is organized around the way local clients actually ask for help: quick fixes, setup projects, and ongoing care.
            </SectionHeading>
            <ServicePathCards />
          </section>

          <section className="rt-emergency-band" id="services">
            <div>
              <PhoneCall size={24} />
              <h2>Something broke today?</h2>
              <p>Start with remote triage. If the fix needs hands-on work, schedule an on-site visit around Asheville and nearby WNC communities.</p>
            </div>
            <Button className="rt-emergency-button" component="a" href="#contact">
              Start a support request <ArrowRight size={17} />
            </Button>
          </section>

          <section className="public-band rt-section rt-services-section">
            <SectionHeading
              kicker="What We Fix"
              title="Clear categories, practical fixes, and no mystery tech talk."
            >
              Use the tabs to see common work across home support, business IT, and managed care.
            </SectionHeading>
            <ServicesTabs />
          </section>

          <section className="public-band rt-section rt-difference-section" id="managed-it">
            <div>
              <SectionHeading
                kicker="Managed IT"
                title="A steady IT lane for small businesses that are tired of winging it."
              >
                Monthly support gives your team a practical rhythm: device inventory, account setup, backup checks, security basics, and a clear place to send problems.
              </SectionHeading>
              <div className="rt-check-grid">
                {[
                  "Microsoft 365 or Google Workspace setup",
                  "Router, Wi-Fi, and printer support",
                  "New hire device onboarding",
                  "Backup and security reviews",
                  "Vendor coordination and documentation",
                  "Priority support for active clients"
                ].map((item) => <span key={item}><Check size={15} />{item}</span>)}
              </div>
            </div>
            <div className="rt-difference-grid">
              {differencePoints.map((point) => {
                const Icon = point.icon;
                return (
                  <article key={point.title}>
                    <Icon size={21} />
                    <h3>{point.title}</h3>
                    <p>{point.detail}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rt-process-band">
            <div className="public-band rt-section">
              <SectionHeading
                kicker="How It Works"
                title="A clean support process from first message to finished fix."
              />
              <div className="rt-process-grid">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.article
                      className="rt-process-step"
                      key={step.title}
                      variants={reveal}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: index * 0.04, duration: 0.4 }}
                    >
                      <span>{index + 1}</span>
                      <Icon size={22} />
                      <h3>{step.title}</h3>
                      <p>{step.detail}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="public-band rt-section" id="plans">
            <SectionHeading
              kicker="Plans"
              title="Transparent starting points for repairs, visits, and monthly care."
            >
              Keep the first conversation simple. One-time fixes stay available, and repeat clients can move into priority monthly support.
            </SectionHeading>
            <PlansSection />
          </section>

          <section className="public-band rt-section rt-service-area" id="service-area">
            <div>
              <SectionHeading
                kicker="Service Area"
                title="Serving Asheville & WNC from a local support hub."
              >
                Remote help can start quickly. On-site support is prioritized around Asheville, Buncombe County, and nearby Western North Carolina communities.
              </SectionHeading>
              <div className="rt-area-grid">
                {serviceAreas.map((area) => <Chip key={area} icon={<MapPin size={14} />} label={area} />)}
              </div>
            </div>
            <ServiceAreaMap />
          </section>

          <section className="rt-proof-band">
            <div className="rt-proof-copy">
              <Sparkles size={24} />
              <h2>Professional IT help that feels local, calm, and accountable.</h2>
              <p>
                Built for people who need technology handled clearly: homeowners, freelancers, shops, clinics, offices, property operators, and small teams across WNC.
              </p>
            </div>
            <blockquote>
              <p>"The goal is simple: fix the issue, explain what changed, and leave the client with a cleaner path forward."</p>
              <cite>Robbins Technologies service standard</cite>
            </blockquote>
          </section>

          <section className="rt-business-plan-preview">
            <div className="public-band rt-section">
              <div>
                <SectionHeading
                  kicker="Business Plan"
                  title="A practical launch plan behind the public site."
                >
                  The launch plan focuses on repairs and setup work first, then converts repeat clients into recurring support agreements.
                </SectionHeading>
                <Button className="public-secondary rt-secondary" type="button" onClick={() => onNavigate("/business-plan")} variant="outlined">
                  Open business plan <FileText size={17} />
                </Button>
              </div>
              <div className="rt-preview-grid">
                {businessPlanSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <article key={section.title}>
                      <Icon size={19} />
                      <h3>{section.title}</h3>
                      <p>{section.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="public-band rt-section rt-contact-section" id="contact">
            <div>
              <SectionHeading
                kicker="Request Support"
                title="Tell Robbins Technologies what needs fixed, set up, or kept healthy."
              >
                A clear request helps triage the job, prepare for the first session, and decide whether remote or on-site support is the right start.
              </SectionHeading>
              <div className="rt-contact-methods">
                <Button component="a" href="mailto:support@robbinstechnologies.com"><Mail size={16} /> support@robbinstechnologies.com</Button>
                <Button type="button" onClick={() => onNavigate("/login")}><Lock size={16} /> Client dashboard</Button>
              </div>
              <FaqSection />
            </div>
            <SupportRequestForm />
          </section>
        </main>

        <PublicFooter onNavigate={onNavigate} />
      </div>
    </ThemeProvider>
  );
}

export function BusinessPlanPage({ onNavigate }) {
  const [activeBusinessTab, setActiveBusinessTab] = useState(0);

  return (
    <ThemeProvider theme={publicTheme}>
      <div className="public-site rt-public-site business-plan-site">
        <PublicNav onNavigate={onNavigate} compact />
        <main className="business-plan-page rt-business-page">
          <section className="plan-hero rt-plan-hero">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1>Robbins Technologies Business Plan</h1>
            <p>
              A focused launch plan for IT repairs, remote support, on-site service, business setups, monthly support, and urgent call-ins across Asheville and northwestern North Carolina.
            </p>
            <div className="rt-plan-actions">
              <Button className="public-primary rt-primary" type="button" onClick={() => onNavigate("/")} variant="contained">
                Back to site <ArrowRight size={17} />
              </Button>
              <Button className="public-secondary rt-secondary" component="a" href="mailto:support@robbinstechnologies.com" variant="outlined">
                Contact <Mail size={17} />
              </Button>
            </div>
          </motion.div>
          <div className="plan-scorecard rt-plan-scorecard">
            <Chip icon={<Home size={16} />} label="Homes and freelancers" />
            <Chip icon={<Building2 size={16} />} label="Small businesses" />
            <Chip icon={<Clock3 size={16} />} label="Recurring support" />
            <Chip icon={<MapPin size={16} />} label="WNC coverage" />
          </div>
        </section>

          <Tabs
            className="rt-business-tabs"
            value={activeBusinessTab}
            onChange={(_, value) => setActiveBusinessTab(value)}
            aria-label="Business plan sections"
            variant="scrollable"
            scrollButtons="auto"
          >
            {businessPlanTabLabels.map((tab) => (
              <Tab key={tab} className="rt-tab" label={tab} />
            ))}
          </Tabs>
          <div className="rt-business-panel" role="tabpanel" aria-label={businessPlanTabLabels[activeBusinessTab]}>
            {activeBusinessTab === 0 ? (
              <div className="plan-section-grid rt-plan-section-grid">
                {businessPlanSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <article className="plan-detail-card rt-plan-detail-card" key={section.title}>
                      <Icon size={22} />
                      <h2>{section.title}</h2>
                      <p>{section.body}</p>
                    </article>
                  );
                })}
              </div>
            ) : null}
            {activeBusinessTab === 1 ? (
              <div className="rt-plan-list-grid">
                <article>
                  <h2>Service Menu</h2>
                  <ul>
                    <li>Remote repair and support sessions for fast, low-friction fixes.</li>
                    <li>On-site repairs for devices, networks, Wi-Fi, printers, and office technology.</li>
                    <li>Business setup projects for new offices, new hires, migrations, and cleanup work.</li>
                    <li>Monthly support retainers for small teams that need a dependable IT lane.</li>
                    <li>Emergency call-ins for urgent outages and business-critical incidents.</li>
                  </ul>
                </article>
                <article>
                  <h2>Operational Standards</h2>
                  <ul>
                    <li>Remote support first when safe and practical, on-site service when hardware or network access is needed.</li>
                    <li>Standard intake for device, issue, urgency, business impact, location, access, and callback preference.</li>
                    <li>Checklists for cleanups, new PC setup, email setup, router replacement, and monthly health checks.</li>
                    <li>Response time, resolution time, revenue per visit, repeat clients, and plan conversions tracked from launch.</li>
                  </ul>
                </article>
              </div>
            ) : null}
            {activeBusinessTab === 2 ? (
              <div className="rt-plan-list-grid">
                <article>
                  <h2>Market Strategy</h2>
                  <ul>
                    <li>Lead with Asheville and Buncombe County, then expand through referrals across WNC.</li>
                    <li>Target hospitality, retail, trades, healthcare offices, nonprofits, real estate, and professional services.</li>
                    <li>Package setup work into fixed-scope offers so new clients know what they are buying.</li>
                    <li>Use every repair job as a path into backup, security, and monthly support conversations.</li>
                  </ul>
                </article>
                <article>
                  <h2>Marketing & Sales</h2>
                  <ul>
                    <li>Launch Google Business Profile, local SEO pages, review requests, and a simple referral offer.</li>
                    <li>Build relationships with coworking spaces, property managers, office managers, accountants, and local business groups.</li>
                    <li>Use before-and-after stories: slow network fixed, email migration completed, office setup launched, backup restored.</li>
                    <li>Send every completed job a maintenance recommendation and monthly support option.</li>
                  </ul>
                </article>
              </div>
            ) : null}
            {activeBusinessTab === 3 ? (
              <ol className="roadmap-list rt-roadmap-list">
                {roadmap.map((item) => <li key={item}>{item}</li>)}
              </ol>
            ) : null}
            {activeBusinessTab === 4 ? (
              <div className="financial-grid rt-financial-grid">
                <article><strong>$95-$125/hr</strong><span>Core hourly support range</span></article>
                <article><strong>$450+</strong><span>Starter setup projects</span></article>
                <article><strong>$599/mo</strong><span>Small business care anchor plan</span></article>
                <article><strong>10</strong><span>Initial monthly clients target</span></article>
              </div>
            ) : null}
          </div>

          <section className="source-strip rt-source-strip">
            <h2>Local Planning Sources</h2>
            {sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>)}
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
