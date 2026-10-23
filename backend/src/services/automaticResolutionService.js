const comparisonOperations = {
  gt: (value, threshold) => value > threshold,
  gte: (value, threshold) => value >= threshold,
  lt: (value, threshold) => value < threshold,
  lte: (value, threshold) => value <= threshold
};

export const evaluateComparison = ({ value, operator, threshold }) => {
  const compare = comparisonOperations[operator];
  if (!compare) {
    throw new Error(`Unsupported comparison operator: ${operator}`);
  }

  if (!Number.isFinite(value) || !Number.isFinite(threshold)) {
    throw new Error("Comparison value and threshold must be finite numbers");
  }

  return compare(value, threshold) ? "yes" : "no";
};

const fetchCoinbaseCandle = async ({ symbol, observationTime }) => {
  const observedAt = new Date(observationTime);
  if (Number.isNaN(observedAt.getTime())) {
    throw new Error("Coinbase observation time is invalid");
  }

  const start = new Date(Math.floor(observedAt.getTime() / 60000) * 60000);
  const end = new Date(start.getTime() + 60000);
  const query = new URLSearchParams({
    start: start.toISOString(),
    end: end.toISOString(),
    granularity: "60"
  });
  const url = `https://api.exchange.coinbase.com/products/${encodeURIComponent(
    symbol
  )}/candles?${query}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "MakoTrends market resolver" },
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) {
    throw new Error(`Coinbase returned HTTP ${response.status}`);
  }

  const candles = await response.json();
  if (!Array.isArray(candles) || candles.length === 0) {
    throw new Error("Coinbase returned no candle for the observation time");
  }

  const expectedTimestamp = Math.floor(start.getTime() / 1000);
  const candle = candles.find((item) => item[0] === expectedTimestamp);
  if (!candle) {
    throw new Error("Coinbase did not return the exact requested one-minute candle");
  }
  const close = Number(candle[4]);
  if (!Number.isFinite(close)) {
    throw new Error("Coinbase candle did not contain a valid close price");
  }

  return {
    value: close,
    evidence: `Coinbase ${symbol} one-minute candle at ${start.toISOString()} closed at ${close}.`
  };
};

export const resolveAutomatically = async (automaticResolution) => {
  if (!automaticResolution?.enabled) {
    throw new Error("Automatic resolution is not enabled for this market");
  }

  let observation;
  if (automaticResolution.provider === "coinbase-candle") {
    observation = await fetchCoinbaseCandle(automaticResolution);
  } else {
    throw new Error(`Unsupported resolution provider: ${automaticResolution.provider}`);
  }

  return {
    result: evaluateComparison({
      value: observation.value,
      operator: automaticResolution.operator,
      threshold: automaticResolution.threshold
    }),
    evidence: observation.evidence
  };
};
