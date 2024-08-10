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

const inputText = ref("");
const activeTabKey = ref(0);
const encodedText = computed(() => encodeURI(inputText.value));
const decodedText = computed(() => decodeURI(inputText.value));

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
        <Textarea v-model="inputText" class="prevent-auto-zoom d-block w-100" auto-resize />
        <Tabs :value="tabIndex" class="mt-4 tab-view">
          <TabList>
            <Tab :value="tab.value" v-for="tab in tabOptions" :key="tab.value">
              {{ tab.label }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="encoder">
              <div class="d-block w-100 converted-text p-2 font-monospace-code">
                <span>
                  {{ encodedText }}
                </span>
              </div>
            </TabPanel>
            <TabPanel value="decoder">
              <div class="d-block w-100 converted-text p-2 font-monospace-code">
                <span>
                  {{ decodedText }}
                </span>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div class="px-2">
          <Button @click="onClickCopy" class="w-100 d-block">
            {{ t("converter.url.copy_btn_label") }}
          </Button>
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
</style>
