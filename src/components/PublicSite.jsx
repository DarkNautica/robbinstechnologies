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
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  Cloud,
  Code,
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
import logoMark from "../assets/robbins-technologies-mark.png";
import logoLockup from "../assets/robbins-technologies-logo.png";
import circuitFieldImage from "../assets/rt-circuit-field-bg.webp";
import heroCircuitImage from "../assets/rt-hero-circuit-bg.webp";
import serviceAreaMountains from "../assets/rt-service-area-mountains.webp";
import securityCloudImage from "../assets/rt-security-cloud-cutout.webp";
import iconBackup from "../assets/rt-service-icons/rt-icon-backup.png";
import iconCloud from "../assets/rt-service-icons/rt-icon-cloud.png";
import iconCode from "../assets/rt-service-icons/rt-icon-code.png";
import iconSecurity from "../assets/rt-service-icons/rt-icon-security.png";
import iconServer from "../assets/rt-service-icons/rt-icon-server.png";
import iconSupport from "../assets/rt-service-icons/rt-icon-support.png";
import iconWeb from "../assets/rt-service-icons/rt-icon-web.png";
import iconWorkstation from "../assets/rt-service-icons/rt-icon-workstation.png";

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

const BUSINESS_PHONE = "8284366869";
const BUSINESS_PHONE_DISPLAY = "(828) 436-6869";
const BUSINESS_PHONE_TEL = `tel:+1${BUSINESS_PHONE}`;

const serviceAreas = [
  "Asheville",
  "Buncombe County",
  "Arden",
  "Hendersonville",
  "Waynesville",
  "Black Mountain",
  "Weaverville",
  "Boone",
  "Mars Hill",
  "Marion",
  "Morganton",
  "Surrounding areas",
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
    name: "Business Support",
    icon: Building2,
    intro: "Practical IT help for small teams that need reliable computers, email, Wi-Fi, and day-to-day support.",
    services: [
      {
        title: "Managed IT Support",
        icon: ShieldCheck,
        asset: iconSupport,
        detail: "Stop chasing random fixes. Get a steady support lane for tickets, users, devices, vendors, and recurring maintenance."
      },
      {
        title: "Business Email Setup",
        icon: Cloud,
        asset: iconCloud,
        detail: "Move beyond messy personal email. Get Microsoft 365 or Google Workspace, account security, shared access, and backups handled correctly."
      },
      {
        title: "Network & Wi-Fi Setup",
        icon: Wifi,
        asset: iconServer,
        detail: "Fix spotty Wi-Fi, unreliable routers, printer issues, and undocumented network gear so the business can actually work."
      }
    ]
  },
  {
    name: "Security + Data",
    icon: ShieldCheck,
    intro: "Security, backup, and recovery basics for businesses that cannot afford avoidable downtime or data loss.",
    services: [
      {
        title: "Cybersecurity Setup",
        icon: Lock,
        asset: iconSecurity,
        detail: "Harden accounts, devices, passwords, updates, and backups with sensible protection that fits a small-business budget."
      },
      {
        title: "Data Backup & Recovery",
        icon: Server,
        asset: iconBackup,
        detail: "Put business files, website assets, and key documents on a clearer backup path before a device fails or files disappear."
      },
      {
        title: "Emergency IT Help",
        icon: PhoneCall,
        asset: iconWorkstation,
        detail: "Email down, network offline, computer issue, or security concern? Call Robbins Technologies for urgent triage."
      }
    ]
  },
  {
    name: "Web + Automation",
    icon: Code,
    intro: "Modern websites, hosting, automations, and AI tooling that connect the public site to real operations.",
    services: [
      {
        title: "Website Design & Hosting",
        icon: Monitor,
        asset: iconWeb,
        detail: "Build or clean up a business website with hosting, DNS, Cloudflare, forms, analytics, and local SEO basics."
      },
      {
        title: "Automation & AI Tools",
        icon: Code,
        asset: iconCode,
        detail: "Turn repetitive admin work into smoother workflows with forms, dashboards, notifications, and practical AI helpers."
      },
      {
        title: "Computer Repair / Device Setup",
        icon: Wrench,
        asset: iconWorkstation,
        detail: "Set up new devices, clean slow machines, install software, migrate files, and make the workstation usable again."
      }
    ]
  }
];

const appointmentTypes = [
  "Free consultation",
  "Remote support session",
  "On-site visit",
  "Emergency triage",
  "Monthly IT support review"
];

const urgencyOptions = [
  "Today if possible",
  "This week",
  "Planning ahead",
  "Emergency"
];

const supportModeOptions = [
  "Start remote",
  "On-site preferred",
  "Either is fine",
  "Not sure yet"
];

const appointmentTimes = [
  "Morning",
  "Lunch window",
  "Afternoon",
  "After hours"
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
        <Button className="rt-phone-link" component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
        <Button className="rt-nav-cta" component="a" href="/#contact" onClick={(event) => goSection(event, "contact")}>Schedule Support</Button>
        <Button className="public-login rt-login-link" type="button" onClick={() => onNavigate("/login")}>
          Client Login
        </Button>
      </nav>
      <div className="rt-mobile-nav-controls" aria-label="Mobile navigation controls">
        <Button className="rt-mobile-cta" component="a" href={BUSINESS_PHONE_TEL}>
          Call
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
        <MenuItem component="a" href={BUSINESS_PHONE_TEL}>Call {BUSINESS_PHONE_DISPLAY}</MenuItem>
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
    business: "",
    phone: "",
    email: "",
    service: "Managed IT Support",
    urgency: "This week",
    users: "",
    supportMode: "Start remote",
    detail: ""
  });

  const serviceOptions = useMemo(
    () => serviceTabs.flatMap((tab) => tab.services.map((service) => service.title)),
    []
  );

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`${request.service} request`);
    const body = encodeURIComponent(
      `Name: ${request.name}\nBusiness: ${request.business}\nPhone: ${request.phone}\nEmail: ${request.email}\nService: ${request.service}\nUrgency: ${request.urgency}\nComputers/users: ${request.users}\nRemote or on-site: ${request.supportMode}\n\nWhat is going on?\n${request.detail}`
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
        id="support-business"
        name="business"
        label="Business name"
        value={request.business}
        onChange={(event) => setRequest((current) => ({ ...current, business: event.target.value }))}
        placeholder="Optional for home support"
        autoComplete="organization"
        slotProps={{ htmlInput: { "aria-label": "Business name" } }}
      />
      <TextField
        className="rt-form-field"
        id="support-phone"
        name="phone"
        label="Phone"
        value={request.phone}
        onChange={(event) => setRequest((current) => ({ ...current, phone: event.target.value }))}
        placeholder={BUSINESS_PHONE_DISPLAY}
        autoComplete="tel"
        required
        slotProps={{ htmlInput: { "aria-label": "Phone" } }}
      />
      <TextField
        className="rt-form-field"
        id="support-email"
        name="email"
        label="Email"
        value={request.email}
        onChange={(event) => setRequest((current) => ({ ...current, email: event.target.value }))}
        placeholder="you@example.com"
        autoComplete="email"
        required
        slotProps={{ htmlInput: { "aria-label": "Email" } }}
      />
      <FormControl className="rt-form-field" required>
        <InputLabel id="support-service-label">What do you need help with?</InputLabel>
        <Select
          labelId="support-service-label"
          id="support-service"
          name="service"
          value={request.service}
          label="What do you need help with?"
          onChange={(event) => setRequest((current) => ({ ...current, service: event.target.value }))}
          inputProps={{ "aria-label": "Service" }}
        >
          {serviceOptions.map((service) => <MenuItem key={service} value={service}>{service}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className="rt-form-field" required>
        <InputLabel id="support-urgency-label">How urgent is it?</InputLabel>
        <Select
          labelId="support-urgency-label"
          id="support-urgency"
          name="urgency"
          value={request.urgency}
          label="How urgent is it?"
          onChange={(event) => setRequest((current) => ({ ...current, urgency: event.target.value }))}
          inputProps={{ "aria-label": "How urgent is it?" }}
        >
          {urgencyOptions.map((urgency) => <MenuItem key={urgency} value={urgency}>{urgency}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        className="rt-form-field"
        id="support-users"
        name="users"
        label="How many computers/users?"
        value={request.users}
        onChange={(event) => setRequest((current) => ({ ...current, users: event.target.value }))}
        placeholder="Example: 3 users, 5 computers"
        slotProps={{ htmlInput: { "aria-label": "How many computers or users?" } }}
      />
      <FormControl className="rt-form-field" required>
        <InputLabel id="support-mode-label">Remote or on-site?</InputLabel>
        <Select
          labelId="support-mode-label"
          id="support-mode"
          name="supportMode"
          value={request.supportMode}
          label="Remote or on-site?"
          onChange={(event) => setRequest((current) => ({ ...current, supportMode: event.target.value }))}
          inputProps={{ "aria-label": "Remote or on-site?" }}
        >
          {supportModeOptions.map((mode) => <MenuItem key={mode} value={mode}>{mode}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        className="rt-form-field full rt-detail-field"
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
        <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
          Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
        </Button>
        <p aria-live="polite">
          {submitted ? "Your email client is opening with the support request ready." : "For urgent outages, calling is the fastest path."}
        </p>
      </div>
    </form>
  );
}

function ServiceCardIcon({ service }) {
  if (service.asset) {
    return (
      <span className="rt-service-card-icon">
        <img src={service.asset} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  const Icon = service.icon;
  return <span className="rt-service-card-icon"><Icon size={21} /></span>;
}

function SchedulingPanel() {
  const [submitted, setSubmitted] = useState(false);
  const [appointment, setAppointment] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Free consultation",
    date: "",
    time: "Morning",
    urgency: "This week",
    mode: "Start remote",
    notes: ""
  });

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Schedule ${appointment.type}`);
    const body = encodeURIComponent(
      `Name: ${appointment.name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\nAppointment type: ${appointment.type}\nPreferred date: ${appointment.date}\nPreferred time: ${appointment.time}\nUrgency: ${appointment.urgency}\nRemote or on-site: ${appointment.mode}\n\nNotes:\n${appointment.notes}`
    );
    return `mailto:support@robbinstechnologies.com?subject=${subject}&body=${body}`;
  }, [appointment]);

  return (
    <section className="rt-scheduler-panel" aria-label="Schedule Robbins Technologies support">
      <div className="rt-scheduler-copy">
        <CalendarDays size={24} />
        <h2>Schedule IT help online.</h2>
        <p>
          Pick the kind of help you need and the best time window. Robbins Technologies will confirm the appointment and whether remote or on-site support is the right start.
        </p>
        <div className="rt-scheduler-callout">
          <PhoneCall size={18} />
          <span>Need help faster? Call <a href={BUSINESS_PHONE_TEL}>{BUSINESS_PHONE_DISPLAY}</a>.</span>
        </div>
      </div>
      <form
        className="rt-scheduler-form"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          window.location.href = mailto;
        }}
      >
        <TextField
          className="rt-form-field"
          id="schedule-name"
          name="name"
          label="Name"
          value={appointment.name}
          onChange={(event) => setAppointment((current) => ({ ...current, name: event.target.value }))}
          autoComplete="name"
          required
        />
        <TextField
          className="rt-form-field"
          id="schedule-phone"
          name="phone"
          label="Phone"
          value={appointment.phone}
          onChange={(event) => setAppointment((current) => ({ ...current, phone: event.target.value }))}
          autoComplete="tel"
          required
        />
        <TextField
          className="rt-form-field"
          id="schedule-email"
          name="email"
          label="Email"
          value={appointment.email}
          onChange={(event) => setAppointment((current) => ({ ...current, email: event.target.value }))}
          autoComplete="email"
          required
        />
        <FormControl className="rt-form-field" required>
          <InputLabel id="schedule-type-label">Appointment type</InputLabel>
          <Select
            labelId="schedule-type-label"
            id="schedule-type"
            name="type"
            value={appointment.type}
            label="Appointment type"
            onChange={(event) => setAppointment((current) => ({ ...current, type: event.target.value }))}
          >
            {appointmentTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          className="rt-form-field"
          id="schedule-date"
          name="date"
          label="Preferred date"
          type="date"
          value={appointment.date}
          onChange={(event) => setAppointment((current) => ({ ...current, date: event.target.value }))}
          required
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: minDate } }}
        />
        <FormControl className="rt-form-field" required>
          <InputLabel id="schedule-time-label">Best time</InputLabel>
          <Select
            labelId="schedule-time-label"
            id="schedule-time"
            name="time"
            value={appointment.time}
            label="Best time"
            onChange={(event) => setAppointment((current) => ({ ...current, time: event.target.value }))}
          >
            {appointmentTimes.map((time) => <MenuItem key={time} value={time}>{time}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="rt-form-field" required>
          <InputLabel id="schedule-urgency-label">Urgency</InputLabel>
          <Select
            labelId="schedule-urgency-label"
            id="schedule-urgency"
            name="urgency"
            value={appointment.urgency}
            label="Urgency"
            onChange={(event) => setAppointment((current) => ({ ...current, urgency: event.target.value }))}
          >
            {urgencyOptions.map((urgency) => <MenuItem key={urgency} value={urgency}>{urgency}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className="rt-form-field" required>
          <InputLabel id="schedule-mode-label">Support type</InputLabel>
          <Select
            labelId="schedule-mode-label"
            id="schedule-mode"
            name="mode"
            value={appointment.mode}
            label="Support type"
            onChange={(event) => setAppointment((current) => ({ ...current, mode: event.target.value }))}
          >
            {supportModeOptions.map((mode) => <MenuItem key={mode} value={mode}>{mode}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          className="rt-form-field full"
          id="schedule-notes"
          name="notes"
          label="What should be handled?"
          value={appointment.notes}
          onChange={(event) => setAppointment((current) => ({ ...current, notes: event.target.value }))}
          placeholder="Email down, new office setup, Wi-Fi issue, website help, monthly support..."
          multiline
          minRows={3}
        />
        <div className="rt-form-footer">
          <Button className="public-primary rt-primary" type="submit" variant="contained">
            Request appointment <CalendarDays size={17} />
          </Button>
          <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
            Call now <PhoneCall size={17} />
          </Button>
          <p aria-live="polite">
            {submitted ? "Your email client is opening with the scheduling request ready." : "Submitting this starts a scheduling request, not a confirmed appointment."}
          </p>
        </div>
      </form>
    </section>
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
                <ServiceCardIcon service={service} />
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
        <a href={BUSINESS_PHONE_TEL}>Call {BUSINESS_PHONE_DISPLAY}</a>
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
          <section className="public-hero rt-hero rt-hero-v2 rt-hero-graphic" style={{ "--hero-image": `url(${heroCircuitImage})` }}>
            <div className="rt-hero-inner">
              <motion.div
                className="rt-hero-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52 }}
              >
                <h1>Reliable IT support for Asheville businesses.</h1>
                <p>
                  Cybersecurity, websites, automation, remote help, on-site repair, backup, and monthly IT care for small businesses in northwestern North Carolina.
                </p>
                <div className="hero-actions rt-hero-actions">
                  <Button className="public-primary rt-primary" component="a" href="#contact" variant="contained">
                    Schedule Free Consultation <ArrowRight size={17} />
                  </Button>
                  <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
                    Call Now <PhoneCall size={17} />
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
              <h2>Need urgent IT help?</h2>
              <p>Email down? Network offline? Computer issue? Security concern? Call Robbins Technologies for fast triage.</p>
            </div>
            <Button className="rt-emergency-button" component="a" href={BUSINESS_PHONE_TEL}>
              Call for Emergency Help <PhoneCall size={17} />
            </Button>
          </section>

          <section className="public-band rt-section rt-services-section">
            <SectionHeading
              kicker="What We Fix"
              title="Clear categories, practical fixes, and no mystery tech talk."
            >
              Use the tabs to see common work across business support, security, data, websites, and automation.
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
            <div className="rt-difference-visual-stack">
              <img className="rt-security-visual" src={securityCloudImage} alt="Secure cloud, servers, backup, and business technology protection" loading="lazy" decoding="async" />
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
                title="Proudly serving Asheville and northwestern North Carolina."
              >
                Remote help can start quickly. On-site support is prioritized around Asheville, Buncombe County, Boone, Hendersonville, Weaverville, Arden, Black Mountain, and surrounding areas.
              </SectionHeading>
              <div className="rt-area-grid">
                {serviceAreas.map((area) => <Chip key={area} icon={<MapPin size={14} />} label={area} />)}
              </div>
            </div>
            <ServiceAreaMap />
            <figure className="rt-service-area-graphic">
              <img src={serviceAreaMountains} alt="Proudly serving Asheville and northwestern North Carolina" loading="lazy" decoding="async" />
            </figure>
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

          <div className="public-band rt-section rt-schedule-section" style={{ "--schedule-bg": `url(${circuitFieldImage})` }}>
            <SchedulingPanel />
          </div>

          <section className="public-band rt-section rt-contact-section" id="contact">
            <div>
              <SectionHeading
                kicker="Request Support"
                title="Tell Robbins Technologies what needs fixed, set up, or kept healthy."
              >
                A clear request helps triage the job, prepare for the first session, and decide whether remote or on-site support is the right start.
              </SectionHeading>
              <div className="rt-contact-methods">
                <Button component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
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
              <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
                Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
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
