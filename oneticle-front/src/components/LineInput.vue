<template>
  <div class="input-container p-relative mt-2">
    <label class="text-left d-flex flex-column">{{ title }}</label>
    <input
      v-model="inputData"
      :placeholder="placeholder"
      class="w-100 input"
      :class="{ 'is-danger': isDanger, 'is-primary': isSuccess }"
      :type="type"
      @keyup.enter="onLogin"
    />
    <i
      :class="{ invisible: !isDanger }"
      class="fas fa-exclamation-circle text-danger p-absolute"
    ></i>
    <i
      :class="{ invisible: !isSuccess }"
      class="fas fa-check text-primary p-absolute"
    ></i>
    <p
      class="help text-left text-danger ml-1"
      :class="{ invisible: !isDanger }"
    >
      {{ dangerText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    dangerText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputData: '',
    };
  },
  methods: {
    onLogin() {
      this.$emit('onLogin');
    },
  },
  watch: {
    inputData: function(val, oldVal) {
      this.$emit('setValue', this.inputData);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container i {
  right: 10px;
  top: 44px;
}

input {
  outline: none;
  border-radius: 6px;
  background-color: white;
  border-color: #dbdbdb;
  border: 1px solid #dbdbdb;
  color: #363636;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  &:focus:not(.is-danger) {
    border-color: #28f92d;
    box-shadow: 0 0 0 0.125em rgba(40, 249, 45, 0.25);
  }
}
</style>
