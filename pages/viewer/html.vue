<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import { html } from "@codemirror/lang-html";
import { ref } from "vue";

const htmlText = ref(
  "<style>" +
    "\n\tli {font-weight: bold;} #listVue3 a {color: #67b686;} #listAWSAmplify a {color: rgb(255, 153, 0)}" +
    "\n</style>" +
    "\n\n<h1>My Tools webpage</h1>" +
    "\n<section>" +
    "\n\t<h2>Description</h2>" +
    "\n\t<p>" +
    "\n\t\tThis project aims to collect useful and frequently used functions in one place, for my personal use." +
    "\n\t\tHowever, it is open for others to use as well." +
    "\n\t</p>" +
    "\n\t<h2>Project is built with</h2>" +
    "\n\t<ul>" +
    '\n\t\t<li id="listVue3">' +
    '\n\t\t\t<a target="_blank" href="https://vuejs.org/">Vue 3</a>' +
    "\n\t\t</li>" +
    '\n\t\t<li id="listAWSAmplify">' +
    '\n\t\t\t<a target="_blank" href="https://aws.amazon.com/ko/amplify/">AWS Amplify</a>' +
    "\n\t\t</li>" +
    "\n\t</ul>" +
    "\n</section>"
);
</script>

<template>
  <Head>
    <Title>My Tools : HTML Viewer</Title>
  </Head>
  <PageTitle title="HTML Viewer" />
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
              class="h-100 html-input prevent-auto-zoom"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.html-input {
  &::v-deep(.cm-line) {
    font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono, monospace;
  }
}
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
