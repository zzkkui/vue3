<template>
  <div>{{ count }} *2 = {{ double }}</div>
  <button @click="add">add</button>
  <button @click="asyncAdd">async add</button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "../miniVuex";
let store = useStore();
let count = computed(() => store.state.count);
let double = computed(() => store.getters.double);
function asyncAdd() {
  store.dispatch("asyncAdd");
}
function add() {
  store.commit("add");
}
</script>
