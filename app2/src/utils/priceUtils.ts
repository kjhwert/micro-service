const koreaPriceFormatWithUnit = (price: number, fullyDisplay: boolean | undefined = false) => {
  if (fullyDisplay) {
    return `${price.toLocaleString()}원`;
  }

  return price < 10000 ? `${price.toLocaleString()}원` : `${Math.floor((price / 10000) * 10) / 10}만원`;
};

interface FormatWithUnitOptions {
  isKoreanFormat?: boolean;
  fullyDisplay?: boolean;
}

const formatWithUnit = (price: number, options?: FormatWithUnitOptions) => {
  const isKoreanFormat = options?.isKoreanFormat ?? true;

  if (isKoreanFormat) {
    return koreaPriceFormatWithUnit(price, options?.fullyDisplay);
  } else {
    return `₩${price.toLocaleString()}`;
  }
};

const couponFormatWithUnit = (price: number, options?: Pick<FormatWithUnitOptions, 'isKoreanFormat'>) => {
  const isKoreanFormat = options?.isKoreanFormat ?? true;

  if (isKoreanFormat) {
    if (100_000 <= price) {
      return `${price / 10_000}만원`;
    }

    return `${price.toLocaleString()}원`;
  } else {
    return `₩${price.toLocaleString()}`;
  }
};

const priceUtils = {
  formatWithUnit,
  couponFormatWithUnit,
};

export default priceUtils;
