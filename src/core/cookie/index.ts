export const deleteCookie = (key: string): void => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

export const readCookie = (key: string): string | undefined => {
  let data;

  const documentCookieData: string[] = document.cookie.split(";");
  for (let index = 0; index < documentCookieData.length; index += 1) {
    const value: string = documentCookieData[index];
    if (value.includes(`${key}=`)) {
      data = value.replace(`${key}=`, "").trim();
      break;
    }
  }

  return data;
};

export const writeCookie = (key: string, value: string, daysTilExpired = 1): void => {
  const date: Date = new Date();
  date.setTime(date.getTime() + (daysTilExpired * 24 * 60 * 60 * 1000));
  document.cookie = `${key}=${value};expires=${date.toUTCString()}`;
};
