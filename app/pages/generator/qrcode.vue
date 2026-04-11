<script setup lang="ts">
import QRCode from "qrcode";
import PageHeading from "~/components/common/PageHeading.vue";
import ToolPageLayout from "~/components/common/ToolPageLayout.vue";

const { copyImage } = useCopy();
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
      name: t("generator.qrcode.title"),
      item: `https://tools.jongwoo.me${localePath("/generator/qrcode")}`,
    },
  ],
}));

const inputText = ref("");
const qrSize = ref(256);
const errorCorrectionLevel = ref("M");
const foregroundColor = ref("000000");
const backgroundColor = ref("ffffff");
const qrDataUrl = ref("");

const sizeOptions = [
  { label: "128 x 128", value: 128 },
  { label: "256 x 256", value: 256 },
  { label: "512 x 512", value: 512 },
  { label: "1024 x 1024", value: 1024 },
];

const errorCorrectionOptions = computed(() => [
  { label: t("generator.qrcode.options.error_correction.levels.low"), value: "L" },
  { label: t("generator.qrcode.options.error_correction.levels.medium"), value: "M" },
  { label: t("generator.qrcode.options.error_correction.levels.quartile"), value: "Q" },
  { label: t("generator.qrcode.options.error_correction.levels.high"), value: "H" },
]);

const generateQrCode = async () => {
  if (!inputText.value) {
    qrDataUrl.value = "";
    return;
  }
  try {
    qrDataUrl.value = await QRCode.toDataURL(inputText.value, {
      width: qrSize.value,
      errorCorrectionLevel: errorCorrectionLevel.value as "L" | "M" | "Q" | "H",
      color: {
        dark: `#${foregroundColor.value}`,
        light: `#${backgroundColor.value}`,
      },
      margin: 2,
    });
  } catch {
    qrDataUrl.value = "";
  }
};

watch([inputText, qrSize, errorCorrectionLevel, foregroundColor, backgroundColor], generateQrCode);

const onClickDownload = () => {
  if (!qrDataUrl.value) return;
  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = qrDataUrl.value;
  link.click();
};

const onClickCopy = () => {
  if (!qrDataUrl.value) return;
  copyImage(qrDataUrl.value);
};
</script>

<template>
  <Head>
    <Title>{{ t("generator.qrcode.head.title") }}</Title>
    <Meta name="description" :content="t('generator.qrcode.head.description')" />
  </Head>
  <ToolPageLayout :title="t('generator.qrcode.title')" :description="t('generator.qrcode.description')">
    <Card>
      <template #content>
        <PageHeading :size="6" :level="2" weight="600">
          {{ t("generator.qrcode.text_input_label") }}
        </PageHeading>
        <Textarea
          v-model="inputText"
          class="prevent-auto-zoom block w-full"
          auto-resize
          :placeholder="t('generator.qrcode.text_input_placeholder')"
        />

        <PageHeading class="mt-4" :size="6" :level="2" weight="600">
          {{ t("generator.qrcode.options.label") }}
        </PageHeading>
        <div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="qr-size" class="mb-1 block">{{ t("generator.qrcode.options.size.label") }}</label>
            <Select id="qr-size" :options="sizeOptions" option-label="label" option-value="value" v-model="qrSize" class="w-full" />
          </div>
          <div>
            <label for="qr-error-correction" class="mb-1 block">{{ t("generator.qrcode.options.error_correction.label") }}</label>
            <Select
              id="qr-error-correction"
              :options="errorCorrectionOptions"
              option-label="label"
              option-value="value"
              v-model="errorCorrectionLevel"
              class="w-full"
            />
          </div>
          <div>
            <label for="qr-fg-color" class="mb-1 block">{{ t("generator.qrcode.options.foreground_color.label") }}</label>
            <div class="flex items-center gap-2">
              <ColorPicker v-model="foregroundColor" />
              <InputGroup class="color-hex-input">
                <InputGroupAddon>#</InputGroupAddon>
                <InputText id="qr-fg-color" v-model="foregroundColor" class="font-monospace-code" maxlength="6" />
              </InputGroup>
            </div>
          </div>
          <div>
            <label for="qr-bg-color" class="mb-1 block">{{ t("generator.qrcode.options.background_color.label") }}</label>
            <div class="flex items-center gap-2">
              <ColorPicker v-model="backgroundColor" />
              <InputGroup class="color-hex-input">
                <InputGroupAddon>#</InputGroupAddon>
                <InputText id="qr-bg-color" v-model="backgroundColor" class="font-monospace-code" maxlength="6" />
              </InputGroup>
            </div>
          </div>
        </div>

        <PageHeading class="mt-4" :size="6" :level="2" weight="600">
          {{ t("generator.qrcode.preview.label") }}
        </PageHeading>
        <div class="qr-preview flex items-center justify-center p-4">
          <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code" class="qr-image" />
          <p v-else class="qr-placeholder">{{ t("generator.qrcode.preview.placeholder") }}</p>
        </div>

        <div class="mt-3 flex gap-2">
          <Button @click="onClickDownload" :disabled="!qrDataUrl" class="flex-1" icon="pi pi-download">
            {{ t("generator.qrcode.button.download") }}
          </Button>
          <Button @click="onClickCopy" :disabled="!qrDataUrl" class="flex-1" outlined icon="pi pi-copy">
            {{ t("generator.qrcode.button.copy") }}
          </Button>
        </div>
      </template>
    </Card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.qr-preview {
  background-color: #f1f3f5;
  min-height: 200px;
  border-radius: 6px;
}

.qr-image {
  max-width: 100%;
  height: auto;
}

.qr-placeholder {
  color: #868e96;
}

:deep(.p-colorpicker-preview) {
  border: 1px solid #dee2e6;
}

.dark-mode {
  .qr-preview {
    background-color: #212529;
  }
  .qr-placeholder {
    color: #adb5bd;
  }
}
</style>
