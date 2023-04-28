<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{ showModalInitial: boolean }>();
const modalVisibility = ref(props.showModalInitial);

const onClickDontShowAgain = () => {
  localStorage.setItem("showServiceInformationModal", "false");
  modalVisibility.value = false;
};
</script>

<template>
  <Dialog header="Welcome!" modal v-model:visible="modalVisibility">
    <div class="mt-3">
      <p>
        This webpage provides a variety of tools that can be used primarily for
        web development, with the following features
      </p>
      <ul>
        <li>
          <p>
            All functionality is implemented without going through the server
            <br />
            (This means that sensitive information is still available on this
            website.)
          </p>
        </li>
        <li>
          <p>Each feature comes with options for customization</p>
        </li>
        <li>
          <p>No ads</p>
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="mt-3">
        <Button label="OK" text @click="modalVisibility = false" />
        <Button
          label="Don't show again"
          autofocus
          @click="onClickDontShowAgain"
        />
      </div>
    </template>
  </Dialog>
</template>
