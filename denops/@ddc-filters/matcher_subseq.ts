import { Item } from "https://lib.deno.dev/x/ddc_vim@v3/types.ts";
import {
  BaseFilter,
  FilterArguments,
} from "https://lib.deno.dev/x/ddc_vim@v3/base/filter.ts";

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
  override filter(
    args: FilterArguments<Params>,
  ): Promise<Item[]> {
    let { completeStr, items } = args;
    if (completeStr) {
      items = items.filter((c) =>
        containsSubsequence(c.abbr || c.word, completeStr)
      );
    }

    return Promise.resolve(items);
  }
  override params(): Params {
    return {};
  }
}
