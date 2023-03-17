<script lang="ts" setup>
import PageTitle from "@/components/common/PageTitle.vue";
import { html } from "@codemirror/lang-html";
import { ref } from "vue";

const htmlText = ref(
  "<style>" +
    "\n\tli {font-weight: bold;} #listVue3 a {color: #67b686;} #listCloudFront a {color: #ff9900}" +
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
    '\n\t\t\t<a href="https://vuejs.org/">Vue 3</a>' +
    "\n\t\t</li>" +
    '\n\t\t<li id="listCloudFront">' +
    '\n\t\t\t<a href="https://aws.amazon.com/ko/cloudfront/">AWS CloudFront</a>' +
    "\n\t\t</li>" +
    "\n\t</ul>" +
    "\n</section>"
);
</script>

<template>
  <PageTitle title="HTML Viewer" />
  <ACard>
    <ARow>
      <ACol :span="24" class="mb-1">
        <div class="html-view-wrap">
          <iframe class="w-100 h-100" :srcdoc="htmlText" />
        </div>
      </ACol>
      <ACol class="viewer-code-section" :span="24">
        <div class="h-100 html-input-wrap">
          <Codemirror
            :extensions="[html()]"
            v-model="htmlText"
            class="h-100 html-input"
          />
        </div>
      </ACol>
    </ARow>
  </ACard>
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
  height: 300px;
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
