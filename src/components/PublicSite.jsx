import { useEffect, useMemo, useState } from "react";
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

const westernNcCountyMap = {
  viewBox: "0 0 680 430",
  features: [
    { id: "37011", name: "Avery", d: "M518.1 167.7 L507.0 161.2 L497.2 126.7 L508.6 121.5 L531.5 88.4 L533.4 103.3 L554.0 125.4 L569.9 134.9 L554.9 157.0 L535.4 149.0 L522.0 161.3 L523.8 164.4 L518.1 167.7 Z" },
    { id: "37021", name: "Buncombe", d: "M478.5 248.7 L457.9 261.8 L393.8 269.1 L372.2 263.1 L357.0 270.7 L345.2 260.8 L352.3 240.4 L327.6 216.9 L343.8 215.3 L405.6 190.5 L427.9 187.4 L440.7 189.0 L456.1 211.4 L452.8 235.3 L478.5 248.7 Z", highlight: true },
    { id: "37023", name: "Burke", d: "M551.3 238.7 L541.8 208.2 L516.9 189.7 L533.9 173.6 L526.1 157.5 L535.4 149.0 L554.9 157.0 L608.0 196.0 L648.5 198.0 L612.5 240.0 L579.2 237.7 L551.3 238.7 Z" },
    { id: "37027", name: "Caldwell", d: "M654.8 192.0 L652.2 192.5 L650.6 197.8 L648.5 198.0 L608.0 196.0 L554.9 157.0 L569.9 134.9 L554.0 125.4 L610.2 124.2 L656.0 149.7 L654.8 192.0 Z" },
    { id: "37039", name: "Cherokee", d: "M24.0 362.6 L30.7 312.5 L43.9 303.6 L49.1 306.1 L71.4 307.9 L85.8 298.7 L100.7 314.3 L124.7 306.2 L154.8 307.7 L147.2 327.2 L122.1 331.2 L90.8 362.8 L24.0 362.6 Z" },
    { id: "37043", name: "Clay", d: "M201.1 361.4 L90.8 362.8 L122.1 331.2 L163.8 326.3 L201.1 361.4 Z" },
    { id: "37075", name: "Graham", d: "M85.8 298.7 L87.4 296.5 L83.9 286.6 L86.7 285.4 L91.5 270.9 L100.1 263.1 L179.5 268.3 L154.8 307.7 L124.7 306.2 L100.7 314.3 L85.8 298.7 Z" },
    { id: "37087", name: "Haywood", d: "M249.4 213.2 L250.0 208.1 L268.3 199.7 L281.9 196.5 L304.0 196.9 L310.7 192.5 L327.6 216.9 L352.3 240.4 L345.2 260.8 L357.0 270.7 L338.5 292.9 L319.8 298.5 L303.7 281.4 L263.8 251.5 L264.7 218.4 L249.4 213.2 Z", highlight: true },
    { id: "37089", name: "Henderson", d: "M439.8 316.5 L433.1 315.7 L392.9 329.7 L383.4 296.0 L356.9 270.8 L372.2 263.1 L393.8 269.1 L457.9 261.8 L455.2 266.0 L457.1 275.6 L459.0 277.1 L441.1 299.7 L439.8 316.5 Z", highlight: true },
    { id: "37099", name: "Jackson", d: "M319.8 298.5 L306.6 332.3 L291.4 348.7 L301.3 354.4 L280.2 359.9 L231.4 290.2 L228.9 261.2 L263.8 251.5 L303.7 281.4 L319.8 298.5 Z" },
    { id: "37115", name: "Madison", d: "M324.5 160.6 L334.2 159.7 L338.9 163.1 L354.9 148.1 L379.7 135.1 L386.9 140.6 L384.4 148.9 L385.2 154.6 L396.5 158.6 L407.4 153.6 L427.9 187.4 L405.6 190.5 L343.8 215.3 L327.6 216.9 L310.7 192.5 L324.6 174.0 L321.4 165.0 L324.5 160.6 Z", highlight: true },
    { id: "37111", name: "McDowell", d: "M551.3 238.7 L519.8 249.4 L513.6 243.6 L478.5 248.7 L452.8 235.3 L456.1 211.4 L472.6 204.6 L486.1 186.0 L523.8 164.4 L522.0 161.3 L526.1 157.5 L533.9 173.6 L516.9 189.7 L541.8 208.2 L551.3 238.7 Z" },
    { id: "37121", name: "Mitchell", d: "M426.2 133.6 L434.9 126.7 L464.0 119.6 L467.3 115.9 L483.0 117.4 L486.6 126.5 L497.2 126.7 L507.0 161.2 L518.1 167.7 L486.1 186.0 L472.1 145.6 L442.8 142.6 L426.2 133.6 Z" },
    { id: "37149", name: "Polk", d: "M520.7 320.6 L439.8 316.5 L441.1 299.7 L459.0 277.1 L489.9 278.3 L520.8 305.7 L520.7 320.6 Z" },
    { id: "37161", name: "Rutherford", d: "M540.7 321.2 L520.7 320.6 L520.8 305.7 L489.9 278.3 L459.0 277.1 L457.1 275.6 L455.2 266.0 L457.9 261.8 L478.5 248.7 L513.6 243.6 L519.8 249.4 L551.3 238.7 L579.2 237.7 L576.9 284.7 L563.2 322.1 L540.7 321.2 Z" },
    { id: "37175", name: "Transylvania", d: "M352.8 345.7 L349.1 346.0 L349.3 342.3 L301.3 354.4 L291.4 348.7 L306.6 332.3 L319.8 298.5 L338.5 292.9 L356.9 270.8 L383.4 296.0 L392.9 329.7 L369.3 334.4 L352.8 345.7 Z" },
    { id: "37189", name: "Watauga", d: "M572.1 77.1 L573.1 67.2 L605.8 91.5 L624.6 98.3 L629.1 106.8 L610.2 124.2 L554.0 125.4 L533.4 103.3 L531.5 88.4 L544.8 77.8 L557.8 72.9 L558.6 75.4 L563.8 77.5 L571.0 76.9 Z", highlight: true },
    { id: "37199", name: "Yancey", d: "M416.5 147.4 L426.2 133.6 L442.8 142.6 L472.1 145.6 L486.1 186.0 L472.6 204.6 L456.1 211.4 L440.7 189.0 L427.9 187.4 L407.4 153.6 L416.5 147.4 Z" }
  ],
  towns: [
    { name: "Asheville", x: 397.8, y: 234.5, type: "hub" },
    { name: "Hendersonville", x: 416.9, y: 292.8, type: "city" },
    { name: "Boone", x: 582.9, y: 103.2, type: "city" },
    { name: "Waynesville", x: 305.5, y: 256.9, type: "city" },
    { name: "Black Mountain", x: 446.4, y: 229.7, type: "city" },
    { name: "Weaverville", x: 395.8, y: 212.9, type: "city" }
  ]
};

const urgentSupportSteps = [
  { label: "Call answered", detail: "Business impact and urgency sorted first", icon: PhoneCall },
  { label: "Remote triage", detail: "Start safely online when possible", icon: Laptop },
  { label: "On-site path", detail: "Schedule hands-on work when needed", icon: Wrench }
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
    action: "Fix home tech",
    path: "/contact"
  },
  {
    title: "Business Setup",
    icon: Building2,
    audience: "For new offices, new hires, and small teams",
    summary: "Workstations, Microsoft 365 or Google Workspace, shared files, printers, routers, and onboarding.",
    includes: ["New device rollout", "Email and file sharing", "Network and printer setup"],
    action: "Plan a setup",
    path: "/business-email-setup"
  },
  {
    title: "Managed IT",
    icon: ShieldCheck,
    audience: "For teams that need ongoing support",
    summary: "Monthly care, priority response, health checks, vendor coordination, security basics, and documentation.",
    includes: ["Priority support lane", "Monthly health checks", "Backup and security review"],
    action: "See monthly care",
    path: "/small-business-it-support-asheville"
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

const homePageMeta = {
  path: "/",
  metaTitle: "Robbins Technologies | Asheville IT Support, Cybersecurity, Websites & Automation",
  metaDescription: "Fast local IT support, cybersecurity, websites, hosting, and automation for small businesses in Asheville and northwestern North Carolina."
};

const primaryServicePages = [
  {
    path: "/small-business-it-support-asheville",
    navLabel: "IT Support",
    shortTitle: "Small Business IT",
    title: "Small business IT support in Asheville, NC.",
    metaTitle: "Small Business IT Support Asheville NC | Robbins Technologies",
    metaDescription: "Remote and on-site IT support for Asheville small businesses, including computers, users, Wi-Fi, email, backups, vendors, and monthly care.",
    icon: ShieldCheck,
    asset: iconSupport,
    serviceType: "Small Business IT Support",
    intro: "Robbins Technologies gives Asheville teams a practical support lane for the daily problems that slow work down.",
    problem: "Computers, email, Wi-Fi, printers, shared files, vendors, and user access should not eat your week.",
    primaryAction: "Schedule Free IT Review",
    quickWins: ["Remote troubleshooting", "On-site repair when needed", "User and device setup", "Vendor coordination"],
    deliverables: [
      "A first-pass review of users, devices, accounts, and urgent issues.",
      "Plain-language recommendations for fixing what is unstable now.",
      "A support path for recurring maintenance, security basics, and future setup work."
    ],
    outcomes: ["Less downtime", "Cleaner documentation", "A clear place to ask for help"],
    related: ["/business-email-setup", "/network-wifi-setup", "/data-backup-recovery"],
    faqs: [
      {
        question: "Do you support very small offices?",
        answer: "Yes. The service is built for solo operators, freelancers, and small teams that need dependable help without hiring internal IT."
      },
      {
        question: "Can support start remotely?",
        answer: "Yes. Most triage starts remote. On-site service is scheduled when hardware, cabling, Wi-Fi coverage, or physical setup needs hands-on work."
      }
    ]
  },
  {
    path: "/cybersecurity-asheville-nc",
    navLabel: "Cybersecurity",
    shortTitle: "Cybersecurity",
    title: "Cybersecurity setup for Asheville small businesses.",
    metaTitle: "Cybersecurity Asheville NC | Small Business Security Setup",
    metaDescription: "Security setup for Asheville businesses, including account protection, MFA, password cleanup, backups, device hardening, and security reviews.",
    icon: Lock,
    asset: iconSecurity,
    serviceType: "Cybersecurity Setup",
    intro: "Good security starts with the basics done correctly: accounts, passwords, updates, backups, permissions, and recovery paths.",
    problem: "Small businesses are often exposed by reused passwords, unprotected email, missing backups, and devices that have not been reviewed in years.",
    primaryAction: "Request Security Review",
    quickWins: ["MFA setup", "Password cleanup", "Backup review", "Device hardening"],
    deliverables: [
      "A practical security checklist for your accounts, devices, and core business data.",
      "Help turning on MFA, cleaning up access, and reducing obvious risk.",
      "A backup and recovery conversation before a device failure or account issue becomes a crisis."
    ],
    outcomes: ["Fewer account surprises", "Better recovery options", "Security steps a small team can actually maintain"],
    related: ["/data-backup-recovery", "/business-email-setup", "/small-business-it-support-asheville"],
    faqs: [
      {
        question: "Is this a full enterprise security audit?",
        answer: "No. This is practical small-business security setup and review. The goal is to close common gaps quickly and create a better support path."
      },
      {
        question: "Can you help after a suspicious email or account issue?",
        answer: "Yes. Call for urgent triage if an email account, device, or login looks compromised."
      }
    ]
  },
  {
    path: "/website-design-hosting-asheville",
    navLabel: "Websites",
    shortTitle: "Websites",
    title: "Website design, hosting, and local SEO for Asheville businesses.",
    metaTitle: "Website Design Asheville NC | Hosting, SEO & Business Automation",
    metaDescription: "Business websites, hosting, forms, Cloudflare setup, local SEO, and automation for Asheville and western North Carolina companies.",
    icon: Monitor,
    asset: iconWeb,
    serviceType: "Website Design and Hosting",
    intro: "A business website should bring in leads, explain the offer clearly, and connect to the way the business actually operates.",
    problem: "Most small-business sites look fine but miss the basics: clear calls to action, local service pages, fast hosting, forms, analytics, and follow-up.",
    primaryAction: "Plan Website Project",
    quickWins: ["Local landing pages", "Fast hosting", "Lead forms", "Cloudflare setup"],
    deliverables: [
      "A modern React website or cleanup plan for an existing site.",
      "Hosting, DNS, SSL, contact forms, analytics, sitemap, and local SEO basics.",
      "A conversion path that makes it easy for customers to call, schedule, or request a quote."
    ],
    outcomes: ["A clearer offer", "Better local relevance", "Lead capture that is easier to follow up"],
    related: ["/automation-ai-tools", "/small-business-it-support-asheville", "/business-email-setup"],
    faqs: [
      {
        question: "Can you rebuild an existing website?",
        answer: "Yes. Existing sites can be cleaned up, rebuilt, moved to better hosting, or expanded with forms, service pages, and automation."
      },
      {
        question: "Do you handle domain and Cloudflare setup?",
        answer: "Yes. Website projects can include DNS, SSL, Cloudflare Pages, redirects, and basic performance cleanup."
      }
    ]
  },
  {
    path: "/business-email-setup",
    navLabel: "Business Email",
    shortTitle: "Email Setup",
    title: "Business email setup for teams that need clean accounts and access.",
    metaTitle: "Business Email Setup | Google Workspace & Microsoft 365 Asheville",
    metaDescription: "Business email setup, Google Workspace, Microsoft 365, DNS records, user access, security, and shared mailbox support for Asheville businesses.",
    icon: Cloud,
    asset: iconCloud,
    serviceType: "Business Email Setup",
    intro: "Professional email should be secure, organized, and easy to manage as people join or leave the business.",
    problem: "Personal inboxes, missing DNS records, weak passwords, and scattered access make a company look less professional and harder to protect.",
    primaryAction: "Set Up Business Email",
    quickWins: ["Google Workspace", "Microsoft 365", "DNS records", "Shared access"],
    deliverables: [
      "Mailbox setup or cleanup for Google Workspace or Microsoft 365.",
      "DNS help for MX, SPF, DKIM, and DMARC records when access is available.",
      "User, alias, shared mailbox, and security setup recommendations."
    ],
    outcomes: ["Professional email", "Cleaner access", "Fewer login headaches"],
    related: ["/cybersecurity-asheville-nc", "/small-business-it-support-asheville", "/website-design-hosting-asheville"],
    faqs: [
      {
        question: "Can you migrate from personal email?",
        answer: "Yes. The first step is reviewing the current setup, then planning accounts, records, and access so the move is not chaotic."
      },
      {
        question: "Can you help with DNS records?",
        answer: "Yes. Robbins Technologies can help configure email DNS records when the right domain access is available."
      }
    ]
  },
  {
    path: "/network-wifi-setup",
    navLabel: "Network & Wi-Fi",
    shortTitle: "Network Wi-Fi",
    title: "Network and Wi-Fi setup for Asheville offices and workspaces.",
    metaTitle: "Network & Wi-Fi Setup Asheville NC | Robbins Technologies",
    metaDescription: "Router, Wi-Fi, printer, workstation, and small office network setup for Asheville and western North Carolina businesses.",
    icon: Wifi,
    asset: iconServer,
    serviceType: "Network and Wi-Fi Setup",
    intro: "Reliable Wi-Fi and clean network setup make every other part of the business easier to run.",
    problem: "Spotty coverage, unmanaged routers, printer issues, mystery cables, and weak passwords cause daily frustration.",
    primaryAction: "Fix Wi-Fi or Network",
    quickWins: ["Router review", "Wi-Fi coverage", "Printer setup", "Network documentation"],
    deliverables: [
      "A practical review of routers, access points, printers, and connected devices.",
      "Setup or cleanup for office Wi-Fi, guest access, passwords, and basic documentation.",
      "A recommendation for upgrades when current hardware is causing the problem."
    ],
    outcomes: ["More reliable connections", "Cleaner printer setup", "Less guessing when something breaks"],
    related: ["/small-business-it-support-asheville", "/business-email-setup", "/data-backup-recovery"],
    faqs: [
      {
        question: "Do you install enterprise network systems?",
        answer: "Robbins Technologies focuses on practical small-office setup, cleanup, and troubleshooting. Larger projects can be scoped with vendor coordination."
      },
      {
        question: "Can you help with printers?",
        answer: "Yes. Printer issues are often network issues, driver issues, or access problems, and they fit naturally into setup visits."
      }
    ]
  },
  {
    path: "/data-backup-recovery",
    navLabel: "Backup",
    shortTitle: "Backup Recovery",
    title: "Data backup and recovery planning for small businesses.",
    metaTitle: "Data Backup & Recovery Asheville NC | Robbins Technologies",
    metaDescription: "Backup setup, recovery planning, file protection, and practical data recovery guidance for Asheville small businesses and home offices.",
    icon: Server,
    asset: iconBackup,
    serviceType: "Data Backup and Recovery",
    intro: "Backups are boring until they are the only thing that matters. Robbins Technologies helps make recovery less of a gamble.",
    problem: "Files often live on one laptop, one desktop, one external drive, or one cloud account nobody has reviewed.",
    primaryAction: "Review Backup Plan",
    quickWins: ["File backup setup", "Cloud storage review", "Device failure triage", "Recovery planning"],
    deliverables: [
      "A review of where important files live and what would happen if a device failed.",
      "Backup setup guidance for computers, business files, website assets, and critical documents.",
      "Recovery next steps for failed devices, missing files, or unclear cloud storage."
    ],
    outcomes: ["Better file protection", "Clearer recovery steps", "Less panic when hardware fails"],
    related: ["/cybersecurity-asheville-nc", "/small-business-it-support-asheville", "/business-email-setup"],
    faqs: [
      {
        question: "Can every failed drive be recovered?",
        answer: "No. Recovery depends on the failure. Robbins Technologies can triage the situation and recommend next steps, including specialist recovery when needed."
      },
      {
        question: "Do backups work for home offices?",
        answer: "Yes. Home offices and freelancers often need backup planning just as much as offices with multiple employees."
      }
    ]
  },
  {
    path: "/automation-ai-tools",
    navLabel: "Automation",
    shortTitle: "Automation",
    title: "Automation and practical AI tools for small business workflows.",
    metaTitle: "Automation & AI Tools Asheville NC | Robbins Technologies",
    metaDescription: "Workflow automation, forms, dashboards, notifications, AI tools, and business process cleanup for Asheville small businesses.",
    icon: Code,
    asset: iconCode,
    serviceType: "Automation and AI Tools",
    intro: "Good automation is not flashy. It removes repetitive steps, catches details, and makes follow-up easier.",
    problem: "Many small businesses lose time copying form submissions, checking emails, updating spreadsheets, and repeating the same admin steps.",
    primaryAction: "Discuss Automation",
    quickWins: ["Lead forms", "Dashboards", "Notifications", "AI helpers"],
    deliverables: [
      "A workflow review to find repetitive tasks worth automating.",
      "Forms, dashboards, notifications, and lightweight tools built around the business process.",
      "Practical AI guidance that supports work instead of adding noise."
    ],
    outcomes: ["Faster follow-up", "Cleaner operations", "Less repeated admin work"],
    related: ["/website-design-hosting-asheville", "/small-business-it-support-asheville", "/business-email-setup"],
    faqs: [
      {
        question: "Can automation connect to a website?",
        answer: "Yes. Website forms can connect to email, dashboards, notifications, and follow-up workflows."
      },
      {
        question: "Do you build custom dashboards?",
        answer: "Yes. Robbins Technologies can build lightweight dashboards for leads, status, website operations, and business workflows."
      }
    ]
  }
];

const serviceAreaPages = [
  {
    path: "/it-support-hendersonville",
    city: "Hendersonville",
    county: "Henderson County",
    nearby: "Flat Rock, Mills River, Fletcher, and surrounding areas",
    title: "IT support in Hendersonville, NC.",
    metaTitle: "IT Support Hendersonville NC | Robbins Technologies",
    metaDescription: "Remote and on-site IT support for Hendersonville small businesses, including computers, email, Wi-Fi, backup, cybersecurity, and websites.",
    intro: "Robbins Technologies supports Hendersonville businesses with remote-first triage and scheduled on-site help when hands-on work is needed."
  },
  {
    path: "/it-support-weaverville",
    city: "Weaverville",
    county: "Buncombe County",
    nearby: "Woodfin, Mars Hill, Asheville, and surrounding areas",
    title: "IT support in Weaverville, NC.",
    metaTitle: "IT Support Weaverville NC | Robbins Technologies",
    metaDescription: "Small business IT support for Weaverville, including remote help, on-site service, Wi-Fi, email, backup, security, and website support.",
    intro: "For Weaverville teams, Robbins Technologies provides clear support for devices, accounts, networks, websites, and recurring IT needs."
  },
  {
    path: "/it-support-boone",
    city: "Boone",
    county: "Watauga County",
    nearby: "Blowing Rock, Banner Elk, Deep Gap, and nearby northwest NC communities",
    title: "IT support in Boone and northwestern North Carolina.",
    metaTitle: "IT Support Boone NC | Remote & Small Business IT Help",
    metaDescription: "Remote IT support and scheduled technology help for Boone and northwestern North Carolina businesses, including email, security, backup, and websites.",
    intro: "Robbins Technologies serves Boone and northwestern North Carolina with practical remote support, setup planning, and business technology help."
  },
  {
    path: "/it-support-black-mountain",
    city: "Black Mountain",
    county: "Buncombe County",
    nearby: "Swannanoa, Montreat, Asheville, and nearby communities",
    title: "IT support in Black Mountain, NC.",
    metaTitle: "IT Support Black Mountain NC | Robbins Technologies",
    metaDescription: "Remote and on-site IT support for Black Mountain businesses, including computers, Wi-Fi, email, backups, security, and website support.",
    intro: "Robbins Technologies helps Black Mountain businesses get clear, responsive support for the technology that keeps daily work moving."
  }
];

const cityPageServices = [
  "Remote and on-site IT support",
  "Computer repair and workstation setup",
  "Business email and account setup",
  "Network and Wi-Fi troubleshooting",
  "Backup and cybersecurity basics",
  "Website, hosting, and automation help"
];

const caseStudy = {
  title: "Colburn Outdoor lead system",
  summary: "A local business website project built as more than a brochure: quote form, estimate calculator, dashboard direction, Cloudflare deployment, and a cleaner path toward business automation.",
  wins: ["Lead capture", "Estimate flow", "Deployment setup", "Dashboard direction"]
};

const servicePageByPath = Object.fromEntries(primaryServicePages.map((page) => [page.path, page]));
const serviceAreaPageByPath = Object.fromEntries(serviceAreaPages.map((page) => [page.path, page]));
const servicePageByTitle = {
  "Managed IT Support": "/small-business-it-support-asheville",
  "Business Email Setup": "/business-email-setup",
  "Network & Wi-Fi Setup": "/network-wifi-setup",
  "Cybersecurity Setup": "/cybersecurity-asheville-nc",
  "Data Backup & Recovery": "/data-backup-recovery",
  "Emergency IT Help": "/contact",
  "Website Design & Hosting": "/website-design-hosting-asheville",
  "Automation & AI Tools": "/automation-ai-tools",
  "Computer Repair / Device Setup": "/contact"
};

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

function normalizePublicPath(path) {
  const normalized = (path || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
  return normalized || "/";
}

function publicHref(path) {
  const normalized = normalizePublicPath(path);
  return normalized === "/" ? "/" : `${normalized}/`;
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(selector.startsWith("link") ? "link" : "meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function buildBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Robbins Technologies",
    url: "https://robbinstechnologies.com/",
    logo: "https://robbinstechnologies.com/robbins-technologies-logo.png",
    image: "https://robbinstechnologies.com/robbins-technologies-it-support-hero.jpg",
    email: "support@robbinstechnologies.com",
    telephone: "+18284366869",
    priceRange: "$$",
    description: homePageMeta.metaDescription,
    areaServed: [
      "Asheville NC",
      "Buncombe County NC",
      "Hendersonville NC",
      "Weaverville NC",
      "Boone NC",
      "Black Mountain NC",
      "Western North Carolina",
      "Northwestern North Carolina"
    ],
    knowsAbout: primaryServicePages.map((page) => page.serviceType),
    makesOffer: primaryServicePages.map((page) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: page.serviceType,
        areaServed: "Asheville and northwestern North Carolina"
      }
    }))
  };
}

function buildPageSchema(page) {
  const businessSchema = buildBusinessSchema();
  const graph = [businessSchema];

  if (page?.serviceType) {
    graph.push({
      "@type": "Service",
      name: page.serviceType,
      provider: {
        "@type": "ProfessionalService",
        name: "Robbins Technologies",
        telephone: "+18284366869",
        url: "https://robbinstechnologies.com/"
      },
      areaServed: ["Asheville NC", "Western North Carolina", "Northwestern North Carolina"],
      description: page.metaDescription,
      url: `https://robbinstechnologies.com${page.path}`
    });
  }

  if (page?.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function usePageMeta(page) {
  useEffect(() => {
    const activePage = page || homePageMeta;
    const url = `https://robbinstechnologies.com${publicHref(activePage.path)}`;
    document.title = activePage.metaTitle;
    upsertMeta('meta[name="description"]', { name: "description", content: activePage.metaDescription });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: activePage.metaTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: activePage.metaDescription });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: activePage.metaTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: activePage.metaDescription });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: url });

    let schema = document.head.querySelector("#rt-page-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "rt-page-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(buildPageSchema(activePage));
  }, [page]);
}

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
  const [servicesMenuAnchor, setServicesMenuAnchor] = useState(null);
  const mobileMenuOpen = Boolean(mobileMenuAnchor);
  const servicesMenuOpen = Boolean(servicesMenuAnchor);

  const goSection = (event, id) => {
    event.preventDefault();
    setServicesMenuAnchor(null);
    scrollToSection(id, onNavigate);
  };

  const closeMobileMenu = () => setMobileMenuAnchor(null);
  const closeServicesMenu = () => setServicesMenuAnchor(null);

  const goMobileSection = (id) => {
    closeMobileMenu();
    scrollToSection(id, onNavigate);
  };

  const goMobileRoute = (path) => {
    closeMobileMenu();
    onNavigate(path);
  };

  const goRoute = (path) => {
    closeServicesMenu();
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
        <Button
          className="rt-nav-link"
          type="button"
          aria-controls={servicesMenuOpen ? "rt-services-menu" : undefined}
          aria-expanded={servicesMenuOpen ? "true" : undefined}
          aria-haspopup="menu"
          onClick={(event) => setServicesMenuAnchor(event.currentTarget)}
        >
          Services <ChevronDown size={15} />
        </Button>
        <Button className="rt-nav-link" component="a" href="/#managed-it" onClick={(event) => goSection(event, "managed-it")}>Managed IT</Button>
        <Button className="rt-nav-link" component="a" href="/#service-area" onClick={(event) => goSection(event, "service-area")}>Service Area</Button>
        <Button className="rt-nav-link" type="button" onClick={() => onNavigate("/about")}>About</Button>
        <Button className="rt-nav-link rt-business-link" type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</Button>
        <Button className="rt-phone-link" component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
        <Button className="rt-nav-cta" type="button" onClick={() => onNavigate("/contact")}>Schedule Support</Button>
        <Button className="public-login rt-login-link" type="button" onClick={() => onNavigate("/login")}>
          Client Login
        </Button>
      </nav>
      <MuiMenu
        id="rt-services-menu"
        anchorEl={servicesMenuAnchor}
        open={servicesMenuOpen}
        onClose={closeServicesMenu}
        className="rt-services-menu"
        slotProps={{
          paper: {
            className: "rt-services-menu-paper"
          }
        }}
      >
        <MenuItem component="a" href="/#paths" onClick={(event) => goSection(event, "paths")}>All services</MenuItem>
        {primaryServicePages.map((page) => (
          <MenuItem key={page.path} onClick={() => goRoute(page.path)}>{page.navLabel}</MenuItem>
        ))}
        <MenuItem onClick={() => goRoute("/contact")}>Schedule support</MenuItem>
      </MuiMenu>
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
        {primaryServicePages.slice(0, 5).map((page) => (
          <MenuItem key={page.path} onClick={() => goMobileRoute(page.path)}>{page.navLabel}</MenuItem>
        ))}
        <MenuItem onClick={() => goMobileSection("managed-it")}>Managed IT</MenuItem>
        <MenuItem onClick={() => goMobileSection("service-area")}>Service Area</MenuItem>
        <MenuItem onClick={() => goMobileRoute("/about")}>About</MenuItem>
        <MenuItem onClick={() => goMobileRoute("/business-plan")}>Business Plan</MenuItem>
        <MenuItem component="a" href={BUSINESS_PHONE_TEL}>Call {BUSINESS_PHONE_DISPLAY}</MenuItem>
        <MenuItem onClick={() => goMobileRoute("/contact")}>Schedule Support</MenuItem>
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
                <a href={publicHref(servicePageByTitle[service.title] || "/contact")}>Open details <ChevronRight size={15} /></a>
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
            <Button className="rt-path-button" component="a" href={publicHref(path.path)}>
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

function UrgentSupportBand() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % urgentSupportSteps.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="rt-emergency-band rt-emergency-hero-band" id="urgent-help" aria-label="Urgent IT help">
      <div className="rt-emergency-copy">
        <PhoneCall size={24} />
        <div>
          <h2>Need urgent IT help?</h2>
          <p>Email down, network offline, computer issue, or security concern? Call Robbins Technologies for fast triage before the day gets away from you.</p>
        </div>
      </div>
      <div className="rt-urgent-steps" aria-label="Urgent support flow">
        {urgentSupportSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <span className={index === activeStep ? "active" : ""} key={step.label}>
              <Icon size={16} />
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </span>
          );
        })}
      </div>
      <div className="rt-emergency-actions">
        <Button className="rt-emergency-button" component="a" href={BUSINESS_PHONE_TEL}>
          Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
        </Button>
        <Button className="rt-emergency-secondary" component="a" href="/contact/">
          Schedule if not urgent <CalendarDays size={17} />
        </Button>
      </div>
    </section>
  );
}

function ServiceAreaMap() {
  const [activeTown, setActiveTown] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTown((current) => (current + 1) % westernNcCountyMap.towns.length);
    }, 2200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="rt-map-panel rt-county-map-panel" aria-label="Western North Carolina county service coverage">
      <div className="rt-map-header">
        <span>Western North Carolina coverage</span>
        <strong>County service area</strong>
      </div>
      <svg className="rt-county-map" viewBox={westernNcCountyMap.viewBox} role="img" aria-label="County outlines for western North Carolina service area">
        <g className="rt-county-layer">
          {westernNcCountyMap.features.map((county) => (
            <path
              key={county.id}
              className={`rt-map-county ${county.highlight ? "highlight" : ""}`}
              d={county.d}
            >
              <title>{county.name} County</title>
            </path>
          ))}
        </g>
        <g className="rt-town-layer">
          {westernNcCountyMap.towns.map((town, index) => (
            <g
              className={`rt-map-town ${town.type === "hub" ? "hub" : ""} ${index === activeTown ? "is-active" : ""}`}
              key={town.name}
              transform={`translate(${town.x} ${town.y})`}
            >
              <circle className="rt-map-town-pulse" r="16" />
              <circle className="rt-map-town-dot" r={town.type === "hub" ? "7" : "5"} />
              <text x="10" y={town.type === "hub" ? "-8" : "-7"}>{town.name}</text>
            </g>
          ))}
        </g>
      </svg>
      <div className="rt-map-legend">
        <span><i className="served" /> Primary support corridor</span>
        <span><i /> Extended WNC coverage</span>
      </div>
    </div>
  );
}

function ContactActionPanel({ onNavigate, title = "One clear way to start.", body = "Use the scheduler for planned work. If something is down right now, call and start with triage." }) {
  return (
    <aside className="rt-contact-action-panel">
      <div>
        <Sparkles size={22} />
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="rt-contact-action-grid">
        <Button className="public-primary rt-primary" component="a" href="/contact/">
          Schedule online <CalendarDays size={17} />
        </Button>
        <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL}>
          Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
        </Button>
        <Button className="public-secondary rt-secondary" type="button" onClick={() => onNavigate("/login")}>
          Client dashboard <Lock size={17} />
        </Button>
      </div>
    </aside>
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
        {primaryServicePages.slice(0, 5).map((page) => (
          <a key={page.path} href={publicHref(page.path)}>{page.navLabel}</a>
        ))}
        {serviceAreaPages.slice(0, 4).map((page) => (
          <a key={page.path} href={publicHref(page.path)}>{page.city}</a>
        ))}
        <a href="/#plans">Plans</a>
        <a href="/contact/">Contact</a>
        <a href="/about/">About</a>
        <button type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</button>
        <button type="button" onClick={() => onNavigate("/login")}>Client Login</button>
      </div>
    </footer>
  );
}

function PublicPageShell({ onNavigate, compact = false, className = "", children }) {
  return (
    <ThemeProvider theme={publicTheme}>
      <div className={`public-site rt-public-site ${className}`}>
        <PublicNav onNavigate={onNavigate} compact={compact} />
        {children}
        <PublicFooter onNavigate={onNavigate} />
      </div>
    </ThemeProvider>
  );
}

function PainSection() {
  const pains = [
    "Email, Wi-Fi, or a workstation outage stops the day cold.",
    "New hires need accounts, devices, printers, and access set up correctly.",
    "A website or form should create leads, not just sit online.",
    "Backups and security need a plan before something fails."
  ];

  return (
    <section className="public-band rt-section rt-pain-section">
      <SectionHeading
        kicker="The Problem"
        title="Tech problems should not become your unpaid second job."
      >
        Robbins Technologies is built for local businesses that need fast triage, useful fixes, and a support path that does not disappear after the first call.
      </SectionHeading>
      <div className="rt-pain-grid">
        {pains.map((pain, index) => (
          <article key={pain}>
            <span>{index + 1}</span>
            <p>{pain}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceLinksSection() {
  return (
    <motion.section
      className="public-band rt-section rt-seo-links-section"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.42 }}
    >
      <SectionHeading
        kicker="Service Pages"
        title="Dedicated help for the exact problem you searched for."
      >
        Each service page is written around a real local need, so clients can move from search to the right next step faster.
      </SectionHeading>
      <div className="rt-seo-link-grid">
        {primaryServicePages.map((page, index) => {
          const Icon = page.icon;
          return (
            <motion.a
              key={page.path}
              className="rt-seo-link-card"
              href={publicHref(page.path)}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.03, duration: 0.35 }}
            >
              <span><Icon size={20} /></span>
              <strong>{page.shortTitle}</strong>
              <p>{page.metaDescription}</p>
              <small>Open page <ArrowRight size={14} /></small>
            </motion.a>
          );
        })}
      </div>
    </motion.section>
  );
}

function CaseStudySection() {
  return (
    <section className="rt-case-study-band">
      <div className="public-band rt-section rt-case-study">
        <div className="rt-case-copy">
          <BadgeCheck size={24} />
          <h2>{caseStudy.title}</h2>
          <p>{caseStudy.summary}</p>
          <Button className="public-secondary rt-secondary" component="a" href="/website-design-hosting-asheville/" variant="outlined">
            Build a lead system <ArrowRight size={17} />
          </Button>
        </div>
        <div className="rt-case-board" aria-label="Case study project wins">
          {caseStudy.wins.map((win) => (
            <span key={win}><Check size={16} />{win}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyRobbinsSection() {
  const points = [
    {
      title: "Local response without corporate runaround",
      detail: "A clear support lane for Asheville and WNC clients who need a real person to take ownership.",
      icon: MapPin
    },
    {
      title: "Business-first fixes",
      detail: "Support is scoped around the work being blocked: calls, forms, email, networks, devices, websites, and follow-up.",
      icon: Target
    },
    {
      title: "Security and documentation included",
      detail: "The goal is not only to fix the issue, but to leave the setup easier to support next time.",
      icon: ClipboardList
    }
  ];

  return (
    <section className="public-band rt-section rt-why-section">
      <SectionHeading
        kicker="Why Robbins Technologies"
        title="Professional IT help with a local operator mindset."
      >
        The site, the support process, and the dashboard are all designed around one thing: helping small businesses get control of their technology.
      </SectionHeading>
      <div className="rt-why-grid">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <article key={point.title}>
              <Icon size={22} />
              <h3>{point.title}</h3>
              <p>{point.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RelatedLinks({ paths = [] }) {
  const pages = paths.map((path) => servicePageByPath[path] || serviceAreaPageByPath[path]).filter(Boolean);
  if (!pages.length) return null;

  return (
    <div className="rt-related-grid">
      {pages.map((page) => {
        const Icon = page.icon || MapPin;
        return (
          <a key={page.path} href={publicHref(page.path)}>
            <Icon size={18} />
            <strong>{page.shortTitle || page.city}</strong>
            <span>{page.metaDescription}</span>
          </a>
        );
      })}
    </div>
  );
}

function PageFaqs({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="rt-page-faqs">
      {items.map((item) => (
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

function ServiceStartStrip({ page, city }) {
  const isCityPage = Boolean(city);
  const items = [
    {
      icon: PhoneCall,
      title: "Need help now?",
      body: `Call ${BUSINESS_PHONE_DISPLAY} for outage, account, device, network, or security triage.`,
      href: BUSINESS_PHONE_TEL,
      action: "Call now"
    },
    {
      icon: Laptop,
      title: "Start remote",
      body: isCityPage
        ? `Most ${city} support can begin online before an on-site visit is scheduled.`
        : `${page.shortTitle} help often starts with a remote review, then moves on-site when needed.`,
      href: "/contact/",
      action: "Schedule"
    },
    {
      icon: MapPin,
      title: isCityPage ? `${city} coverage` : "Local WNC service",
      body: isCityPage
        ? "Remote-first support with on-site service when the fix needs hands-on access."
        : "Serving Asheville, Buncombe County, Hendersonville, Boone, and northwestern North Carolina.",
      href: "/service-area/",
      action: "Service area"
    }
  ];

  return (
    <motion.section
      className="rt-service-start-strip"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      aria-label="Service start options"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a key={item.title} href={item.href}>
            <span><Icon size={19} /></span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <em>{item.action}<ArrowRight size={15} /></em>
          </a>
        );
      })}
    </motion.section>
  );
}

function ServiceDetailPage({ page, onNavigate }) {
  usePageMeta(page);
  const Icon = page.icon;

  return (
    <PublicPageShell onNavigate={onNavigate} compact className="rt-service-detail-site">
      <main className="rt-detail-page">
        <motion.section
          className="rt-page-hero rt-service-page-hero"
          style={{ "--service-hero-bg": `url(${heroCircuitImage})` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: "easeOut" }}
        >
          <div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="rt-page-actions">
              <Button className="public-primary rt-primary" component="a" href="#contact" variant="contained">
                {page.primaryAction} <ArrowRight size={17} />
              </Button>
              <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
                Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
              </Button>
            </div>
          </div>
          <aside className="rt-page-hero-card">
            <ServiceCardIcon service={page} />
            <strong>{page.serviceType}</strong>
            <p>{page.problem}</p>
            <div className="rt-service-hero-proof">
              {page.outcomes.map((item) => <span key={item}><Check size={14} />{item}</span>)}
            </div>
          </aside>
        </motion.section>

        <ServiceStartStrip page={page} />

        <motion.section
          className="rt-detail-grid"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <article className="rt-detail-panel">
            <Icon size={22} />
            <h2>What gets handled</h2>
            <div className="rt-chip-list">
              {page.quickWins.map((item) => <span key={item}><Check size={15} />{item}</span>)}
            </div>
          </article>
          <article className="rt-detail-panel">
            <ClipboardList size={22} />
            <h2>What you get</h2>
            <ul>
              {page.deliverables.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article className="rt-detail-panel">
            <Target size={22} />
            <h2>Result</h2>
            <ul>
              {page.outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </motion.section>

        <section className="rt-local-proof">
          <div>
            <h2>Built for Asheville and northwestern North Carolina.</h2>
            <p>Remote support starts quickly, and on-site service is scheduled when the fix needs hands-on access.</p>
          </div>
          <div className="rt-chip-list">
            {serviceAreas.slice(0, 9).map((area) => <span key={area}><MapPin size={14} />{area}</span>)}
          </div>
        </section>

        <section className="rt-detail-grid two">
          <article className="rt-detail-panel">
            <h2>Related services</h2>
            <RelatedLinks paths={page.related} />
          </article>
          <article className="rt-detail-panel">
            <h2>Common questions</h2>
            <PageFaqs items={page.faqs} />
          </article>
        </section>

        <section className="rt-contact-section rt-detail-contact" id="contact">
          <div>
            <SectionHeading
              kicker="Start Here"
              title={`Request ${page.shortTitle.toLowerCase()} help.`}
            >
              Use the scheduling page for planned work, or call now if the issue is urgent.
            </SectionHeading>
            <div className="rt-contact-methods">
              <Button component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
              <Button component="a" href="/contact/"><CalendarDays size={16} /> Schedule online</Button>
            </div>
          </div>
          <ContactActionPanel
            onNavigate={onNavigate}
            title={`Start ${page.shortTitle.toLowerCase()} support.`}
            body="Use one clean scheduling path for planned work. Active outages should start with a call so the impact can be triaged immediately."
          />
        </section>
      </main>
    </PublicPageShell>
  );
}

function ServiceAreaDetailPage({ page, onNavigate }) {
  usePageMeta(page);

  return (
    <PublicPageShell onNavigate={onNavigate} compact className="rt-area-detail-site">
      <main className="rt-detail-page">
        <motion.section
          className="rt-page-hero rt-area-page-hero"
          style={{ "--service-hero-bg": `url(${heroCircuitImage})` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: "easeOut" }}
        >
          <div>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="rt-page-actions">
              <Button className="public-primary rt-primary" component="a" href="#contact" variant="contained">
                Schedule local IT help <ArrowRight size={17} />
              </Button>
              <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
                Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
              </Button>
            </div>
          </div>
          <ServiceAreaMap />
        </motion.section>

        <ServiceStartStrip city={page.city} />

        <section className="rt-detail-grid two">
          <article className="rt-detail-panel">
            <MapPin size={22} />
            <h2>{page.city} coverage</h2>
            <p>Serving {page.city}, {page.county}, and nearby communities including {page.nearby}.</p>
          </article>
          <article className="rt-detail-panel">
            <Wrench size={22} />
            <h2>Common support needs</h2>
            <div className="rt-chip-list">
              {cityPageServices.map((item) => <span key={item}><Check size={15} />{item}</span>)}
            </div>
          </article>
        </section>

        <section className="rt-detail-grid two">
          <article className="rt-detail-panel">
            <h2>Core service pages</h2>
            <RelatedLinks paths={primaryServicePages.slice(0, 4).map((item) => item.path)} />
          </article>
          <article className="rt-detail-panel">
            <h2>How local help starts</h2>
            <ul>
              <li>Call or send a request with the business impact and urgency.</li>
              <li>Start remote if the issue can be handled safely online.</li>
              <li>Schedule on-site support when the network, device, or office setup needs hands-on work.</li>
            </ul>
          </article>
        </section>

        <section className="rt-contact-section rt-detail-contact" id="contact">
          <div>
            <SectionHeading
              kicker="Local Request"
              title={`Request IT support in ${page.city}.`}
            >
              Use the scheduling page for planned work, or call now if something is down.
            </SectionHeading>
            <div className="rt-contact-methods">
              <Button component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
              <Button component="a" href="/contact/"><CalendarDays size={16} /> Schedule online</Button>
            </div>
          </div>
          <ContactActionPanel
            onNavigate={onNavigate}
            title={`Start ${page.city} IT support.`}
            body="Remote support starts quickly, and an on-site visit can be scheduled when the work needs local hands-on service."
          />
        </section>
      </main>
    </PublicPageShell>
  );
}

function ContactPage({ onNavigate }) {
  const page = {
    path: "/contact",
    metaTitle: "Contact Robbins Technologies | Schedule Asheville IT Support",
    metaDescription: "Schedule IT support, request urgent help, or contact Robbins Technologies for remote and on-site technology service in Asheville and WNC."
  };
  usePageMeta(page);

  return (
    <PublicPageShell onNavigate={onNavigate} compact className="rt-contact-page-site">
      <main className="rt-detail-page">
        <section className="rt-page-hero">
          <div>
            <h1>Schedule IT support or request urgent help.</h1>
            <p>Call for urgent outages, or send a scheduling request for remote support, on-site visits, website help, cybersecurity, backup, or monthly care.</p>
            <div className="rt-page-actions">
              <Button className="public-primary rt-primary" component="a" href={BUSINESS_PHONE_TEL} variant="contained">
                Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
              </Button>
              <Button className="public-secondary rt-secondary" component="a" href="mailto:support@robbinstechnologies.com" variant="outlined">
                Email support <Mail size={17} />
              </Button>
            </div>
          </div>
          <aside className="rt-page-hero-card">
            <CalendarDays size={28} />
            <strong>Fast triage, clear next steps</strong>
            <p>For outages, calling is fastest. For planned work, the schedule form keeps the request organized.</p>
          </aside>
        </section>
        <section className="rt-schedule-section" style={{ "--schedule-bg": `url(${circuitFieldImage})` }}>
          <SchedulingPanel />
        </section>
        <section className="rt-contact-section rt-detail-contact" id="contact">
          <div>
            <SectionHeading kicker="Support Intake" title="Schedule once, then we take it from there.">
              The scheduler above is the primary intake. Call for outages, or use email if you need to send screenshots or notes.
            </SectionHeading>
            <div className="rt-contact-methods">
              <Button component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
              <Button component="a" href="mailto:support@robbinstechnologies.com"><Mail size={16} /> support@robbinstechnologies.com</Button>
            </div>
          </div>
          <ContactActionPanel
            onNavigate={onNavigate}
            title="Use one clean intake path."
            body="Planned work starts through the scheduler. Active outages should start with a call so the impact can be triaged immediately."
          />
        </section>
      </main>
    </PublicPageShell>
  );
}

function AboutPage({ onNavigate }) {
  const page = {
    path: "/about",
    metaTitle: "About Robbins Technologies | Asheville IT Company",
    metaDescription: "Robbins Technologies is an Asheville-focused IT company providing remote support, on-site service, websites, security, automation, and monthly care."
  };
  usePageMeta(page);

  return (
    <PublicPageShell onNavigate={onNavigate} compact className="rt-about-page-site">
      <main className="rt-detail-page">
        <section className="rt-page-hero">
          <div>
            <h1>Local IT support built around clarity and follow-through.</h1>
            <p>Robbins Technologies helps homes, freelancers, and small businesses in Asheville and northwestern North Carolina fix technology problems, set up better systems, and keep work moving.</p>
            <div className="rt-page-actions">
              <Button className="public-primary rt-primary" component="a" href="/contact/" variant="contained">
                Work with Robbins Technologies <ArrowRight size={17} />
              </Button>
              <Button className="public-secondary rt-secondary" component="a" href={BUSINESS_PHONE_TEL} variant="outlined">
                Call {BUSINESS_PHONE_DISPLAY} <PhoneCall size={17} />
              </Button>
            </div>
          </div>
          <aside className="rt-page-hero-card">
            <BrandMark />
            <strong>Robbins Technologies</strong>
            <p>IT support, websites, cybersecurity, hosting, automation, and monthly care for practical local business needs.</p>
          </aside>
        </section>

        <section className="rt-detail-grid three">
          <article className="rt-detail-panel">
            <Home size={22} />
            <h2>Personal help</h2>
            <p>Computer cleanup, account setup, printer issues, Wi-Fi help, and everyday technology support.</p>
          </article>
          <article className="rt-detail-panel">
            <Building2 size={22} />
            <h2>Business setup</h2>
            <p>Devices, email, networks, websites, forms, backups, documentation, and better follow-up systems.</p>
          </article>
          <article className="rt-detail-panel">
            <ShieldCheck size={22} />
            <h2>Monthly care</h2>
            <p>A recurring support lane for clients who want priority response and ongoing technology health checks.</p>
          </article>
        </section>

        <CaseStudySection />
        <WhyRobbinsSection />
      </main>
    </PublicPageShell>
  );
}

function HomePage({ onNavigate }) {
  usePageMeta(homePageMeta);

  return (
    <PublicPageShell onNavigate={onNavigate}>
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

          <UrgentSupportBand />
          <TrustStrip />
          <PainSection />

          <section className="public-band rt-section rt-path-section" id="paths">
            <SectionHeading
              kicker="Services"
              title="Pick the support path that matches the problem."
            >
              Robbins Technologies is organized around the way local clients actually ask for help: quick fixes, setup projects, and ongoing care.
            </SectionHeading>
            <ServicePathCards />
          </section>

          <section className="public-band rt-section rt-services-section" id="services">
            <SectionHeading
              kicker="What We Fix"
              title="Clear categories, practical fixes, and no mystery tech talk."
            >
              Use the tabs to see common work across business support, security, data, websites, and automation.
            </SectionHeading>
            <ServicesTabs />
          </section>
          <ServiceLinksSection />

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

          <CaseStudySection />
          <WhyRobbinsSection />

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
                title="Ready when you are."
              >
                Use the scheduler above for planned work, or call when the issue is actively blocking the day. No second form, no duplicate intake.
              </SectionHeading>
              <div className="rt-contact-methods">
                <Button component="a" href={BUSINESS_PHONE_TEL}><PhoneCall size={16} /> {BUSINESS_PHONE_DISPLAY}</Button>
                <Button component="a" href="mailto:support@robbinstechnologies.com"><Mail size={16} /> support@robbinstechnologies.com</Button>
                <Button type="button" onClick={() => onNavigate("/login")}><Lock size={16} /> Client dashboard</Button>
              </div>
              <FaqSection />
            </div>
            <ContactActionPanel onNavigate={onNavigate} />
          </section>
        </main>
    </PublicPageShell>
  );
}

export function PublicLanding({ onNavigate, path = "/" }) {
  const normalizedPath = normalizePublicPath(path);
  const servicePage = servicePageByPath[normalizedPath];
  const areaPage = serviceAreaPageByPath[normalizedPath];

  if (servicePage) return <ServiceDetailPage page={servicePage} onNavigate={onNavigate} />;
  if (areaPage) return <ServiceAreaDetailPage page={areaPage} onNavigate={onNavigate} />;
  if (normalizedPath === "/contact") return <ContactPage onNavigate={onNavigate} />;
  if (normalizedPath === "/about") return <AboutPage onNavigate={onNavigate} />;

  return <HomePage onNavigate={onNavigate} />;
}

export function BusinessPlanPage({ onNavigate }) {
  const [activeBusinessTab, setActiveBusinessTab] = useState(0);
  usePageMeta({
    path: "/business-plan",
    metaTitle: "Robbins Technologies Business Plan | Asheville IT Services",
    metaDescription: "Business plan for Robbins Technologies, including IT repair, remote support, on-site service, monthly care, websites, and automation in Asheville and WNC."
  });

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
