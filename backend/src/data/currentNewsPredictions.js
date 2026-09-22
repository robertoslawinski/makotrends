const dateAt = (isoDate) => new Date(`${isoDate}T18:00:00.000Z`);

export const currentNewsPredictions = [
  {
    title: "Will a Brazilian club reach the 2026 Libertadores final?",
    description:
      "A late-tournament signal on whether Brazilian football places at least one club in the Montevideo final.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-10-20"),
    resolutionDate: dateAt("2026-11-02"),
    resolutionSource: "CONMEBOL official Libertadores bracket and match reports",
    resolutionCriteria:
      "Resolves YES if at least one CBF-affiliated club is officially confirmed as a finalist in the 2026 CONMEBOL Libertadores. Resolves NO if both finalists are from other federations.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the 2026 Libertadores final go to penalties?",
    description:
      "A final-format market for the single-match Libertadores final scheduled for November 28, 2026.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-11-20"),
    resolutionDate: dateAt("2026-11-30"),
    resolutionSource: "CONMEBOL official final match report",
    resolutionCriteria:
      "Resolves YES if the 2026 Libertadores final winner is decided by a penalty shootout. Resolves NO if the match is decided in regulation time or extra time.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will any 2026 Brasileirao club win 5+ consecutive league matches after Sep 22?",
    description:
      "A momentum market tracking whether any Serie A club produces a five-match winning streak in the run-in.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-10"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF Brasileirao Serie A 2026 match results",
    resolutionCriteria:
      "Resolves YES if any club wins at least five consecutive 2026 Brasileirao Serie A matches played after Sep 22, 2026. Postponed matches count by played date, not original round date. Resolves NO otherwise.",
    pointsValue: 12,
    status: "open"
  },
  {
    title: "Will the 2026 Brasileirao title be decided by 3 points or fewer?",
    description:
      "A title-race compression signal comparing the final points totals of first and second place.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if the official final points gap between 1st and 2nd place in the 2026 Brasileirao Serie A is three points or fewer. Resolves NO if the champion finishes four or more points ahead.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will 4+ Rio or Sao Paulo clubs finish in the 2026 Brasileirao top 8?",
    description:
      "A regional-strength market counting clubs from Rio de Janeiro and Sao Paulo in the upper table.",
    category: "Brasileirao 2026",
    deadline: dateAt("2026-11-15"),
    resolutionDate: dateAt("2026-12-07"),
    resolutionSource: "CBF final Brasileirao Serie A 2026 table",
    resolutionCriteria:
      "Resolves YES if at least four clubs based in Rio de Janeiro or Sao Paulo states finish 1st through 8th in the official 2026 Brasileirao Serie A table. Resolves NO if three or fewer do.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will a Brazilian club keep a clean sheet in the 2026 Libertadores final?",
    description:
      "A defensive-performance market for the final in Montevideo.",
    category: "Libertadores 2026",
    deadline: dateAt("2026-11-20"),
    resolutionDate: dateAt("2026-11-30"),
    resolutionSource: "CONMEBOL official final match report",
    resolutionCriteria:
      "Resolves YES if a CBF-affiliated finalist concedes zero goals during regulation time plus extra time in the 2026 Libertadores final. Penalty shootout goals do not count. Resolves NO if no Brazilian finalist keeps a clean sheet or if no Brazilian club reaches the final.",
    pointsValue: 12,
    status: "open"
  }
];
