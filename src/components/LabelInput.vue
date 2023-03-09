<template>
  <label class="label_container" :for="inputName">
    <span class="label_span">{{ spanText }}</span>
    <input
      v-model="inputValue"
      class="label_input"
      :class="{ 'p-invalid': inputValidate }"
      :type="inputType"
      :name="inputName"
      :id="inputName"
      :placeholder="inputPlaceholder"
      :required="inputRequired"
    />
  </label>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  spanText: {
    type: String,
    required: true
  },
  inputValue: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  inputName: {
    type: String,
    required: true
  },
  inputPlaceholder: {
    type: String
  },
  inputRequired: {
    type: Boolean,
    default: false
  },
  inputValidate: {
    type: Boolean,
    default: false
  }
});

const { inputValue, inputType, inputName, inputValidate } = toRefs(props);
</script>

<style scoped lang="scss">
.label_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
  .label_span {
    font-size: 16px;
    line-height: 19px;
    color: #4a4844;
    margin-bottom: 14px;
  }
  .label_input {
    height: 57px;
    border: 2px solid #e5e5e5;
    border-radius: 4px;
    padding-left: 19px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    &.p-invalid {
      border-color: #f44336;
    }
    &::placeholder {
      color: #c4c4c4;
    }
  }
}
</style>
