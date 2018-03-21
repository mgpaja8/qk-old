export function shiftStationKey(shift: string, station: string): string {
  return (shift + station).toLowerCase().replace(/\s/g, '');
}
