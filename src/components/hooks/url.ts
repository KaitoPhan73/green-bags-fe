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
  const updateUrlParams = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value)); // Convert value to string
    router.replace(`${window.location.pathname}?${params.toString()}`); // Update URL with new query params
  };

  /**
   * Retrieves the value of a URL query parameter.
   * @param key - The query parameter key to retrieve.
   * @returns The value of the query parameter or null if not present.
   */
  const getUrlParam = (key: string): string | null => {
    return searchParams.get(key);
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

  return { updateUrlParams, getUrlParam, deleteUrlParam };
}
