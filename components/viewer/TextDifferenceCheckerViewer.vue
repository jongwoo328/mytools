<script setup lang="ts">
import { Change } from "diff";
import { DiffType } from "@/types/textDiff";

defineProps<{
  changes: Change[];
  diffType: DiffType;
}>();
</script>

<template>
  <span v-for="(change, index) in changes" :key="`${index}${Math.random()}`" class="font-monospace-code">
    <ins
      :class="{ 'line-break': change.value === '\n', 'by-line': diffType === 'lines' }"
      style="white-space: pre"
      v-if="change.added"
    >
      <span>
        {{ change.value }}
      </span>
    </ins>
    <del
      :class="{ 'line-break': change.value === '\n', 'by-line': diffType === 'lines' }"
      style="white-space: pre"
      v-if="change.removed"
    >
      <span>
        {{ change.value }}
      </span>
    </del>
    <span style="white-space: pre" v-if="!change.added && !change.removed">{{ change.value }}</span>
  </span>
</template>

<style scoped lang="scss">
ins {
  background-color: #d3f9d8;
  text-decoration: none;

  span {
    background-color: #8ce99a;
  }
}

del {
  background-color: #ffe3e3;
  text-decoration: none;

  span {
    background-color: #ffa8a8;
  }
}

.line-break {
  width: 100%;
}

.by-line {
  display: block;
}
</style>
