import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://robbinstechnologies.com";
const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

const routes = [
  {
    path: "/small-business-it-support-asheville",
    title: "Small Business IT Support Asheville NC | Robbins Technologies",
    description: "Remote and on-site IT support for Asheville small businesses, including computers, users, Wi-Fi, email, backups, vendors, and monthly care.",
    serviceName: "Small Business IT Support"
  },
  {
    path: "/cybersecurity-asheville-nc",
    title: "Cybersecurity Asheville NC | Small Business Security Setup",
    description: "Security setup for Asheville businesses, including account protection, MFA, password cleanup, backups, device hardening, and security reviews.",
    serviceName: "Cybersecurity Setup"
  },
  {
    path: "/website-design-hosting-asheville",
    title: "Website Design Asheville NC | Hosting, SEO & Business Automation",
    description: "Business websites, hosting, forms, Cloudflare setup, local SEO, and automation for Asheville and western North Carolina companies.",
    serviceName: "Website Design and Hosting"
  },
  {
    path: "/business-email-setup",
    title: "Business Email Setup | Google Workspace & Microsoft 365 Asheville",
    description: "Business email setup, Google Workspace, Microsoft 365, DNS records, user access, security, and shared mailbox support for Asheville businesses.",
    serviceName: "Business Email Setup"
  },
  {
    path: "/network-wifi-setup",
    title: "Network & Wi-Fi Setup Asheville NC | Robbins Technologies",
    description: "Router, Wi-Fi, printer, workstation, and small office network setup for Asheville and western North Carolina businesses.",
    serviceName: "Network and Wi-Fi Setup"
  },
  {
    path: "/data-backup-recovery",
    title: "Data Backup & Recovery Asheville NC | Robbins Technologies",
    description: "Backup setup, recovery planning, file protection, and practical data recovery guidance for Asheville small businesses and home offices.",
    serviceName: "Data Backup and Recovery"
  },
  {
    path: "/automation-ai-tools",
    title: "Automation & AI Tools Asheville NC | Robbins Technologies",
    description: "Workflow automation, forms, dashboards, notifications, AI tools, and business process cleanup for Asheville small businesses.",
    serviceName: "Automation and AI Tools"
  },
  {
    path: "/contact",
    title: "Contact Robbins Technologies | Schedule Asheville IT Support",
    description: "Schedule IT support, request urgent help, or contact Robbins Technologies for remote and on-site technology service in Asheville and WNC.",
    pageType: "ContactPage"
  },
  {
    path: "/about",
    title: "About Robbins Technologies | Asheville IT Company",
    description: "Robbins Technologies is an Asheville-focused IT company providing remote support, on-site service, websites, security, automation, and monthly care.",
    pageType: "AboutPage"
  },
  {
    path: "/it-support-hendersonville",
    title: "IT Support Hendersonville NC | Robbins Technologies",
    description: "Remote and on-site IT support for Hendersonville small businesses, including computers, email, Wi-Fi, backup, cybersecurity, and websites.",
    serviceName: "IT Support in Hendersonville NC"
  },
  {
    path: "/it-support-weaverville",
    title: "IT Support Weaverville NC | Robbins Technologies",
    description: "Small business IT support for Weaverville, including remote help, on-site service, Wi-Fi, email, backup, security, and website support.",
    serviceName: "IT Support in Weaverville NC"
  },
  {
    path: "/it-support-boone",
    title: "IT Support Boone NC | Remote & Small Business IT Help",
    description: "Remote IT support and scheduled technology help for Boone and northwestern North Carolina businesses, including email, security, backup, and websites.",
    serviceName: "IT Support in Boone NC"
  },
  {
    path: "/it-support-black-mountain",
    title: "IT Support Black Mountain NC | Robbins Technologies",
    description: "Remote and on-site IT support for Black Mountain businesses, including computers, Wi-Fi, email, backups, security, and website support.",
    serviceName: "IT Support in Black Mountain NC"
  },
  {
    path: "/business-plan",
    title: "Robbins Technologies Business Plan | Asheville IT Services",
    description: "Business plan for Robbins Technologies, including IT repair, remote support, on-site service, monthly care, websites, and automation in Asheville and WNC.",
    pageType: "WebPage"
  }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeUrl(routePath) {
  return `${siteUrl}${routePath}/`;
}

function businessSchema() {
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Robbins Technologies",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/robbins-technologies-logo.png`,
    image: `${siteUrl}/robbins-technologies-it-support-hero.jpg`,
    email: "support@robbinstechnologies.com",
    telephone: "+18284366869",
    priceRange: "$$",
    areaServed: [
      "Asheville NC",
      "Buncombe County NC",
      "Hendersonville NC",
      "Weaverville NC",
      "Black Mountain NC",
      "Boone NC",
      "Western North Carolina",
      "Northwestern North Carolina"
    ]
  };
}

function routeSchema(route) {
  const url = routeUrl(route.path);
  const graph = [
    businessSchema(),
    {
      "@type": route.pageType || "WebPage",
      name: route.title,
      description: route.description,
      url
    }
  ];

  if (route.serviceName) {
    graph.push({
      "@type": "Service",
      name: route.serviceName,
      description: route.description,
      url,
      provider: {
        "@type": "ProfessionalService",
        name: "Robbins Technologies",
        telephone: "+18284366869",
        url: `${siteUrl}/`
      },
      areaServed: ["Asheville NC", "Western North Carolina", "Northwestern North Carolina"]
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function replaceMeta(html, route) {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const url = routeUrl(route.path);
  const schema = JSON.stringify(routeSchema(route), null, 8);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n      ${schema}\n    </script>`);
}

const baseHtml = await readFile(indexPath, "utf8");

await Promise.all(routes.map(async (route) => {
  const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), replaceMeta(baseHtml, route));
}));

console.log(`Generated ${routes.length} public route HTML files.`);
