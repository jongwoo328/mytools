<script setup lang="ts">
import PageHeading from "~/components/common/PageHeading.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { copyData } = useCopy();
const { t } = useI18n();
const localePath = useLocalePath();

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
      name: "URL Encoder, Decoder",
      item: `https://tools.jongwoo.me${localePath("/converter/url")}`,
    },
  ],
}));

const tabIndex = ref("encoder");
const tabOptions = [
  { label: t("converter.url.convert_type.encoder"), value: "encoder" },
  { label: t("converter.url.convert_type.decoder"), value: "decoder" },
];

const usePreserveStructureEncoding = ref(false);
const usePreserveStructureEncodingTooltip = computed(() => t("converter.url.options.use_preserve_structure.tooltip"));

const inputText = ref("");
const activeTabKey = ref(0);
const encodedText = computed(() => {
  if (usePreserveStructureEncoding.value) {
    return encodeURI(inputText.value);
  }
  return encodeURIComponent(inputText.value);
});
const decodedText = computed(() => {
  if (usePreserveStructureEncoding.value) {
    return decodeURI(inputText.value);
  }
  return decodeURIComponent(inputText.value);
});

const onClickCopy = () => {
  if (activeTabKey.value === 0) {
    copyData(encodedText.value);
  } else {
    copyData(decodedText.value);
  }
};
</script>

<template>
  <Head>
    <Title>{{ t("converter.url.head.title") }}</Title>
    <Meta name="description" :content="t('converter.url.head.description')" />
  </Head>
  <ToolPageLayout :title="t('converter.url.title')" :description="t('converter.url.description')">
    <Card>
      <template #content>
        <PageHeading :size="6" :level="2" weight="600">
          {{ t("converter.url.text_input_label") }}
        </PageHeading>
        <div class="flex justify-end mb-2 gap-1 items-center">
          <Checkbox input-id="useEncodeURI" binary v-model="usePreserveStructureEncoding" />
          <label for="useEncodeURI">{{ t("converter.url.options.use_preserve_structure.label") }}</label>
          <i v-tooltip.top="usePreserveStructureEncodingTooltip" class="pi pi-info-circle" />
        </div>
        <Textarea v-model="inputText" class="prevent-auto-zoom block w-full" auto-resize />
        <Tabs :value="tabIndex" class="mt-4 tab-view">
          <TabList>
            <Tab :value="tab.value" v-for="tab in tabOptions" :key="tab.value">
              {{ tab.label }}
            </Tab>
          </TabList>
          <TabPanels class="px-0">
            <TabPanel value="encoder">
              <div class="block w-full converted-text font-monospace-code">
                <span>
                  {{ encodedText }}
                </span>
              </div>
            </TabPanel>
            <TabPanel value="decoder">
              <div class="block w-full converted-text font-monospace-code">
                <span>
                  {{ decodedText }}
                </span>
              </div>
            </TabPanel>
            <Button @click="onClickCopy" class="w-full block mt-3">
              {{ t("converter.url.copy_btn_label") }}
            </Button>
          </TabPanels>
        </Tabs>
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

.dark-mode .converted-text {
  background-color: #212529;
}
</style>
