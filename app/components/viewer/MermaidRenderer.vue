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

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: mermaidTheme.value,
    });

    const { svg, bindFunctions } = await mermaid.render(nanoid(10), mermaidText);
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
  watch(
    [() => props.value, mermaidTheme],
    () => {
      void renderMermaid();
    },
    { flush: "post", immediate: true },
  );
});
</script>

<template>
  <div>
    <div ref="renderer" class="mermaid-output" />
    <pre v-if="renderError" class="mermaid-error">{{ renderError }}</pre>
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

.mermaid-error {
  margin-top: 0.5rem;
  border: 1px solid #fecdd3;
  border-radius: 0.375rem;
  padding: 0.75rem;
  background-color: #fff1f2;
  color: #be123c;
  font-size: 0.875rem;
  line-height: 1.25rem;
  white-space: pre-wrap;
}

.dark-mode {
  .mermaid-error {
    border-color: #9f1239;
    background-color: #3f1d2e;
    color: #fecdd3;
  }
}
</style>
