<script setup lang="ts">
import { AvailableTool } from "@/types/Tool";
import PageHeading from "../common/PageHeading.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  tool: AvailableTool;
}>();

const router = useRouter();
const onClickButton = () => {
  router.push(props.tool.router);
};
</script>

<template>
  <Card>
    <template #title>
      <RouterLink class="text-decoration-none text-black" :to="tool.router">
        <PageHeading weight="600" class="m-0" :level="3" :size="7">
          {{ tool.title }}
        </PageHeading>
      </RouterLink>
    </template>
    <template #content>
      <p class="mb-2" style="min-height: 44px">
        {{ props.tool.description }}
      </p>
      <div>
        <Tag :style="{ backgroundColor: tag.color }" v-for="tag in props.tool.tags" :key="tag.name">
          {{ tag.name }}
        </Tag>
      </div>
      <Button @click="onClickButton" class="w-100 d-block mt-3"> Start </Button>
    </template>
  </Card>
</template>
