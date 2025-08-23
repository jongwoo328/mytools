<script lang="ts" setup>
import { ref } from "vue";

const { t } = useI18n();
const props = defineProps<{ showModalInitial: boolean }>();
const modalVisibility = ref(props.showModalInitial);

const onClickDontShowAgain = () => {
  localStorage.setItem("showServiceInformationModal", "false");
  modalVisibility.value = false;
};
</script>

<template>
  <Dialog :header="t('index.modal.title')" modal v-model:visible="modalVisibility">
    <div class="mt-3">
      <p>
        {{ t("index.modal.description") }}
      </p>
      <ul class="list-disc pl-5 mt-4">
        <li class="mt-3">
          <p v-html="t('index.modal.features.0')" />
        </li>
        <li class="mt-3">
          <p>{{ t("index.modal.features.1") }}</p>
        </li>
        <li class="mt-3">
          <p>{{ t("index.modal.features.2") }}</p>
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="mt-3">
        <Button :label="t('index.modal.button.close')" text @click="modalVisibility = false" />
        <Button :label="t('index.modal.button.dont_show_again')" autofocus @click="onClickDontShowAgain" />
      </div>
    </template>
  </Dialog>
</template>
