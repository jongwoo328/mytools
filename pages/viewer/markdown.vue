<script setup lang="ts">
import MarkdownRenderer from "~/components/viewer/MarkdownRenderer.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import SplitterPanel from "primevue/splitterpanel";
import Textarea from "primevue/textarea";

const { copyData } = useCopy();
const { t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: t("viewer.markdown.title"),
      item: `https://tools.jongwoo.me${localePath("/viewer/markdown")}`,
    },
  ],
}));

const input = ref(`# ${t("viewer.markdown.example_input.heading1")}

## ${t("viewer.markdown.example_input.heading2")}

### ${t("viewer.markdown.example_input.heading3")}

#### ${t("viewer.markdown.example_input.heading4")}

##### ${t("viewer.markdown.example_input.heading5")}

###### ${t("viewer.markdown.example_input.heading6")}

## ${t("viewer.markdown.example_input.text_style.title")}

**${t("viewer.markdown.example_input.text_style.bold")}**

__${t("viewer.markdown.example_input.text_style.bold")}__

*${t("viewer.markdown.example_input.text_style.italic")}*

_${t("viewer.markdown.example_input.text_style.italic")}_

~~${t("viewer.markdown.example_input.text_style.strikethrough")}~~

## ${t("viewer.markdown.example_input.horizontal_rule")}

___

---

***

## ${t("viewer.markdown.example_input.list.title")}

### ${t("viewer.markdown.example_input.list.unordered.text")}

- ${t("viewer.markdown.example_input.list.unordered.item1")}
- ${t("viewer.markdown.example_input.list.unordered.item2")}
  - ${t("viewer.markdown.example_input.list.unordered.sub_item2_1")}
  - ${t("viewer.markdown.example_input.list.unordered.sub_item2_2")}

### ${t("viewer.markdown.example_input.list.ordered.text")}

1. ${t("viewer.markdown.example_input.list.ordered.item1")}
2. ${t("viewer.markdown.example_input.list.ordered.item2")}
   1. ${t("viewer.markdown.example_input.list.ordered.sub_item2_1")}
   2. ${t("viewer.markdown.example_input.list.ordered.sub_item2_2")}

## ${t("viewer.markdown.example_input.blockquote.title")}

> ${t("viewer.markdown.example_input.blockquote.text1")}
>> ${t("viewer.markdown.example_input.blockquote.text2")}

## ${t("viewer.markdown.example_input.link.title")}

[${t("viewer.markdown.example_input.link.text")}](https://github.com/jongwoo328/mytools)

## ${t("viewer.markdown.example_input.image.title")}

![${t("viewer.markdown.example_input.image.text")}](https://via.placeholder.com/150)

## ${t("viewer.markdown.example_input.code.title")}

${t("viewer.markdown.example_input.code.text_inline_code")}

${t("viewer.markdown.example_input.code.text_code_block")}:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## ${t("viewer.markdown.example_input.table.title")}
> ${t("viewer.markdown.example_input.table.blockquote")}

|  ${t("viewer.markdown.example_input.table.header1")}  |  ${t("viewer.markdown.example_input.table.header2")}  |  ${t(
  "viewer.markdown.example_input.table.header3",
)}  |
| -------- | :------: | -------: |
| ${t("viewer.markdown.example_input.table.data1")} | ${t("viewer.markdown.example_input.table.data2")} | ${t(
  "viewer.markdown.example_input.table.data3",
)} |
| ${t("viewer.markdown.example_input.table.data4")} | ${t("viewer.markdown.example_input.table.data5")} | ${t(
  "viewer.markdown.example_input.table.data6",
)} |

## ${t("viewer.markdown.example_input.anchor.title")}
[${t("viewer.markdown.example_input.anchor.text")}](#${t("viewer.markdown.example_input.anchor.anchor")})

## ${t("viewer.markdown.example_input.footnote.title")}
> ${t("viewer.markdown.example_input.footnote.blockquote")}

${t("viewer.markdown.example_input.footnote.text1")} [^${t("viewer.markdown.example_input.footnote.text1_ref")}]

${t("viewer.markdown.example_input.footnote.text2")} [^${t("viewer.markdown.example_input.footnote.text2_ref")}]

${t("viewer.markdown.example_input.footnote.text3")}^[${t("viewer.markdown.example_input.footnote.text3_ref")}]

[^${t("viewer.markdown.example_input.footnote.text1_ref")}]: ${t(
  "viewer.markdown.example_input.footnote.text1_ref_text",
)}
[^${t("viewer.markdown.example_input.footnote.text2_ref")}]: ${t(
  "viewer.markdown.example_input.footnote.text2_ref_text",
)}

## ${t("viewer.markdown.example_input.formula.title")}
> ${t("viewer.markdown.example_input.formula.blockquote")}

${t("viewer.markdown.example_input.formula.text")}

$
\\begin{align}
\\vec{\\nabla} \\cdot \\vec{E} \\quad &=\\quad\\frac{\\rho}{\\epsilon_0} &&\\text{Gauss's Law} \\\\
\\vec{\\nabla} \\cdot \\vec{B} \\quad &=\\quad 0 &&\\text{Gauss's Law for Magnetism}\\\\
\\vec{\\nabla} \\times \\vec{E} \\quad &=\\hspace{10pt}-\\frac{\\partial{\\vec{B}}}{\\partial{t}}&&\\text{Faraday's Law of Induction} \\\\
\\vec{\\nabla} \\times \\vec{B} \\quad &=\\quad \\mu_0\\left( \\epsilon_0\\frac{\\partial{\\vec{E}}}{\\partial{t}}+\\vec{J}\\right) &&\\text{Ampere's Circuital Law}
\\end{align}
$`);
const layout = ref<"horizontal" | "vertical">("horizontal");
const layoutOptions = [
  { icon: "pi pi-arrows-v", value: "vertical" },
  { icon: "pi pi-arrows-h", value: "horizontal" },
];

const useStrictCommonMark = ref(false);
const useStrictCommonMarkTooltip = computed(() => t("viewer.markdown.options.use_strict_commonmark_tooltip"));
const useHtml = ref(true);
const useHtmlTooltip = computed(() => t("viewer.markdown.options.use_html_tooltip"));
const useLinkify = ref(true);
const useLinkifyTooltip = computed(() => t("viewer.markdown.options.use_linkify_tooltip"));
const useBreaks = ref(false);
const useBreaksTooltip = computed(() => t("viewer.markdown.options.use_breaks_tooltip"));

const renderedMarkdownPanel = ref();
const markdownInput = ref();

const onScrollTextArea = () => {
  if (!renderedMarkdownPanel.value?.$el || !markdownInput.value?.$el) {
    return;
  }

  renderedMarkdownPanel.value.$el.scrollTop = markdownInput.value.$el.scrollTop;
};
const onScrollPanel = () => {
  if (renderedMarkdownPanel.value === null || markdownInput.value === null) {
    return;
  }
  markdownInput.value.$el.scrollTop = renderedMarkdownPanel.value.$el.scrollTop;
};

function onMarkdownInputKeydown(e: KeyboardEvent) {
  if (e.key == "Tab") {
    const textarea = e.target as HTMLTextAreaElement;
    e.preventDefault();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (!e.shiftKey) {
      textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
    }

    textarea.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
  }
}

const onClickCopy = async () => {
  await copyData(input.value);
};
</script>

<template>
  <Head>
    <Title>{{ t("viewer.markdown.head.title") }}</Title>
    <Meta name="description" :content="t('viewer.markdown.head.description')" />
  </Head>
  <ToolPageLayout :title="t('viewer.markdown.title')">
    <Card>
      <template #content>
        <Panel toggleable>
          <template #header>
            {{ t("viewer.markdown.options.label") }}
          </template>
          <template #default>
            <div class="row">
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for="useStrictCommonMark">
                    {{ t("viewer.markdown.options.use_strict_commonmark") }}
                  </label>
                  <i v-tooltip.top="useStrictCommonMarkTooltip" class="pi pi-question-circle align-self-center"></i>
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch
                    input-id="useStrictCommonMark"
                    class="align-self-center"
                    v-model:model-value="useStrictCommonMark"
                  />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for="useHtml">
                    {{ t("viewer.markdown.options.use_html") }}
                  </label>
                  <i v-tooltip.top="useHtmlTooltip" class="pi pi-question-circle align-self-center" />
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch input-id="useHtml" class="align-self-center" v-model:model-value="useHtml" />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for="useLinkify">
                    {{ t("viewer.markdown.options.use_linkify") }}
                  </label>
                  <i v-tooltip.top="useLinkifyTooltip" class="pi pi-question-circle align-self-center" />
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch input-id="useLinkify" class="align-self-center" v-model:model-value="useLinkify" />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for="useBreaks">
                    {{ t("viewer.markdown.options.use_breaks") }}
                  </label>
                  <i v-tooltip.top="useBreaksTooltip" class="pi pi-question-circle align-self-center" />
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch input-id="useBreaks" class="align-self-center" v-model:model-value="useBreaks" />
                </div>
              </div>
            </div>
          </template>
        </Panel>
        <div class="d-flex justify-content-between my-2">
          <Button icon="pi pi-copy" size="small" text @click="onClickCopy" :label="t('viewer.markdown.button.copy')" />
          <SelectButton option-value="value" :options="layoutOptions" v-model="layout">
            <template #option="slotProps">
              <i :class="slotProps.option.icon" />
            </template>
          </SelectButton>
        </div>
        <Splitter id="markdown-viewer" :layout="layout">
          <SplitterPanel class="d-flex flex-column">
            <Textarea
              ref="markdownInput"
              @scroll="onScrollTextArea"
              style="resize: none"
              class="flex-grow-1 prevent-auto-zoom"
              :auto-resize="false"
              :autofocus="false"
              v-model="input"
              @keydown="onMarkdownInputKeydown"
            />
          </SplitterPanel>
          <SplitterPanel class="overflow-auto" ref="renderedMarkdownPanel" @scroll="onScrollPanel">
            <MarkdownRenderer
              :html="useHtml"
              :linkify="useLinkify"
              :strict-common-mark="useStrictCommonMark"
              :markdown="input"
              :breaks="useBreaks"
              style="min-height: 100px"
            />
          </SplitterPanel>
        </Splitter>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
#markdown-viewer {
  height: max(800px, 70vh);
}
</style>
