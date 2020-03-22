export const round = (value: number, decimals: number = 2) => Math.round(value * 10**decimals) / (10**decimals);

export const formatBytes = (bytes: number) => bytes / 1024 / 1024;