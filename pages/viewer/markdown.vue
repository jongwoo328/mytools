<script setup lang="ts">
import MarkdownRenderer from "~/components/viewer/MarkdownRenderer.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import SplitterPanel from "primevue/splitterpanel";
import Textarea from "primevue/textarea";

const input = ref(`# 제목1

## 제목2

### 제목3

#### 제목4

##### 제목5

###### 제목6

## 텍스트 스타일

**볼드체**

__볼드체__

*이탤릭체*

*이탤릭체*

~~취소선~~

## 수평선

___

---

***

## 목록

순서없는 목록:

- 항목 1
- 항목 2
  - 하위 항목 2-1
  - 하위 항목 2-2

순서있는 목록:

1. 첫 번째 항목
2. 두 번째 항목
   1. 하위 항목 2-1
   2. 하위 항목 2-2

## 링크

[Google 홈페이지](https://www.google.com)

## 이미지

![이미지 대체 텍스트](https://via.placeholder.com/150)

## 코드

\`인라인 코드\` 예시입니다.

코드 블록:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## 표

| 헤더 1   |  헤더 2  |   헤더 3 |
| -------- | :------: | -------: |
| 데이터 1 | 데이터 2 | 데이터 3 |
| 데이터 4 | 데이터 5 | 데이터 6 |


## 인용문

> 이것은 인용문입니다.
> > 중첩 인용문입니다.

## 수식
TeX의 math mode를 지원합니다

$
\\begin{align}
\\vec{\\nabla} \\cdot \\vec{E} \\quad &=\\quad\\frac{\\rho}{\\epsilon_0} &&\\text{Gauss's Law} \\\\
\\vec{\\nabla} \\cdot \\vec{B} \\quad &=\\quad 0 &&\\text{Gauss's Law for Magnetism}\\\\
\\vec{\\nabla} \\times \\vec{E} \\quad &=\\hspace{10pt}-\\frac{\\partial{\\vec{B}}}{\\partial{t}}&&\\text{Faraday's Law of Induction} \\\\
\\vec{\\nabla} \\times \\vec{B} \\quad &=\\quad \\mu_0\\left( \\epsilon_0\\frac{\\partial{\\vec{E}}}{\\partial{t}}+\\vec{J}\\right) &&\\text{Ampere's Circuital Law}
\\end{align}
$
`);
const layout = ref<"horizontal" | "vertical">("horizontal");
const layoutOptions = [
  { icon: "pi pi-arrows-v", value: "vertical" },
  { icon: "pi pi-arrows-h", value: "horizontal" },
];

const useStrictCommonMark = ref(false);
const useStrictCommonMarkTooltip = computed(() => "Only use strict CommonMark specs");
const useHtml = ref(true);
const useHtmlTooltip = computed(() => "Enable HTML tags in source");
const useLinkify = ref(true);
const useLinkifyTooltip = computed(() => "Autoconvert URL-like text to links");
const useBreaks = ref(false);
const useBreaksTooltip = computed(() => "convert \\n in paragraphs into <br>");

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
</script>

<template>
  <ToolPageLayout title="Markdown Viewer">
    <Card>
      <template #content>
        <Panel toggleable>
          <template #header>Configuration</template>
          <template #default>
            <div class="row">
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for=""> Use Strict CommonMark </label>
                  <i v-tooltip.top="useStrictCommonMarkTooltip" class="pi pi-question-circle align-self-center"></i>
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch class="align-self-center" v-model:model-value="useStrictCommonMark" />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for=""> Use HTML </label>
                  <i v-tooltip.top="useHtmlTooltip" class="pi pi-question-circle align-self-center"></i>
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch class="align-self-center" v-model:model-value="useHtml" />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for=""> Use Linkify </label>
                  <i v-tooltip.top="useLinkifyTooltip" class="pi pi-question-circle align-self-center"></i>
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch class="align-self-center" v-model:model-value="useLinkify" />
                </div>
              </div>
              <div class="col col-12 col-lg-6 col-xxl-4 mt-2 row">
                <div class="col col-6 align-self-center d-flex gap-2">
                  <label for=""> Use Break </label>
                  <i v-tooltip.top="useBreaksTooltip" class="pi pi-question-circle align-self-center"></i>
                </div>
                <div class="col col-6 d-flex justify-content-center">
                  <InputSwitch class="align-self-center" v-model:model-value="useBreaks" />
                </div>
              </div>
            </div>
          </template>
        </Panel>
        <div class="d-flex justify-content-end my-2">
          <SelectButton option-value="value" :options="layoutOptions" v-model="layout">
            <template #option="slotProps">
              <i :class="slotProps.option.icon"></i>
            </template>
          </SelectButton>
        </div>
        <Splitter style="min-height: 600px; height: 800px" :layout="layout">
          <SplitterPanel class="d-flex flex-column">
            <Textarea
              ref="markdownInput"
              @scroll="onScrollTextArea"
              style="resize: none"
              class="flex-grow-1"
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

<style scoped lang="scss"></style>
