import {
  AmountDeviceSettings,
  AmountSettings,
  DeviceType,
  DeviceWidthSettings,
} from '../types/types';

/** Функция определения типа текущего устройства
  @param settings - критерии, определяющие устройства
*/
const getDeviceType = (
  settings: DeviceWidthSettings,
): DeviceType => {
  const currentWidth = window.innerWidth;

  if (currentWidth > settings.tablet) {
    return DeviceType.Desktop;
  }
  if (currentWidth > settings.phone) {
    return DeviceType.Tablet;
  }

  return DeviceType.Phone;
};

export function getAmountSettings(
  deviceSettings: DeviceWidthSettings,
  countSettings: AmountDeviceSettings,
): AmountSettings {
  return countSettings[getDeviceType(deviceSettings)];
}

export default getDeviceType;
