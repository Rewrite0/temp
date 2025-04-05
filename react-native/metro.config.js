const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
const wrapNativeWind = withNativeWind(config, { input: './tailwind.css' });
const wrapReanimated = wrapWithReanimatedMetroConfig(wrapNativeWind);

module.exports = wrapReanimated;
