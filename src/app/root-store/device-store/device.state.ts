export const deviceFeatureKey = 'device';

export interface DeviceCharacteristics
{
  deviceWidth: number;
  deviceHeight: number;

  isExtraSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;

  isLessThanSmall: boolean;
  isLessThanMedium: boolean;
  isLessThanLarge: boolean;
  isLessThanExtraLarge: boolean;

  isGreaterThanExtraSmall: boolean;
  isGreaterThanSmall: boolean;
  isGreaterThanMedium: boolean;
  isGreaterThanLarge: boolean;

  isLandscape: boolean;
  isPortrait: boolean;
  isRetina2: boolean;
  isRetina3: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isStandalone: boolean;
}

export interface DeviceState
{
  deviceCharacteristics: DeviceCharacteristics;
}


export const initialDeviceState: DeviceState =
{
  deviceCharacteristics: null
};
