import { scaleByDeviceWidth } from "../scalingUtil";


export const fontSizes = [0, 12, 14, 16, 18, 28, 42];

export const FontSize = {
  TEXT_HEADING1: scaleByDeviceWidth(20),
  TEXT_HEADING2: scaleByDeviceWidth(18),
  TEXT_HEADING3: scaleByDeviceWidth(17),
  SUB_HEADING: scaleByDeviceWidth(16),
  TEXT_REGULAR: scaleByDeviceWidth(14),
  TEXT_SMALL: scaleByDeviceWidth(12),
};

export const TypographyFontSize = {
  LARGE_TITLE1: scaleByDeviceWidth(34),
  LARGE_TITLE2: scaleByDeviceWidth(32),
  TITLE1: scaleByDeviceWidth(28),
  TITLE2: scaleByDeviceWidth(24),
  TITLE3: scaleByDeviceWidth(20),
  SUB_HEADLINE: scaleByDeviceWidth(18),
  BODY: scaleByDeviceWidth(17),
  CALLOUT: scaleByDeviceWidth(16),
  CAPTION1: scaleByDeviceWidth(14),
  CAPTION2: scaleByDeviceWidth(12),
  CAPTION3: scaleByDeviceWidth(10),
  CAPTION4: scaleByDeviceWidth(8),
};
