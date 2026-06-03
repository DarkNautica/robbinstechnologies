import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  FormControl,
  InputLabel,
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

const publicTheme = createTheme({
  palette: {
    primary: {
      main: "#087f73",
      dark: "#102a32",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#d98718"
    },
    text: {
      primary: "#102a32",
      secondary: "#5d6f71"
    },
    background: {
      default: "#f6faf9",
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
  { label: "Remote and on-site help", icon: Laptop },
  { label: "Home and business repairs", icon: Wrench },
  { label: "Monthly IT care", icon: ShieldCheck },
  { label: "Plain-language support", icon: BadgeCheck }
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
    <span className="brand-mark rt-brand-mark" aria-hidden="true">
      <span>RT</span>
    </span>
  );
}

function PublicNav({ onNavigate, compact = false }) {
  const goSection = (event, id) => {
    event.preventDefault();
    scrollToSection(id, onNavigate);
  };

  return (
    <header className={`public-nav rt-public-nav ${compact ? "compact" : ""}`}>
      <button className="public-brand rt-public-brand" type="button" onClick={() => onNavigate("/")}>
        <BrandMark />
        <span>
          <strong>Robbins Technologies</strong>
          <small>Asheville IT Support</small>
        </span>
      </button>
      <nav aria-label="Public navigation">
        <Button className="rt-nav-link" component="a" href="/#services" onClick={(event) => goSection(event, "services")}>Services</Button>
        <Button className="rt-nav-link" component="a" href="/#managed-it" onClick={(event) => goSection(event, "managed-it")}>Managed IT</Button>
        <Button className="rt-nav-link" component="a" href="/#service-area" onClick={(event) => goSection(event, "service-area")}>Service Area</Button>
        <Button className="rt-nav-link" type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</Button>
        <Button className="rt-nav-cta" component="a" href="/#contact" onClick={(event) => goSection(event, "contact")}>Schedule Support</Button>
        <Button className="public-login rt-login-link" type="button" onClick={() => onNavigate("/login")}>
          Client Login
        </Button>
      </nav>
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

export function PublicLanding({ onNavigate }) {
  return (
    <ThemeProvider theme={publicTheme}>
      <div className="public-site rt-public-site">
        <PublicNav onNavigate={onNavigate} />

      <main>
        <section className="public-hero rt-hero" style={{ "--hero-image": `url(${heroImage})` }}>
          <div className="rt-hero-inner">
            <motion.div
              className="rt-hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52 }}
            >
              <h1>IT Support in Asheville & Western North Carolina</h1>
              <p>
                Remote help, on-site repairs, business setups, and monthly IT care for homes and small teams that need technology to work without drama.
              </p>
              <div className="hero-actions rt-hero-actions">
                <Button className="public-primary rt-primary" component="a" href="#contact" variant="contained">
                  Schedule Support <ArrowRight size={17} />
                </Button>
                <Button className="public-secondary rt-secondary" component="a" href="#plans" variant="outlined">
                  See Plans
                </Button>
              </div>
              <div className="rt-hero-proof" aria-label="Support highlights">
                {proofPoints.map((item) => {
                  const Icon = item.icon;
                  return <Chip key={item.label} icon={<Icon size={16} />} label={item.label} />;
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="rt-client-strip" aria-label="Primary services">
          {[
            "Computer repair",
            "Remote support",
            "Business setups",
            "Monthly IT support",
            "Urgent call-ins"
          ].map((item) => <Chip key={item} label={item} />)}
        </section>

        <motion.section
          className="public-band rt-section rt-services-section"
          id="services"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeading
            kicker="Services"
            title="A practical IT help desk for homes, shops, clinics, offices, and local teams."
          >
            Choose the support lane that matches the problem. The site is designed so clients can quickly understand what to request and how the work starts.
          </SectionHeading>
          <ServicesTabs />
        </motion.section>

        <section className="public-band rt-section rt-split-section" id="managed-it">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.44 }}
          >
            <SectionHeading
              kicker="Managed IT"
              title="Keep the office moving with recurring care instead of last-minute scrambling."
            >
              Monthly support gives small businesses a steady point of contact for devices, networks, accounts, backups, vendor coordination, and sensible security basics.
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
          </motion.div>

          <motion.aside
            className="rt-operations-panel"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08, duration: 0.44 }}
            aria-label="Managed IT checklist"
          >
            <div className="rt-ops-header">
              <Router size={24} />
              <div>
                <strong>Monthly care rhythm</strong>
                <span>Simple, visible, and useful</span>
              </div>
            </div>
            {[
              ["Device inventory", "Known workstations and priorities"],
              ["Security basics", "Accounts, updates, and backups reviewed"],
              ["Support notes", "Plain-language history for future fixes"],
              ["Quarterly roadmap", "Better planning for devices and services"]
            ].map(([title, detail]) => (
              <div className="rt-ops-row" key={title}>
                <span className="rt-status-dot" />
                <div>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
              </div>
            ))}
          </motion.aside>
        </section>

        <section className="rt-process-band">
          <div className="public-band rt-section">
            <SectionHeading
              kicker="How it works"
              title="A support process built for clarity from the first message."
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
            title="Transparent starting points for one-time fixes and ongoing support."
          >
            Pricing is intentionally simple at launch. Larger projects can be scoped after the first conversation.
          </SectionHeading>
          <PlansSection />
        </section>

        <section className="public-band rt-section rt-service-area" id="service-area">
          <div>
            <SectionHeading
              kicker="Service area"
              title="Based in Asheville, built for Western and northwestern North Carolina."
            >
              Remote help can start quickly. On-site availability is prioritized around Asheville and nearby WNC communities.
            </SectionHeading>
            <Button className="public-primary rt-primary" type="button" onClick={() => scrollToSection("contact", onNavigate)} variant="contained">
              Request local support <ArrowRight size={17} />
            </Button>
          </div>
          <div className="rt-area-grid">
            {serviceAreas.map((area) => <Chip key={area} icon={<MapPin size={14} />} label={area} />)}
          </div>
        </section>

        <section className="rt-business-plan-preview">
          <div className="public-band rt-section">
            <div>
              <SectionHeading
                kicker="Business plan"
                title="The public site is backed by a practical local IT business plan."
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
              kicker="Request support"
              title="Tell Robbins Technologies what you need fixed, set up, or kept healthy."
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
