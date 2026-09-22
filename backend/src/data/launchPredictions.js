const dateAt = (isoDate) => new Date(`${isoDate}T18:00:00.000Z`);

export const launchPredictions = [
  {
    title: "Will Flamengo finish the 2026 Brasileirao in the top 3?",
    description:
      "A season-table market on whether Flamengo ends the 2026 Serie A campaign inside the first three positions.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if Flamengo is officially listed 1st, 2nd, or 3rd in the final CBF Brasileirao Serie A 2026 standings after all tie-breakers and disciplinary adjustments. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Palmeiras reach the 2026 Libertadores final?",
    description:
      "A knockout-stage market on whether Palmeiras qualifies for the 2026 CONMEBOL Libertadores final.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-10-20"),
    resolutionDate: dateAt("2026-11-02"),
    resolutionSource: "CONMEBOL match reports and official Libertadores bracket",
    resolutionCriteria:
      "Resolves YES if Palmeiras wins its semifinal tie and is officially listed by CONMEBOL as a finalist in the 2026 Libertadores. Resolves NO if Palmeiras is eliminated before the final or does not participate in the semifinal stage.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will a Brazilian club win the 2026 Libertadores?",
    description:
      "A continental-title market on whether the Libertadores trophy goes to a club from Brazil.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-11-20"),
    resolutionDate: dateAt("2026-11-30"),
    resolutionSource: "CONMEBOL official final match report",
    resolutionCriteria:
      "Resolves YES if the club officially declared champion of the 2026 CONMEBOL Libertadores is affiliated with CBF. Resolves NO if the champion is from any other federation.",
    pointsValue: 14,
    status: "open"
  },
  {
    title: "Will the 2026 Libertadores final include at least one Brazilian club?",
    description:
      "A finalist-composition market for the single-match final scheduled in Montevideo.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-10-20"),
    resolutionDate: dateAt("2026-11-02"),
    resolutionSource: "CONMEBOL official Libertadores finalist announcement",
    resolutionCriteria:
      "Resolves YES if at least one finalist in the 2026 Libertadores final is a CBF-affiliated Brazilian club. Resolves NO if neither finalist is Brazilian.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the 2026 Brasileirao champion finish with 75+ points?",
    description:
      "A title-race strength market on whether the champion reaches a high-points threshold.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if the official 2026 Brasileirao Serie A champion finishes with 75 or more points after all final adjustments. Resolves NO if the champion finishes with 74 points or fewer.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the 2026 Brasileirao relegation cutoff be 42+ points?",
    description:
      "A relegation-battle market on the number of points required to avoid the bottom four.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if the 16th-placed club in the final 2026 Brasileirao Serie A table has 42 or more points. Resolves NO if the 16th-placed club has 41 points or fewer.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will Botafogo finish ahead of Fluminense in the 2026 Brasileirao?",
    description:
      "A Rio table-race market comparing final league positions between Botafogo and Fluminense.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if Botafogo is placed above Fluminense in the final official 2026 Brasileirao Serie A standings. Resolves NO if Fluminense finishes above Botafogo or if either club is not in the final Serie A table.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Corinthians change head coach before the 2026 Brasileirao ends?",
    description:
      "A club-management signal on whether Corinthians makes a senior head-coach change before the final league round is complete.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-01"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "Corinthians official announcements, CBF match records, or major Brazilian sports outlets",
    resolutionCriteria:
      "Resolves YES if Corinthians officially appoints a different permanent or interim senior men's head coach before the final 2026 Brasileirao matchday is complete. Routine assistant absences or suspensions do not count. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a Brazilian club sell a player to Europe for over EUR30M in 2026?",
    description:
      "A transfer-market signal on whether a Brazil-based club completes a major outbound sale.",
    category: "Transfers",
    deadline: dateAt("2026-12-20"),
    resolutionDate: dateAt("2026-12-31"),
    resolutionSource: "Club announcements, buying club announcements, CBF registration notices, Transfermarkt, Globo Esporte, GE, or UOL Esporte",
    resolutionCriteria:
      "Resolves YES if a club based in Brazil announces or completes a permanent player sale to a European club for a reported guaranteed transfer fee above EUR30 million during calendar year 2026. Add-ons count only if reported as guaranteed. Resolves NO otherwise.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will a Serie A goalkeeper score or assist in an official 2026 match?",
    description:
      "A rare-event market for goalkeepers from Brazilian Serie A clubs in official competitions.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-12-20"),
    resolutionDate: dateAt("2026-12-31"),
    resolutionSource: "CBF match reports, CONMEBOL match reports, club match reports, SofaScore, or ESPN Brasil",
    resolutionCriteria:
      "Resolves YES if any goalkeeper registered by a 2026 Brasileirao Serie A club is officially credited with a goal or assist in an official senior men's club match during calendar year 2026. Penalty shootout goals do not count. Resolves NO otherwise.",
    pointsValue: 14,
    status: "open"
  },
  {
    title: "Will a Brasileirao 2026 club receive a points deduction this season?",
    description:
      "A governance-risk market on whether the official league table is altered by a disciplinary points penalty.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-12-20"),
    resolutionDate: dateAt("2026-12-31"),
    resolutionSource: "CBF, STJD, FIFA, CAS, or official league table updates",
    resolutionCriteria:
      "Resolves YES if any 2026 Brasileirao Serie A club has league points deducted from its official table total for disciplinary, registration, financial, or legal reasons during the 2026 season. Suspended penalties that do not change the table do not count. Resolves NO otherwise.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will a Brazilian player finish as top scorer of the 2026 Libertadores?",
    description:
      "A player-performance market on whether the competition's scoring chart is led by a Brazilian player.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-11-20"),
    resolutionDate: dateAt("2026-11-30"),
    resolutionSource: "CONMEBOL official Libertadores statistics",
    resolutionCriteria:
      "Resolves YES if CONMEBOL's final 2026 Libertadores scoring table lists a Brazilian player as the sole top scorer or tied top scorer. Nationality is based on CONMEBOL's player registration or official profile. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the 2026 Brasileirao have 3+ clubs finish with 70+ points?",
    description:
      "A table-depth market on whether the title race produces three high-scoring teams.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if at least three clubs finish the official 2026 Brasileirao Serie A season with 70 or more points after all final adjustments. Resolves NO if two or fewer clubs reach 70 points.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a Brazilian club win the 2026 Libertadores final in regulation time?",
    description:
      "A final-match market on whether a Brazilian finalist, if present, wins without extra time or penalties.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-11-20"),
    resolutionDate: dateAt("2026-11-30"),
    resolutionSource: "CONMEBOL official final match report",
    resolutionCriteria:
      "Resolves YES if a CBF-affiliated Brazilian club wins the 2026 Libertadores final after 90 minutes plus stoppage time. Resolves NO if no Brazilian club wins the final, or if a Brazilian club wins only after extra time or penalties.",
    pointsValue: 14,
    status: "open"
  }
];
