export const CONFERENCE = {
  title: "Celebration of Silver Jubilee of DSpace in IIIC 2026, IGNOU",
  edition: "Silver Jubilee Celebration",
  dates: "January 11, 2027",
  format: "Ambedkar Convention Centre, IGNOU",
  contactEmail: "dspace-jubilee@lyrasis.org",
  host: "IIIC 2026, IGNOU & Global DSpace Community",
};

export interface NationalRepository {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  capabilitiesTitle: string;
  highlights: string[];
  relatedTitle?: string;
  relatedItems?: { name: string; desc: string }[];
}

export const NATIONAL_REPOSITORIES: NationalRepository[] = [
  {
    id: "shodhganga",
    name: "Shodhganga",
    subtitle: "INFLIBNET Centre, UGC (India)",
    description:
      "Shodhganga is India's national open-access repository of Electronic Theses and Dissertations (ETDs), developed and maintained by the INFLIBNET Centre, an autonomous Inter-University Centre of the University Grants Commission (UGC). It provides a centralized platform through which Indian universities and other eligible higher education institutions can deposit, preserve, discover, and provide access to electronic theses and dissertations.",
    url: "https://shodhganga.inflibnet.ac.in/",
    badge: "National Theses Repository",
    capabilitiesTitle: "Core DSpace Capabilities:",
    highlights: [
      "Supports the UGC requirement for electronic submission of Ph.D. theses to INFLIBNET for hosting and access.",
      "Built on DSpace, an open-source digital repository platform.",
      "Uses a qualified Dublin Core metadata schema for describing ETD records.",
      "Supports OAI-PMH (Open Archives Initiative Protocol for Metadata Harvesting) for metadata interoperability and harvesting.",
      "Provides facilities for the capture, indexing, storage, dissemination, and preservation of electronic theses and dissertations.",
    ],

  },
  {
    id: "egyankosh",
    name: "eGyanKosh",
    subtitle: "Indira Gandhi National Open University — IGNOU (India)",
    description:
      "A national digital repository developed and maintained by IGNOU to store, index, preserve, distribute, and share digital learning resources developed by Open and Distance Learning (ODL) institutions. It provides access to IGNOU's Self-Learning Materials (SLMs), audio programmes, video lectures, and other digital educational resources through a structured repository of communities and collections.",
    url: "https://egyankosh.ac.in/",
    badge: "National Digital Repository",
    capabilitiesTitle: "Core Repository Capabilities:",
    highlights: [
      "Centralized repository of Self-Learning Materials (SLMs), organized by schools, programmes, courses, and blocks/units.",
      "Audio and video educational resources, including recorded lectures and other multimedia learning materials.",
      "Structured community and collection-based browsing, supporting organized discovery and access to educational resources.",
      "Search, browse, download, and access facilities for a large body of digital learning resources.",
      "Supports preservation and dissemination of digital learning resources within the Open and Distance Learning ecosystem.",
    ],
  },
];

export const POSTER_GUIDELINES = {
  format: "ISO A0 Portrait (841 mm x 1189 mm / 33.1 in x 46.8 in)",
  submissionType: "Google Drive Shareable Link (PDF format)",
  deadline: "December 20, 2026",
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
