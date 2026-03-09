<script setup lang="ts">
import mermaid from "mermaid";
import { nanoid } from "nanoid";

const props = defineProps<{
  value: string;
}>();

const colorMode = useColorMode();
const renderer = ref<HTMLDivElement | null>(null);
const renderError = ref("");

const mermaidTheme = computed(() => (colorMode.value === "dark" ? "dark" : "default"));

const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: mermaidTheme.value,
  });
};

const renderMermaid = async () => {
  if (!renderer.value) {
    return;
  }

  const mermaidText = props.value;

  if (!mermaidText.trim()) {
    renderer.value.innerHTML = "";
    renderError.value = "";
    return;
  }

  try {
    renderError.value = "";

    const { svg, bindFunctions } = await mermaid.render(`id-${nanoid(10)}`, mermaidText);
    if (!renderer.value) {
      return;
    }

    renderer.value.innerHTML = svg;
    bindFunctions?.(renderer.value);
  } catch (error) {
    if (!renderer.value) {
      return;
    }

    renderer.value.innerHTML = "";
    renderError.value = error instanceof Error ? error.message : String(error);
  }
};

onMounted(() => {
  initializeMermaid();

  watchDebounced(
    () => props.value,
    () => {
      void renderMermaid();
    },
    { flush: "post", immediate: true, debounce: 250, maxWait: 1000 },
  );

  watch(
    mermaidTheme,
    () => {
      initializeMermaid();
      void renderMermaid();
    },
    { flush: "post" },
  );
});
</script>

<template>
  <div>
    <div ref="renderer" class="mermaid-output" />
    <pre
      v-if="renderError"
      class="mt-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm leading-5 whitespace-pre-wrap text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200"
    >
      {{ renderError }}
    </pre>
  </div>
</template>

<style scoped lang="scss">
.mermaid-output {
  &:deep(svg) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
  }
}
</style>
