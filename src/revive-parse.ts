import breaks from 'remark-breaks';
import footnotes from 'remark-footnotes';
import frontmatter from 'remark-frontmatter';
import math from 'remark-math';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import unified from 'unified';
import { mdast as attr } from './plugins/attr';
import { mdast as code } from './plugins/code';
import { mdast as fencedBlock } from './plugins/fenced-block';
import { mdast as metadata } from './plugins/metadata';
import { mdast as ruby } from './plugins/ruby';
import { mdast as section } from './plugins/section';
import { mdast as toc } from './plugins/toc';
import { inspect } from './utils/debug';

/**
 * Options for Markdown conversion.
 */
export interface MarkdownOptions {
  /** Converts line breaks to `<br>`. */
  autoLineBreaks: boolean;
}

/**
 * Create MDAST parsers.
 * @param options Options.
 * @returns Parsers.
 */
export const reviveParse = (options: MarkdownOptions) => {
  const results = [
    [markdown, { gfm: true, commonmark: true }],
    fencedBlock,
    ruby,
    [footnotes, { inlineNotes: true }],
    math,
    attr,
    slug,
    section,
    code,
    toc,
    frontmatter,
    metadata,
    inspect('mdast'),
  ] as unified.PluggableList<unified.Settings>;

  if (options.autoLineBreaks) {
    // Line breaks are processed immediately after ruby
    results.splice(3, 0, breaks);
  }

  return results;
};
