export const url = new URL(window.location.href);

export function stringToBoolean(s: string | undefined | null): boolean | undefined {
  switch (s) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
}
