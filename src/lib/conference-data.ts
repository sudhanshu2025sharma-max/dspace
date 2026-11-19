export const CONFERENCE = {
  title: "DSpace Jubilee Conference",
  edition: "20 Year Anniversary Celebration",
  dates: "November 18-20, 2026",
  format: "Hybrid Assembly (Academic Center & Online)",
  contactEmail: "dspace-jubilee@lyrasis.org",
  host: "Lyrasis & Global DSpace Community",
};

export const HOW_DSPACE_WORKS = [
  {
    step: "01",
    title: "Ingest & Dublin Core Metadata",
    desc: "Scholars and libraries deposit research papers, theses, and datasets. DSpace captures standardized Dublin Core metadata, enforces submission workflows, and validates digital files.",
  },
  {
    step: "02",
    title: "Secure Bitstream Preservation",
    desc: "Files are stored in managed bitstream asset stores with continuous cryptographic checksum verification (MD5/SHA) and assigned permanent persistent handles (hdl.handle.net) or DOIs.",
  },
  {
    step: "03",
    title: "Global Discovery & OAI-PMH Harvest",
    desc: "Content is indexed in real-time and harvested worldwide via OAI-PMH, Google Scholar, OpenAIRE, and institutional research search engines for universal open access.",
  },
];

export const NATIONAL_REPOSITORIES = [
  {
    id: "shodhganga",
    name: "Shodhganga",
    subtitle: "INFLIBNET Centre, UGC (India)",
    description:
      "India's national digital reservoir of electronic theses and dissertations (ETDs) submitted by research scholars across universities in India. Built entirely on DSpace, it provides open access to Ph.D. research to foster academic transparency and prevent research duplication.",
    url: "https://shodhganga.inflibnet.ac.in/",
    badge: "National Theses Repository",
    highlights: [
      "Open access to full-text doctoral dissertations",
      "Standardized Dublin Core metadata harvesting via OAI-PMH",
      "Unified repository infrastructure for universities across India",
    ],
  },
  {
    id: "egyankosh",
    name: "eGyanKosh",
    subtitle: "IGNOU (India)",
    description:
      "A national digital repository developed by Indira Gandhi National Open University (IGNOU) to store, index, and share digital learning resources developed by open and distance learning institutions across India. Built on DSpace, it delivers educational materials to millions of students.",
    url: "https://egyankosh.ac.in/",
    badge: "Open Learning Repository",
    highlights: [
      "Digital self-instructional study materials and course units",
      "Audio-video educational repositories and lecture archives",
      "Accessible open learning infrastructure across disciplines",
    ],
  },
];

export const ORGANIZERS = [
  {
    name: "Dr. Eleanor Vance",
    role: "Conference General Chair",
    org: "European Repositories Consortium",
  },
  {
    name: "Prof. Rajeshwar Sundaram",
    role: "Program Committee Chair",
    org: "Open Science Forum",
  },
  {
    name: "Kathryn Chen",
    role: "Repository Systems Lead",
    org: "MIT Libraries",
  },
  {
    name: "Sheila O'Connor",
    role: "Community Governance Liaison",
    org: "Lyrasis",
  },
];

export const POSTER_GUIDELINES = {
  format: "ISO A0 Portrait (841 mm x 1189 mm / 33.1 in x 46.8 in)",
  submissionType: "Google Drive Shareable Link (PDF format)",
  deadline: "September 30, 2026",
  sections: [
    {
      num: "01",
      name: "Header & Attribution",
      detail: "Concise poster title, author names, institutional affiliation, and contact email.",
    },
    {
      num: "02",
      name: "Institutional Context",
      detail: "The problem, digital preservation challenge, or repository modernization need.",
    },
    {
      num: "03",
      name: "DSpace Implementation",
      detail: "Architecture, DSpace configuration, metadata workflows, or custom integrations.",
    },
    {
      num: "04",
      name: "Outcomes & Analysis",
      detail: "Collection growth, deposit speed, discoverability, or user adoption analysis.",
    },
    {
      num: "05",
      name: "Key Takeaways",
      detail: "Practical recommendations and lessons learned for peer repository administrators.",
    },
  ],
};
