<script setup lang="ts">
import { type AvailableTool } from "@/types/Tool";
import PageHeading from "../common/PageHeading.vue";
import { useRouter } from "vue-router";
import type { CardPassThroughOptions } from "primevue/card";

const props = defineProps<{
  tool: AvailableTool;
}>();

const router = useRouter();
const onClickItem = () => {
  router.push(props.tool.router);
};
const cardPassThrough: CardPassThroughOptions = {
  root: {
    style: {
      boxShadow: "none",
    },
  },
};
</script>

<template>
  <Card @click="onClickItem" class="tool-item" :pt="cardPassThrough">
    <template #title>
      <RouterLink class="text-decoration-none text-black" :to="tool.router">
        <PageHeading weight="600" class="m-0" :level="2" :size="7">
          {{ tool.title }}
        </PageHeading>
      </RouterLink>
    </template>
    <template #content>
      <p class="mb-2" style="min-height: 44px">
        {{ props.tool.description }}
      </p>
    </template>
    <template #footer>
      <Tag :style="{ backgroundColor: tag.color }" v-for="tag in props.tool.tags" :key="tag.id">
        {{ tag.name }}
      </Tag>
    </template>
  </Card>
</template>

<style lang="scss">
.tool-item {
  cursor: pointer;
  border: 1px solid darkgray;

  &:hover {
    border-color: #3b82f6;
  }
}
</style>
