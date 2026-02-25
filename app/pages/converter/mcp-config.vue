<script setup lang="ts">
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";
import PageHeading from "~/components/common/PageHeading.vue";
import type { EditorType } from "~~/lib/converter/mcp-config/formats";
import { createConverter } from "~~/lib/converter/mcp-config/converter";

const i18n = useI18n();
const { t } = i18n;
const { copyData } = useCopy();

const editorFormats = ref<{ label: string; value: EditorType }[]>([
  {
    value: "claude-code",
    label: "Claude Code",
  },
  {
    value: "vscode",
    label: "VS Code",
  },
  {
    value: "codex-cli",
    label: "Codex",
  },
  {
    value: "cursor",
    label: "Cursor",
  },
  {
    value: "opencode",
    label: "OpenCode",
  },
  {
    value: "gemini-cli",
    label: "Gemini CLI",
  },
  {
    value: "antigravity",
    label: "Antigravity",
  },
  {
    value: "claude-desktop",
    label: "Claude Desktop",
  },
]);

const source = ref<EditorType>("claude-code");
const target = ref<EditorType>("vscode");
const sourceInput = ref("");
const targetOutput = ref("");
const errorMessage = ref("");

const convertConfig = createConverter(i18n);
function convert() {
  try {
    const result = convertConfig(sourceInput.value, source.value, target.value);
    if (result.success) {
      targetOutput.value = result.output;
    } else {
      errorMessage.value = result.error;
    }
  } catch (err) {
    if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = String(err);
    }
  }
}

watch(sourceInput, () => {
  errorMessage.value = "";
});

function copyOutput() {
  copyData(targetOutput.value);
}
</script>

<template>
  <Head>
    <Title>{{ t("converter.mcp-config.head.title") }}</Title>
    <Meta name="description" :content="t('converter.mcp-config.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.mcp-config.title')" :description="t('converter.mcp-config.description')">
    <div class="flex gap-4 w-full mt-10">
      <Card class="w-full" :pt="{ header: { class: 'pt-4 px-4' } }">
        <template #header>
          <PageHeading :size="6" :level="2" weight="600">
            {{ t("converter.mcp-config.source_format_label") }}
          </PageHeading>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <Select
              class="self-end"
              :options="editorFormats"
              option-value="value"
              option-label="label"
              v-model="source"
            />
            <Textarea
              v-model="sourceInput"
              style="min-height: 200px"
              auto-resize
              class="font-monospace-code"
              :placeholder="t('converter.mcp-config.source_format_placeholder')"
            />
            <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
            <Button @click="convert">{{ t("converter.mcp-config.button.convert") }}</Button>
          </div>
        </template>
      </Card>
      <Card class="w-full" :pt="{ header: { class: 'pt-4 px-4' } }">
        <template #header>
          <PageHeading :size="6" :level="2" weight="600">
            {{ t("converter.mcp-config.target_format_label") }}
          </PageHeading>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between">
              <Select :options="editorFormats" option-value="value" option-label="label" v-model="target" />
              <Button severity="secondary" @click="copyOutput">{{ t("converter.mcp-config.button.copy") }}</Button>
            </div>
            <Textarea
              v-model="targetOutput"
              style="min-height: 200px"
              auto-resize
              disabled
              class="font-monospace-code"
              :placeholder="t('converter.mcp-config.target_format_placeholder')"
            />
          </div>
        </template>
      </Card>
    </div>
  </ToolPageLayout>
</template>

<style scoped lang="scss"></style>
