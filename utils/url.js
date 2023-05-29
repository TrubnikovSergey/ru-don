import configJSON from "../config.json";

export function deleteURLParams(url, key) {
  const objURL = new URL(`${configJSON.HOST}/${url}`);
  objURL.searchParams.delete(key);
  const pathName = objURL.pathname;
  const search = objURL.search;

  const resultUrl = `${pathName}${search}`.replace("//", "/");

  return resultUrl;
}
