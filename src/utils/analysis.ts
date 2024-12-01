// src/utils/analysis.ts

export function calculateSimpleMovingAverage(
  data: number[],
  windowSize: number
): number[] {
  const sma: number[] = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    const windowData = data.slice(i, i + windowSize);
    const sum = windowData.reduce((total, num) => total + num, 0);
    sma.push(sum / windowSize);
  }

  return sma;
}

export function calculateExponentialMovingAverage(
  data: number[],
  windowSize: number
): number[] {
  const ema: number[] = [];
  const k = 2 / (windowSize + 1);
  let prevEma = data[0];

  ema.push(prevEma);

  for (let i = 1; i < data.length; i++) {
    const currentEma = data[i] * k + prevEma * (1 - k);
    ema.push(currentEma);
    prevEma = currentEma;
  }

  return ema;
}

export function calculateVolatility(data: number[]): number {
  const mean = data.reduce((total, num) => total + num, 0) / data.length;
  const squaredDiffs = data.map((num) => Math.pow(num - mean, 2));
  const variance =
    squaredDiffs.reduce((total, num) => total + num, 0) / data.length;
  return Math.sqrt(variance);
}
