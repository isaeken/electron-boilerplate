export function format(string: string, replacements: Record<string, string>): string {
  return string.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return replacements[key] || match;
  });
}
