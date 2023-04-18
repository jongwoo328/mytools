<script setup lang="ts">
import Card from "primevue/card";
</script>

<template>
  <Card
    data-aos="fade-up"
    data-aos-once="true"
    data-aos-anchor-placement="bottom"
    class="mb-3"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #content>
      <slot name="conetent"></slot>
    </template>
  </Card>
</template>

<style lang="scss" scoped></style>
