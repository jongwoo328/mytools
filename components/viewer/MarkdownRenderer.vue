<script setup lang="ts">
import MarkdownIt from "markdown-it";
import MarkdownItHighlightJs from "markdown-it-highlightjs";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkDownItMathjax3 from "markdown-it-mathjax3";
import MarkdownItTaskLists from "markdown-it-task-lists";
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
    .use(MarkdownItTaskLists, { enabled: true, label: true })
    .use(MarkdownItHighlightJs, {
      hljs,
      auto: false,
    })
    .use(MarkDownItMathjax3);
});

const updateMarkdownCheckbox: ((idx: number, checked: boolean) => void) | undefined = inject("updateMarkdownCheckbox");
const renderedHtml = computed(() => md.value.render(props.markdown));

const renderResult = ref();
const addCheckboxEventListener = () => {
  renderResult.value.querySelectorAll('input[type="checkbox"]').forEach((checkbox, idx) => {
    checkbox.addEventListener("change", function () {
      if (!updateMarkdownCheckbox) {
        return;
      }
      updateMarkdownCheckbox(idx, checkbox.checked);
    });
  });
};

watch(renderedHtml, async () => {
  if (!renderResult.value) {
    return;
  }
  await nextTick();
  addCheckboxEventListener();
});

onMounted(() => {
  addCheckboxEventListener();
});
</script>

<template>
  <div id="renderedMarkdown" class="p-1 font-monospace-only-code" v-html="renderedHtml" ref="renderResult" />
</template>

<style scoped lang="scss">
#renderedMarkdown {
  :deep(img) {
    max-width: 100%;
  }

  :deep(table) {
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

  :deep(blockquote) {
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
    & p,
    & blockquote p {
      margin: 0;
    }
  }

  :deep(h1, h2, h3, h4, h5, h6) {
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  :deep(h1) {
    font-size: 2.5em;
    font-weight: bold;
  }

  :deep(h2) {
    font-size: 2em;
  }

  :deep(h3) {
    font-size: 1.75em;
  }

  :deep(h4) {
    font-size: 1.5em;
    color: #555;
  }

  :deep(h5) {
    font-size: 1.25em;
    color: #777;
  }

  :deep(h6) {
    font-size: 1em;
    color: #999;
  }

  :deep(.task-list-item) {
    list-style-type: none;

    input[type="checkbox"] {
      margin-left: -1.5rem;
    }

    label {
      margin-left: 0.5rem;
    }
  }
}

.dark-mode {
  #renderedMarkdown {
    :deep(table) {
      th,
      td {
        border-color: #333;
      }

      th {
        background-color: #333;
        color: #fff;
      }

      tr:nth-child(even) {
        background-color: #333;
      }

      tr:hover {
        background-color: #444;
      }
    }

    :deep(blockquote) {
      border-left-color: #666;
      color: #444;

      span,
      p {
        color: #444;
      }

      & blockquote,
      blockquote blockquote {
        background-color: #ddd;
        border-left-color: #777;
      }
    }

    :deep(h1, h2, h3, h4, h5, h6) {
      color: #ddd;
    }
  }
}
</style>
