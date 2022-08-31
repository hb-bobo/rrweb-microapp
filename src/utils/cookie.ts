/**
 * 获取指定 cookie 值，若不存在则返回空串
 * @param key key
 * @returns value
 */
export function getCookie(key: string): string {
  const { cookie } = document;
  if (cookie == null) return "";
  return (
    cookie
      .split(";")
      .filter((str) => str.trim().length > 0)
      .map((it) => it.split("="))
      .map(([k, v]) => [k.trim(), v.trim()])
      .find(([k]) => k === key)?.[1] ?? ""
  );
}
