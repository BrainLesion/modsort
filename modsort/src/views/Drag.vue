<template>
  <section class="section">
    <div class="container">
      <div class="drag">
        <DragZone msg="Welcome to Your Vue.js App" />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import DragZone from "@/components/DragZone.vue";

export default {
  name: "Drag",
  components: {
    DragZone
  }
};
</script>
