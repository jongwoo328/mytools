<script lang="ts" setup>
import { html } from "@codemirror/lang-html";
import { ref } from "vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { t: $t } = useI18n();
const localePath = useLocalePath();

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: $t("title"),
      item: `https://tools.jongwoo.me${localePath("/")}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: $t("viewer.html.title"),
      item: `https://tools.jongwoo.me${localePath("/viewer/html")}`,
    },
  ],
}));

const htmlText = ref(
  "<style>" +
    "\n\tli {font-weight: bold;} #listNuxt3 {color: rgb(104, 217, 136);} #listVercel {color: rgb(0, 0, 0)}" +
    "\n</style>" +
    `\n\n<h1>${$t("viewer.html.example_html.title")}</h1>` +
    "\n<section>" +
    `\n\t<h2>${$t("viewer.html.example_html.sub_title_1")}</h2>` +
    "\n\t<p>" +
    `\n\t\t${$t("viewer.html.example_html.description_1")}` +
    `\n\t\t${$t("viewer.html.example_html.description_2")}` +
    "\n\t</p>" +
    `\n\t<h2>${$t("viewer.html.example_html.sub_title_2")}</h2>` +
    "\n\t<ul>" +
    '\n\t\t<li id="listNuxt3">' +
    `\n\t\t\t${$t("viewer.html.example_html.description_3")}` +
    "\n\t\t</li>" +
    '\n\t\t<li id="listVercel">' +
    `\n\t\t\t${$t("viewer.html.example_html.description_4")}` +
    "\n\t\t</li>" +
    "\n\t</ul>" +
    "\n</section>",
);
</script>

<template>
  <Head>
    <Title>{{ $t("viewer.html.head.title") }}</Title>
    <Meta name="description" :content="$t('viewer.html.head.description')" />
  </Head>
  <ToolPageLayout :title="$t('viewer.html.title')">
    <Card>
      <template #content>
        <div class="row m-0 w-100">
          <div class="col col-12 mb-3 px-0">
            <div class="html-view-wrap">
              <iframe class="w-100 h-100" :srcdoc="htmlText" />
            </div>
          </div>
          <div class="col col-12 viewer-code-section px-0 common-border-radius">
            <div class="h-100 html-input-wrap">
              <Codemirror
                :extensions="[html()]"
                v-model="htmlText"
                class="h-100 font-monospace-code prevent-auto-zoom"
              />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style lang="scss" scoped>
.html-view-wrap {
  height: 500px;
  border: 1px solid #adb5bd;
  border-radius: 3px;
}

.viewer-code-section {
  border: 1px solid #f1f3f5;
}

.html-input-wrap {
  background-color: #f8f9fa;
  overflow-y: auto;
}

.html-input::v-deep(.cm-editor) {
  height: 350px;
}

@media (min-width: 992px) {
  .html-view-wrap {
    height: 480px;
  }
  .html-input::v-deep(.cm-editor) {
    height: 400px;
  }
}
</style>
