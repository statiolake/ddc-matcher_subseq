import { Candidate } from "https://lib.deno.dev/x/ddc_vim@v1/types.ts";
import {
  BaseFilter,
  FilterArguments,
} from "https://lib.deno.dev/x/ddc_vim@v1/base/filter.ts";

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

type Params = {};

export class Filter extends BaseFilter<Params> {
  filter(
    { completeStr, candidates }: FilterArguments<Params>,
  ): Promise<Candidate[]> {
    const res = completeStr
      ? candidates.filter((c) =>
        containsSubsequence(c.abbr || c.word, completeStr)
      )
      : candidates;
    return Promise.resolve(res);
  }
  override params(): Params {
    return {};
  }
}
