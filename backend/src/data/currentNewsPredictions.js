const dateAt = (isoDate) => new Date(`${isoDate}T18:00:00.000Z`);

export const currentNewsPredictions = [
  {
    title: "Will Brent crude trade above $115 before Jun 30, 2026?",
    description:
      "An oil market on whether Middle East supply risk pushes Brent crude materially above its current elevated level.",
    category: "Oil",
    deadline: dateAt("2026-06-30"),
    resolutionDate: dateAt("2026-07-02"),
    resolutionSource: "ICE Brent futures data, EIA, Reuters, Bloomberg, CNBC, or MarketWatch",
    resolutionCriteria:
      "Resolves YES if front-month Brent crude trades at or above $115.00 per barrel at any time before the deadline, according to at least one listed source. Resolves NO if Brent does not reach that threshold before the deadline.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the Strait of Hormuz be closed to commercial tanker traffic for 24+ hours by Jun 30, 2026?",
    description:
      "A geopolitical energy market on whether conflict risk causes a major oil transit disruption.",
    category: "Geopolitics",
    deadline: dateAt("2026-06-30"),
    resolutionDate: dateAt("2026-07-02"),
    resolutionSource: "Reuters, AP, EIA, IEA, US Navy, UKMTO, or official Gulf state notices",
    resolutionCriteria:
      "Resolves YES if credible reporting or official notices state that commercial oil or LNG tanker traffic through the Strait of Hormuz was fully or near-fully halted for at least 24 consecutive hours before the deadline. Temporary insurance warnings, isolated ship delays, or partial congestion alone do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will direct US-Iran military strikes resume before Jun 15, 2026?",
    description:
      "A conflict market on whether the fragile US-Iran ceasefire breaks into direct military action again.",
    category: "Geopolitics",
    deadline: dateAt("2026-06-15"),
    resolutionDate: dateAt("2026-06-17"),
    resolutionSource: "Reuters, AP, BBC, Al Jazeera, Pentagon, Iranian state media, or UN statements",
    resolutionCriteria:
      "Resolves YES if the US or Iran conducts a direct military strike against the other country's forces, territory, or state-linked military assets before the deadline, confirmed by official statements or at least two credible news sources. Proxy-only attacks without direct attribution do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the MV Hondius hantavirus cluster reach 10 confirmed cases by Jun 15, 2026?",
    description:
      "A public health market on whether confirmed cases tied to the cruise ship outbreak increase materially.",
    category: "Health",
    deadline: dateAt("2026-06-15"),
    resolutionDate: dateAt("2026-06-17"),
    resolutionSource: "CDC, WHO, ECDC, national health agencies, Reuters, AP, or The Guardian",
    resolutionCriteria:
      "Resolves YES if at least 10 confirmed hantavirus cases are publicly linked to the MV Hondius cruise ship cluster before the deadline. Probable, suspected, exposed, or monitored contacts do not count unless reported as confirmed cases.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will CDC or WHO raise the public risk level for the Hondius hantavirus outbreak above low by Jun 15, 2026?",
    description:
      "A health-risk market on whether authorities move from low-risk reassurance to a higher public risk assessment.",
    category: "Health",
    deadline: dateAt("2026-06-15"),
    resolutionDate: dateAt("2026-06-17"),
    resolutionSource: "CDC, WHO, ECDC, or official national public health updates",
    resolutionCriteria:
      "Resolves YES if CDC, WHO, ECDC, or another official national public health agency states that the general public risk from the Hondius-linked hantavirus outbreak is moderate, elevated, high, or equivalent before the deadline. Resolves NO if official public risk remains low or very low.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will FIFA announce a 2026 World Cup match venue change before Jun 11, 2026?",
    description:
      "A World Cup operations market on whether any scheduled match moves venue before tournament kickoff.",
    category: "Sports",
    deadline: dateAt("2026-06-11"),
    resolutionDate: dateAt("2026-06-12"),
    resolutionSource: "FIFA announcements, host city statements, AP, Reuters, ESPN, or BBC Sport",
    resolutionCriteria:
      "Resolves YES if FIFA officially announces that any 2026 World Cup match will move from its previously scheduled stadium to a different stadium before the opening match. Time changes without stadium changes do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a 2026 World Cup match be delayed by 60+ minutes because of weather before Jul 20, 2026?",
    description:
      "A World Cup risk market on whether summer weather materially disrupts the tournament schedule.",
    category: "Sports",
    deadline: dateAt("2026-07-20"),
    resolutionDate: dateAt("2026-07-22"),
    resolutionSource: "FIFA match reports, stadium announcements, AP, Reuters, ESPN, or BBC Sport",
    resolutionCriteria:
      "Resolves YES if any 2026 World Cup match kickoff or restart is delayed by at least 60 minutes due primarily to weather, heat, lightning, air quality, or related safety conditions before the deadline. Routine halftime or stoppage-time delays do not count.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Democrats lead the 2026 generic congressional ballot by 3+ points on Jul 1, 2026?",
    description:
      "A US midterm elections market on whether national polling shows a clear Democratic edge by early summer.",
    category: "Politics",
    deadline: dateAt("2026-07-01"),
    resolutionDate: dateAt("2026-07-03"),
    resolutionSource: "FiveThirtyEight, RealClearPolitics, The Economist, or major polling averages",
    resolutionCriteria:
      "Resolves YES if a recognized polling average shows Democrats leading Republicans by at least 3.0 percentage points on the generic congressional ballot on Jul 1, 2026. If multiple recognized averages exist, at least two must show a 3.0+ point Democratic lead. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Republicans remain favored to control the Senate on Sep 1, 2026?",
    description:
      "A US midterm elections market on whether Senate control forecasts still favor Republicans after summer campaigning.",
    category: "Politics",
    deadline: dateAt("2026-09-01"),
    resolutionDate: dateAt("2026-09-03"),
    resolutionSource: "Cook Political Report, Sabato's Crystal Ball, Inside Elections, FiveThirtyEight, or The Economist forecasts",
    resolutionCriteria:
      "Resolves YES if at least two listed forecasters or forecast models rate Republicans as more likely than Democrats to control the US Senate on Sep 1, 2026. Resolves NO if Democrats are favored by at least two listed sources or if no listed source favors Republicans.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Brent crude close below $95 before Jun 30, 2026?",
    description:
      "A counter-signal oil market on whether prices cool despite current supply-risk fears.",
    category: "Oil",
    deadline: dateAt("2026-06-30"),
    resolutionDate: dateAt("2026-07-02"),
    resolutionSource: "ICE Brent settlement data, EIA, Reuters, Bloomberg, CNBC, or MarketWatch",
    resolutionCriteria:
      "Resolves YES if front-month Brent crude has an official daily close or settlement below $95.00 per barrel before the deadline, according to at least one listed source. Intraday trades below $95 do not count unless the official close or settlement is below $95.",
    pointsValue: 10,
    status: "open"
  }
];
