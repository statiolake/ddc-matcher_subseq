import {
  BaseFilter,
  Candidate,
} from "https://deno.land/x/ddc_vim@v0.5.0/types.ts#^";
import { FilterArguments } from "https://deno.land/x/ddc_vim@v0.5.0/base/filter.ts#^";

function containsSubsequence(haystack: string, needle: string): boolean {
  if (haystack.length < needle.length) return false;

  haystack = haystack.toLowerCase();
  needle = needle.toLowerCase();
  let hidx = 0, nidx = 0;
  while (hidx < haystack.length && nidx < needle.length) {
    if (haystack[hidx] == needle[nidx]) {
      hidx++;
      nidx++;
    } else {
      hidx++;
    }
  }

  return nidx == needle.length;
}

export class Filter extends BaseFilter {
  filter({ completeStr, candidates }: FilterArguments): Promise<Candidate[]> {
    const res = completeStr
      ? candidates.filter((c) => containsSubsequence(c.word, completeStr))
      : candidates;
    return Promise.resolve(res);
  }
}
