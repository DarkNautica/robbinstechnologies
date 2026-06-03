import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
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
import heroImage from "../assets/blue-ridge-it-workbench.png";

const serviceAreas = [
  "Asheville",
  "Buncombe",
  "Henderson",
  "Haywood",
  "Madison",
  "McDowell",
  "Yancey",
  "Avery",
  "Watauga",
  "Burke",
  "Caldwell"
];

const services = [
  {
    title: "Remote Support",
    icon: Laptop,
    detail: "Fast help for slow computers, email issues, printer trouble, software installs, cleanup, backups, and account access."
  },
  {
    title: "On-Site Repair",
    icon: Wrench,
    detail: "In-person diagnostics, upgrades, device setup, Wi-Fi fixes, workstation repair, and practical troubleshooting."
  },
  {
    title: "Business Setup",
    icon: Building2,
    detail: "New computers, Microsoft 365 or Google Workspace, secure email, file sharing, routers, printers, backups, and onboarding."
  },
  {
    title: "Monthly IT Care",
    icon: ShieldCheck,
    detail: "A predictable support plan for small teams: patching, monitoring, security basics, vendor coordination, and priority response."
  },
  {
    title: "Call-In Support",
    icon: PhoneCall,
    detail: "Need someone today? Call-in requests are triaged for urgent business outages, network failures, and time-sensitive repairs."
  }
];

const plans = [
  {
    name: "Home & Remote",
    price: "$95/hr",
    bestFor: "Home users, freelancers, and single-device fixes",
    includes: ["Remote repair sessions", "Computer cleanup", "Email and printer help", "Basic backup setup"]
  },
  {
    name: "Local Visit",
    price: "$125/hr",
    bestFor: "On-site repair and small office troubleshooting",
    includes: ["One-hour minimum", "Wi-Fi and router fixes", "Hardware installs", "Travel included near Asheville"]
  },
  {
    name: "Small Business Care",
    price: "$599/mo",
    bestFor: "Teams that want priority help without hiring IT",
    includes: ["Priority remote support", "Monthly health checks", "User and device inventory", "Security and backup review"]
  },
  {
    name: "Managed Office",
    price: "$1,250/mo",
    bestFor: "Offices that need ongoing IT operations",
    includes: ["Monitoring and patch cadence", "Vendor coordination", "Quarterly roadmap", "Response-time targets"]
  }
];

const businessPlanSections = [
  {
    title: "Executive Summary",
    icon: ClipboardList,
    body: "Robbins Technologies will provide practical IT repair, remote support, in-person service, business setup, and monthly IT support for Asheville and northwestern North Carolina. The business should start lean, sell trust and speed first, then grow recurring support contracts with small teams."
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
  "Publish landing page, Google Business Profile, service area pages, and intake email.",
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

function PublicNav({ onNavigate, compact = false }) {
  return (
    <header className={`public-nav ${compact ? "compact" : ""}`}>
      <button className="public-brand" type="button" onClick={() => onNavigate("/")}>
        <span className="brand-mark" aria-hidden="true" />
        <span>
          <strong>Robbins Technologies</strong>
          <small>Asheville IT Support</small>
        </span>
      </button>
      <nav aria-label="Public navigation">
        <a href="/#services">Services</a>
        <a href="/#plans">Plans</a>
        <a href="/#coverage">Coverage</a>
        <button type="button" onClick={() => onNavigate("/business-plan")}>Business Plan</button>
        <button className="public-login" type="button" onClick={() => onNavigate("/login")}>Client Login</button>
      </nav>
    </header>
  );
}

function SupportRequestForm() {
  const [request, setRequest] = useState({ name: "", service: "Remote Support", detail: "" });
  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`${request.service} request`);
    const body = encodeURIComponent(`Name: ${request.name}\nService: ${request.service}\n\nWhat is going on?\n${request.detail}`);
    return `mailto:support@robbinstechnologies.com?subject=${subject}&body=${body}`;
  }, [request]);

  return (
    <form className="support-form" onSubmit={(event) => {
      event.preventDefault();
      window.location.href = mailto;
    }}>
      <label>
        Name
        <input value={request.name} onChange={(event) => setRequest((current) => ({ ...current, name: event.target.value }))} placeholder="Your name or business" />
      </label>
      <label>
        Service
        <select value={request.service} onChange={(event) => setRequest((current) => ({ ...current, service: event.target.value }))}>
          {services.map((service) => <option key={service.title}>{service.title}</option>)}
        </select>
      </label>
      <label className="full">
        What needs fixed or set up?
        <textarea value={request.detail} onChange={(event) => setRequest((current) => ({ ...current, detail: event.target.value }))} placeholder="Computer, network, email, printer, business setup, monthly support..." />
      </label>
      <button className="public-primary" type="submit"><Mail size={17} /> Prepare request</button>
    </form>
  );
}

export function PublicLanding({ onNavigate }) {
  return (
    <div className="public-site">
      <PublicNav onNavigate={onNavigate} />

      <main>
        <section className="public-hero" style={{ "--hero-image": `url(${heroImage})` }}>
          <div className="public-hero-content">
            <div className="hero-availability"><span className="system-pulse" /> Remote and on-site support across WNC</div>
            <h1>Local IT Support in Asheville & Northwestern North Carolina</h1>
            <p>Repairs, remote help, in-person troubleshooting, business setups, monthly IT support, and urgent call-ins for homes and small businesses that need technology to simply work.</p>
            <div className="hero-actions">
              <a className="public-primary" href="#contact">Book Support <ArrowRight size={17} /></a>
              <a className="public-secondary" href="#plans">View Plans</a>
            </div>
          </div>
          <div className="hero-status-board" aria-label="Service summary">
            <span><BadgeCheck size={16} /> Same-day triage</span>
            <span><Router size={16} /> Networks and Wi-Fi</span>
            <span><Lock size={16} /> Security basics</span>
            <span><Cloud size={16} /> Email and cloud setup</span>
          </div>
        </section>

        <section className="public-band service-strip" id="services">
          <div className="section-heading">
            <span>Services</span>
            <h2>One local team for repairs, setup, and ongoing support.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <Icon size={22} />
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                  <a href="#contact">Request this <ChevronRight size={15} /></a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="public-band split-band">
          <div>
            <div className="section-heading">
              <span>Business setups</span>
              <h2>New office, new hire, new network, or cleanup project.</h2>
            </div>
            <p>Setup projects are packaged so small teams get the right foundation: workstations, secure email, shared files, password practices, backups, Wi-Fi, printers, and a simple support path after launch.</p>
            <div className="setup-list">
              {["Microsoft 365 or Google Workspace", "Router, Wi-Fi, and printer setup", "Device onboarding and migrations", "Backup and security review"].map((item) => <span key={item}><Check size={15} />{item}</span>)}
            </div>
          </div>
          <div className="ops-console">
            <div><Monitor size={18} /><strong>Setup checklist</strong><small>Launch-ready IT</small></div>
            <span><Server size={15} /> Network online</span>
            <span><ShieldCheck size={15} /> Accounts secured</span>
            <span><Settings size={15} /> Devices configured</span>
            <span><Wifi size={15} /> Wi-Fi mapped</span>
          </div>
        </section>

        <section className="public-band" id="plans">
          <div className="section-heading">
            <span>Plans</span>
            <h2>Clear launch pricing that can grow into monthly support.</h2>
          </div>
          <div className="plan-grid">
            {plans.map((plan) => (
              <article className="plan-card" key={plan.name}>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.bestFor}</p>
                {plan.includes.map((item) => <span key={item}><Check size={15} />{item}</span>)}
                <a href="#contact">Start here</a>
              </article>
            ))}
          </div>
        </section>

        <section className="public-band coverage-band" id="coverage">
          <div className="section-heading">
            <span>Service area</span>
            <h2>Based in Asheville, built for northwestern North Carolina.</h2>
          </div>
          <div className="coverage-grid">
            {serviceAreas.map((area) => <span key={area}><MapPin size={14} />{area}</span>)}
          </div>
        </section>

        <section className="public-band plan-preview">
          <div className="section-heading">
            <span>Business plan</span>
            <h2>A practical launch plan for a local IT support company.</h2>
          </div>
          <div className="preview-grid">
            {businessPlanSections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.title}>
                  <Icon size={20} />
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </article>
              );
            })}
          </div>
          <button className="public-primary" type="button" onClick={() => onNavigate("/business-plan")}>Open full business plan <FileText size={17} /></button>
        </section>

        <section className="public-band contact-band" id="contact">
          <div>
            <div className="section-heading">
              <span>Request support</span>
              <h2>Tell me what is broken, slow, missing, or ready to set up.</h2>
            </div>
            <p>Use the request form to prepare an email with the details. Add a phone number in the message if you want a call back.</p>
            <div className="contact-methods">
              <a href="mailto:support@robbinstechnologies.com"><Mail size={16} /> support@robbinstechnologies.com</a>
              <a href="/login"><Lock size={16} /> Client dashboard</a>
            </div>
          </div>
          <SupportRequestForm />
        </section>
      </main>
    </div>
  );
}

export function BusinessPlanPage({ onNavigate }) {
  return (
    <div className="public-site business-plan-site">
      <PublicNav onNavigate={onNavigate} compact />
      <main className="business-plan-page">
        <section className="plan-hero">
          <div>
            <span className="hero-availability"><Sparkles size={15} /> Launch blueprint</span>
            <h1>Robbins Technologies Business Plan</h1>
            <p>Serving Asheville and northwestern North Carolina with IT repairs, remote support, in-person service, business setups, monthly support, and urgent call-ins.</p>
          </div>
          <div className="plan-scorecard">
            <span><Home size={16} /> Homes and freelancers</span>
            <span><Building2 size={16} /> Small businesses</span>
            <span><Clock3 size={16} /> Recurring support</span>
            <span><MapPin size={16} /> WNC coverage</span>
          </div>
        </section>

        <section className="plan-section-grid">
          {businessPlanSections.map((section) => {
            const Icon = section.icon;
            return (
              <article className="plan-detail-card" key={section.title}>
                <Icon size={22} />
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            );
          })}
        </section>

        <section className="plan-deep-grid">
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
            <h2>Market Strategy</h2>
            <ul>
              <li>Lead with Asheville and Buncombe County, then expand through referrals across WNC.</li>
              <li>Target industries with constant technology needs: hospitality, retail, trades, healthcare offices, nonprofits, real estate, and professional services.</li>
              <li>Package setup work into fixed-scope offers so new clients know what they are buying.</li>
              <li>Use every repair job as a path into backup, security, and monthly support conversations.</li>
            </ul>
          </article>
          <article>
            <h2>Operations</h2>
            <ul>
              <li>Use remote support first when safe and practical, then schedule on-site visits when hardware or network access is needed.</li>
              <li>Keep a standard intake: device, issue, urgency, business impact, location, access, and callback preference.</li>
              <li>Create checklists for cleanups, new PC setup, email setup, router replacement, and monthly health checks.</li>
              <li>Track response time, resolution time, revenue per visit, repeat clients, and plan conversions.</li>
            </ul>
          </article>
          <article>
            <h2>Marketing & Sales</h2>
            <ul>
              <li>Launch Google Business Profile, local SEO pages, review requests, and a simple referral offer.</li>
              <li>Build relationships with coworking spaces, property managers, office managers, accountants, insurance agents, and local business groups.</li>
              <li>Use before-and-after stories: slow network fixed, email migration completed, office setup launched, backup restored.</li>
              <li>Send every completed job a maintenance recommendation and monthly support option.</li>
            </ul>
          </article>
        </section>

        <section className="public-band">
          <div className="section-heading">
            <span>90-day roadmap</span>
            <h2>Launch, sell, stabilize, then turn repeat work into monthly support.</h2>
          </div>
          <ol className="roadmap-list">
            {roadmap.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        <section className="public-band">
          <div className="section-heading">
            <span>Financial model</span>
            <h2>Simple targets for the first phase.</h2>
          </div>
          <div className="financial-grid">
            <article><strong>$95-$125/hr</strong><span>Core hourly support range</span></article>
            <article><strong>$450+</strong><span>Starter setup projects</span></article>
            <article><strong>$599/mo</strong><span>Small business care anchor plan</span></article>
            <article><strong>10</strong><span>Initial monthly clients target</span></article>
          </div>
        </section>

        <section className="source-strip">
          <h2>Local Planning Sources</h2>
          {sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>)}
        </section>
      </main>
    </div>
  );
}
