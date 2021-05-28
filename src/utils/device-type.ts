import {DeviceType, DeviceWidthSettings} from './types';

const getDeviceType = (settings: DeviceWidthSettings): DeviceType => {
  const currentWidth = window.innerWidth;

  if (currentWidth > settings.tablet) {
    return DeviceType.Desktop;
  }
  if (currentWidth > settings.phone) {
    return DeviceType.Tablet;
  }

  return DeviceType.Phone;
};

export default getDeviceType;
