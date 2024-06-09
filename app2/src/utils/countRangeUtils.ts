const getCountRangeWithUnit = (count: number) => {
  if (count === 0) return null;

  if (count < 10) return '1+';

  if (count < 50) return '10+';

  if (count < 100) return '50+';

  if (count >= 100 && count < 1000) return `${Math.floor(count / 100)}00+`;

  if (count >= 1000 && count < 10000) return `${Math.floor(count / 1000)}K+`;

  return '10K+';
};

export default getCountRangeWithUnit;
