import { STRINGS } from "../config";

function replace(s: string, data: any[], i: number = 0): any[] {
  if (i >= data.length) return [s];

  const subs = s.split(`\${${i}}`).map(sub => replace(sub, data, i + 1));
  const result = [subs[0]];

  for (let subi = 1; subi < subs.length; subi++) {
    result.push(data[i]);
    result.push(subs[subi]);
  }

  return result.reduce((arr, v) => arr.concat(v), []);
}

export function i18n(strings: TemplateStringsArray, ...data: any[]) {
  const keys = data.map((x, i) => `\${${i}}`);
  const template = [].concat
    .apply([], strings.map((s, i) => (i > 0 ? [`\${${i - 1}}`, s] : [s])))
    .join("");

  const newTemplate = STRINGS[template] || template;

  return replace(newTemplate, data);
}
