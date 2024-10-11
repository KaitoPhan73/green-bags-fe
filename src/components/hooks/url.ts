import { useRouter, useSearchParams } from "next/navigation";

/**
 * Utility functions to manage URL query parameters.
 */
export function useUrlParamChange() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates a URL query parameter.
   * @param key - The query parameter key to update.
   * @param value - The new value for the query parameter.
   */
  const updateUrlParam = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value)); // Convert value to string
    router.replace(`${window.location.pathname}?${params.toString()}`); // Update URL with new query params
  };

  const updateUrlParams = (
    paramsObj: Record<string, string | number | boolean>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Cập nhật nhiều params cùng lúc
    Object.keys(paramsObj).forEach((key) => {
      params.set(key, String(paramsObj[key])); // Chuyển thành chuỗi
    });

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  /**
   * Retrieves the value of a URL query parameter.
   * @param key - The query parameter key to retrieve.
   * @returns The value of the query parameter or null if not present.
   */
  const getUrlParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getCurrentParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("params", params);
    return params;
  };

  /**
   * Deletes a URL query parameter.
   * @param key - The query parameter key to delete.
   */
  const deleteUrlParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${window.location.pathname}?${params.toString()}`); // Update URL with new query params
  };

  return {
    updateUrlParam,
    updateUrlParams,
    getUrlParam,
    deleteUrlParam,
    getCurrentParams,
  };
}
