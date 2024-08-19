export const getMainPath = (url: string | null | undefined): string | null => {
  if (url === null || url === undefined) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;

    const parts = path.split("/").filter((part) => part);
    return "/" + (parts.length > 0 ? parts[0] : "");
  } catch (error) {
    return null;
  }
};
