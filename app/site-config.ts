export const financingApplicationUrl = "/financing";

export const liveSiteOrigin =
  "https://www.cvpurewater.com";

export const sitesBackendOrigin =
  "https://central-valley-pure-water.supreme-pro-2342.chatgpt.site";

export const liveWaterCheckUrl = `${liveSiteOrigin}/water-check`;

export const hearthApplicationUrl =
  "https://app.gethearth.com/partners/supreme-pro-builders/motuma/apply";

export function referralFinancingUrl(referralCode = "") {
  return referralCode ? `/financing?ref=${encodeURIComponent(referralCode)}` : financingApplicationUrl;
}
