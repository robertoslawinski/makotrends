const atUtc = (isoDateTime) => new Date(`${isoDateTime}:00.000Z`);

const fridayClose = atUtc("2026-10-30T18:00");
const fridaySnapshotClose = atUtc("2026-10-30T17:55");
const weekendResolution = atUtc("2026-10-31T12:00");

export const weeklyPredictions = [
  {
    title: "Will the Fed leave its target rate unchanged on Oct 28, 2026?",
    description:
      "A macro market on whether the Federal Reserve holds rates steady at its October meeting.",
    category: "Economy",
    deadline: atUtc("2026-10-28T17:45"),
    resolutionDate: atUtc("2026-10-28T20:00"),
    resolutionSource: "Federal Reserve FOMC statement: federalreserve.gov/monetarypolicy/fomccalendars.htm",
    resolutionCriteria:
      "Resolves YES if the Oct 27-28 FOMC statement leaves the federal funds target range unchanged from the range in effect immediately before the meeting. Resolves NO if either bound of the target range changes. Voting closes before the scheduled statement.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Brent crude settle at or above $115 on Oct 30, 2026?",
    description:
      "A weekly energy signal on whether elevated Middle East supply risk keeps Brent above $115.",
    category: "Oil",
    deadline: fridayClose,
    resolutionDate: weekendResolution,
    resolutionSource: "ICE Brent front-month settlement, cross-checked with FT Markets or Reuters",
    resolutionCriteria:
      "Resolves YES if the official Oct 30 settlement price for the front-month ICE Brent crude contract is at least $115.00 per barrel. Intraday trades do not count. Resolves NO if the settlement is below $115.00.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Bitcoin be at or above $82,000 at 18:00 UTC on Oct 30, 2026?",
    description:
      "A crypto momentum market on whether Bitcoin holds above the center of its current trading range.",
    category: "Crypto",
    deadline: fridaySnapshotClose,
    resolutionDate: weekendResolution,
    resolutionSource: "Coinbase BTC-USD one-minute candle, cross-checked with CoinGecko",
    resolutionCriteria:
      "Resolves YES if the Coinbase BTC-USD one-minute candle beginning at 18:00 UTC on Oct 30 has a closing price of at least $82,000.00. Resolves NO if that candle closes below $82,000.00. If Coinbase data is unavailable, CoinGecko's recorded USD price at 18:00 UTC is used.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will the Nasdaq Composite close above 25,955.34 on Oct 30, 2026?",
    description:
      "A technology sentiment market on whether the Nasdaq finishes the new week above its Oct 23 close.",
    category: "Markets",
    deadline: fridayClose,
    resolutionDate: weekendResolution,
    resolutionSource: "Nasdaq official Composite close, cross-checked with AP or MarketWatch",
    resolutionCriteria:
      "Resolves YES if the official Nasdaq Composite closing value on Oct 30 is greater than 25,955.34. Resolves NO if it is equal to or below 25,955.34. Closing values, not intraday highs, determine the result.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Democrats lead the RCP generic ballot average by 8+ points on Oct 30?",
    description:
      "A US midterm signal on whether the Democratic generic-ballot advantage remains at least eight points.",
    category: "Politics",
    deadline: fridaySnapshotClose,
    resolutionDate: weekendResolution,
    resolutionSource: "RealClearPolitics 2026 Generic Congressional Vote polling average",
    resolutionCriteria:
      "Resolves YES if the RealClearPolitics generic congressional ballot average displayed at 18:00 UTC on Oct 30 shows Democrats ahead of Republicans by at least 8.0 percentage points. Resolves NO if the lead is below 8.0 points or Republicans lead.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will Wan 3.0 remain #1 on the Artificial Analysis video leaderboard on Oct 30?",
    description:
      "An AI media signal on whether Alibaba's model keeps the top overall text-to-video quality ranking.",
    category: "AI",
    deadline: fridaySnapshotClose,
    resolutionDate: weekendResolution,
    resolutionSource: "Artificial Analysis AA-Video-T2V v2.1 Overall leaderboard",
    resolutionCriteria:
      "Resolves YES if Wan 3.0 is listed at rank 1 on the Artificial Analysis Text to Video Overall leaderboard at 18:00 UTC on Oct 30. A tied range still counts only if Wan 3.0 occupies the displayed number-one row. Resolves NO otherwise.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will 'Housewife' remain #1 on Spotify's Global Daily chart dated Oct 29?",
    description:
      "A culture momentum market on whether Tate McRae holds the world's most-streamed daily song position.",
    category: "Culture",
    deadline: atUtc("2026-10-29T23:55"),
    resolutionDate: weekendResolution,
    resolutionSource: "Spotify Charts Daily Top Songs Global for Oct 29, 2026",
    resolutionCriteria:
      "Resolves YES if Tate McRae's 'Housewife' is number 1 on Spotify's official Daily Top Songs Global chart dated Oct 29, 2026. Resolves NO if another track is number 1. The final published chart is authoritative.",
    pointsValue: 10,
    status: "open"
  },
  {
    title: "Will an AI assistant rank #1 among US free iPhone apps on Oct 30?",
    description:
      "A consumer adoption signal on whether a leading AI assistant reaches the top of the US App Store.",
    category: "Consumer Tech",
    deadline: fridaySnapshotClose,
    resolutionDate: weekendResolution,
    resolutionSource: "Apple US App Store Top Free iPhone Apps, archived by AppToday or App Chart Archive",
    resolutionCriteria:
      "Resolves YES if ChatGPT, Claude, Google Gemini, or Muse from Meta is ranked number 1 in the US Top Free iPhone Apps chart at 18:00 UTC on Oct 30. Resolves NO if another app is number 1. Games and paid-app charts do not count.",
    pointsValue: 10,
    status: "open"
  }
];
