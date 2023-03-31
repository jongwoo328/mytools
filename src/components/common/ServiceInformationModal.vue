<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";

const props = defineProps<{ showModalInitial: boolean }>();
const modalVisibility = ref(props.showModalInitial);

const onClickDontShowAgain = () => {
  localStorage.setItem("showServiceInformationModal", "false");
  modalVisibility.value = false;
};
const modalWidth = computed(() => {
  if (window.innerWidth < 768) {
    return "100%";
  } else {
    return "50%";
  }
});
</script>

<template>
  <AModal
    v-model:visible="modalVisibility"
    title="Welcome!"
    ok-text="Don't show again"
    cancel-text="OK"
    @ok="onClickDontShowAgain"
    :width="modalWidth"
  >
    <ATypographyParagraph>
      This webpage provides a variety of tools that can be used primarily for
      web development, with the following features
    </ATypographyParagraph>
    <ul>
      <li>
        <ATypographyParagraph>
          All functionality is implemented without going through the server
          <br />
          (This means that sensitive information is still available on this
          website.)
        </ATypographyParagraph>
      </li>
      <li>
        <ATypographyParagraph>
          Each feature comes with options for customization
        </ATypographyParagraph>
      </li>
      <li>
        <ATypographyParagraph> No ads </ATypographyParagraph>
      </li>
    </ul>
  </AModal>
</template>
