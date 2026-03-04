<script setup lang="ts">
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import MermaidRenderer from "~/components/viewer/MermaidRenderer.vue";
import { Codemirror } from "vue-codemirror";
import { mermaid } from "codemirror-lang-mermaid";

const { t } = useI18n();
const localePath = useLocalePath();
const { codemirrorTheme } = useCodeMirror();
const mermaidReferenceUrl = "https://mermaid.js.org/intro/";

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
      name: t("viewer.mermaid.title"),
      item: `https://tools.jongwoo.me${localePath("/viewer/mermaid")}`,
    },
  ],
}));

const mermaidText = ref(`flowchart TD
  Start([${t("viewer.mermaid.example_input.start")}]) --> Input[${t("viewer.mermaid.example_input.input")}]
  Input --> Render{${t("viewer.mermaid.example_input.render_condition")}}
  Render -->|${t("viewer.mermaid.example_input.success")}| Preview[${t("viewer.mermaid.example_input.preview")}]
  Render -->|${t("viewer.mermaid.example_input.fail")}| Error[${t("viewer.mermaid.example_input.error")}]
  Preview --> End([${t("viewer.mermaid.example_input.end")}])
  Error --> Input`);
</script>

<template>
  <Head>
    <Title>{{ t("viewer.mermaid.head.title") }}</Title>
    <Meta name="description" :content="t('viewer.mermaid.head.description')" />
  </Head>
  <ToolPageLayout :title="t('viewer.mermaid.title')" :description="t('viewer.mermaid.description')">
    <Card>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex justify-end">
            <NuxtLink
              :to="mermaidReferenceUrl"
              external
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'inline-flex items-center gap-1 text-sm font-medium text-blue-600',
                'hover:text-blue-700 hover:underline',
              ]"
            >
              {{ t("viewer.mermaid.reference.link_label") }}
              <i class="pi pi-external-link text-xs" />
            </NuxtLink>
          </div>
          <div class="w-full border-gray-300 dark:border-gray-800 border rounded-lg p-4">
            <MermaidRenderer :value="mermaidText" />
          </div>
          <div class="border-gray-300 dark:border-gray-800 border">
            <Codemirror :extensions="[mermaid(), codemirrorTheme]" v-model="mermaidText" class="font-monospace-code" />
          </div>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>
