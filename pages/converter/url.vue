<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import { copyWithNotification } from "~/utils/copy";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

useJsonld(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools For Developer",
      item: "https://tools.jongwoo.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "URL Encoder, Decoder",
      item: "https://tools.jongwoo.me/converter/url",
    },
  ],
}));

const inputText = ref("");
const activeTabKey = ref(0);
const encodedText = computed(() => encodeURI(inputText.value));
const decodedText = computed(() => decodeURI(inputText.value));

const onClickCopy = () => {
  if (activeTabKey.value === 0) {
    copyWithNotification(encodedText.value);
  } else {
    copyWithNotification(decodedText.value);
  }
};
</script>

<template>
  <Head>
    <Title>URL Encoder / Decoder</Title>
    <Meta name="description" content="A simple URL encoder and decoder." />
  </Head>
  <ToolPageLayout title="URL Encoder / Decoder" description="Encode or Decode URL">
    <Card>
      <template #content>
        <PageHeading :size="6" :level="2" weight="600">Input</PageHeading>
        <Textarea v-model="inputText" class="prevent-auto-zoom d-block w-100" auto-resize />
        <TabView v-model:active-index="activeTabKey" class="mt-3 tab-view">
          <TabPanel header="Encoder">
            <div class="d-block w-100 converted-text p-2 font-monospace-code">
              <span>
                {{ encodedText }}
              </span>
            </div>
          </TabPanel>
          <TabPanel header="Decoder">
            <div class="d-block w-100 converted-text p-2 font-monospace-code">
              <span>
                {{ decodedText }}
              </span>
            </div>
          </TabPanel>
        </TabView>
        <div class="px-2">
          <Button @click="onClickCopy" class="w-100 d-block">Copy</Button>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.converted-text {
  background-color: #f1f3f5;
  min-height: 35px;
  border-radius: 3px;
  word-wrap: break-word;
}

.tab-view {
  &::v-deep(.p-tabview-panels) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
