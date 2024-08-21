import { stringToBoolean, url } from './featureFlags.utils';

const FEATURE_ENABLE_DEVELOPMENT_MODE_SEARCH_PARAM = 'enable-development-mode';
const possibleDevelopmentMode = url.searchParams.get(FEATURE_ENABLE_DEVELOPMENT_MODE_SEARCH_PARAM);

export const isDevelopmentFeatureFlagEnabled = (): boolean | undefined => {
  return stringToBoolean(possibleDevelopmentMode);
};
