const daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(18, 0, 0, 0);
  return date;
};

export const launchPredictions = [
  {
    title: "Will OpenAI or Anthropic launch a browser-native agent by Dec 31, 2026?",
    description:
      "A market on whether a major AI lab ships an agent that can browse, click, and complete multi-step tasks directly in a consumer browser product.",
    category: "AI",
    deadline: daysFromNow(30),
    resolutionDate: daysFromNow(32),
    resolutionSource: "Official OpenAI or Anthropic product announcements",
    resolutionCriteria:
      "Resolves YES if OpenAI or Anthropic publicly launches a consumer-accessible browser-native agent before the deadline. The agent must be able to navigate websites and take multi-step actions, not only summarize pages. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a new social app report 25M monthly active users in 2026?",
    description:
      "A market on whether a social app launched after Jan 1, 2025 reaches meaningful mainstream scale during 2026.",
    category: "Social Media",
    deadline: daysFromNow(45),
    resolutionDate: daysFromNow(47),
    resolutionSource: "Company statements, investor materials, or credible third-party reporting",
    resolutionCriteria:
      "Resolves YES if a social app launched after Jan 1, 2025 publicly reports at least 25 million monthly active users before the deadline. Downloads alone do not count. Resolves NO if no qualifying report is available.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Bitcoin trade above $150,000 before Dec 31, 2026?",
    description:
      "A crypto market on whether BTC reaches a clearly defined price threshold on a major exchange.",
    category: "Crypto",
    deadline: daysFromNow(60),
    resolutionDate: daysFromNow(62),
    resolutionSource: "CoinMarketCap, CoinGecko, Coinbase, Binance, or Kraken price history",
    resolutionCriteria:
      "Resolves YES if BTC/USD trades at or above $150,000 on at least one listed source before the deadline. Intraday spikes count if visible in public historical data. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will foldable phones exceed 3% of global smartphone shipments in 2026?",
    description:
      "A consumer hardware market on whether foldables move beyond niche adoption.",
    category: "Consumer Tech",
    deadline: daysFromNow(90),
    resolutionDate: daysFromNow(95),
    resolutionSource: "IDC, Counterpoint Research, Canalys, or another major smartphone shipment report",
    resolutionCriteria:
      "Resolves YES if a credible market research report states that foldable phones exceeded 3% of global smartphone shipments for calendar year 2026. Resolves NO if reported share is 3% or lower, or no credible report supports the threshold.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will TikTok remain available in US app stores through Dec 31, 2026?",
    description:
      "A regulation and platform risk market on whether TikTok stays available for new US downloads.",
    category: "Regulation",
    deadline: daysFromNow(15),
    resolutionDate: daysFromNow(17),
    resolutionSource: "Apple App Store, Google Play Store, official TikTok statements, or US government notices",
    resolutionCriteria:
      "Resolves YES if TikTok remains available for new downloads in both the US Apple App Store and US Google Play Store at the deadline. Resolves NO if it is removed from either store for legal or regulatory reasons.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a major streaming platform launch interactive AI-generated shows in 2026?",
    description:
      "A media market on whether AI-generated interactive entertainment becomes a mainstream streaming feature.",
    category: "Media",
    deadline: daysFromNow(75),
    resolutionDate: daysFromNow(78),
    resolutionSource: "Official announcements from Netflix, Disney, Amazon, Apple, YouTube, or Warner Bros. Discovery",
    resolutionCriteria:
      "Resolves YES if one of the listed platforms launches a consumer-facing show or series where AI generation materially changes scenes, dialogue, or story paths per viewer input. Basic recommendations or static interactive episodes do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Apple ship a consumer AI wearable before Dec 31, 2026?",
    description:
      "A hardware market on whether Apple expands beyond phones, watches, and headsets with a new AI-first wearable.",
    category: "Consumer Tech",
    deadline: daysFromNow(120),
    resolutionDate: daysFromNow(123),
    resolutionSource: "Apple product announcements and Apple Store availability",
    resolutionCriteria:
      "Resolves YES if Apple announces and makes available for purchase a new consumer wearable positioned around AI assistance before the deadline. Apple Watch updates and Vision Pro accessories do not count unless released as a distinct wearable product line.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will an AI-generated song enter the Billboard Hot 100 top 40 in 2026?",
    description:
      "A culture market on whether AI music reaches mainstream chart visibility.",
    category: "Culture",
    deadline: daysFromNow(100),
    resolutionDate: daysFromNow(103),
    resolutionSource: "Billboard Hot 100 chart records and artist disclosures or credible reporting",
    resolutionCriteria:
      "Resolves YES if a song whose lead or featured vocals are substantially AI-generated reaches position 40 or higher on the Billboard Hot 100 before the deadline. AI-assisted production alone does not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a humanoid robot be used in paid customer-facing retail service in 2026?",
    description:
      "A robotics market on whether humanoid robots move from demos into real customer-facing operations.",
    category: "Robotics",
    deadline: daysFromNow(110),
    resolutionDate: daysFromNow(113),
    resolutionSource: "Company announcements, retailer announcements, or credible technology reporting",
    resolutionCriteria:
      "Resolves YES if a humanoid robot is deployed in a paid, customer-facing role at a retail, hospitality, or food service location before the deadline. Pilot demos closed to the public do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a major browser include built-in AI task automation by Dec 31, 2026?",
    description:
      "A software market on whether AI automation becomes a native browser capability.",
    category: "Software",
    deadline: daysFromNow(130),
    resolutionDate: daysFromNow(133),
    resolutionSource: "Official Chrome, Safari, Edge, Firefox, Arc, or Brave release notes",
    resolutionCriteria:
      "Resolves YES if a major browser ships a stable built-in feature that can complete multi-step web tasks from a user instruction. Sidebar chat, summarization, and search assistance alone do not count.",
    pointsValue: 10,
    status: "open"
  }
];
