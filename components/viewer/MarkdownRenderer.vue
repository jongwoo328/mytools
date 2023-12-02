<script setup lang="ts">
import MarkdownIt from "markdown-it";
import MarkdownItHighlightJs from "markdown-it-highlightjs";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkDownItMathjax3 from "markdown-it-mathjax3";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.min.css";

const props = defineProps({
  markdown: { type: String, required: true },
  html: { type: Boolean, required: false, default: false },
  linkify: { type: Boolean, required: false, default: true },
  strictCommonMark: { type: Boolean, required: false, default: false },
  breaks: { type: Boolean, required: false, default: false },
});

const md = computed(() => {
  return new MarkdownIt(props.strictCommonMark ? "commonmark" : "default", {
    html: props.html,
    linkify: props.linkify,
    breaks: props.breaks,
  })
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote)
    .use(MarkdownItHighlightJs, {
      hljs,
      auto: false,
    })
    .use(MarkDownItMathjax3);
});

const renderedHtml = computed(() => md.value.render(props.markdown));
</script>

<template>
  <div id="renderedMarkdown" class="p-1 font-monospace-only-code" v-html="renderedHtml" />
</template>

<style scoped lang="scss">
#renderedMarkdown {
  &:deep(img) {
    max-width: 100%;
  }

  &:deep(table) {
    & {
      margin-bottom: 1rem;
      width: 100%;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    th {
      text-align: left;
      background-color: #f2f2f2;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }
  }

  &:deep(blockquote) {
    & {
      margin: 20px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-left: 5px solid #ccc;
      color: #555;
      font-style: italic;
    }

    /* 중첩된 blockquote에 대한 스타일 */
    & blockquote,
    blockquote blockquote {
      background-color: #e9e9e9;
      border-left-color: #bbb;
    }

    /* blockquote 내부의 텍스트 스타일 */
    blockquote p {
      margin: 0;
    }
  }

  &:deep {
    /* 헤딩 공통 스타일 */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #333;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 2.5em;
      font-weight: bold;
    }

    h2 {
      font-size: 2em;
    }

    h3 {
      font-size: 1.75em;
    }

    h4 {
      font-size: 1.5em;
      color: #555;
    }

    h5 {
      font-size: 1.25em;
      color: #777;
    }

    h6 {
      font-size: 1em;
      color: #999;
    }
  }
}
</style>
