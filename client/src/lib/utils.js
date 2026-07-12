/**
 * Simple classname merge utility (equivalent to cn from shadcn).
 * Joins truthy class strings, filters out falsy values.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
