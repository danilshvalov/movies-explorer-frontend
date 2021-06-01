import {DeviceType, DeviceWidthSettings} from '../types/types';

/** Функция определения типа текущего устройства
  @param settings - критерии, определяющие устройства
*/
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
