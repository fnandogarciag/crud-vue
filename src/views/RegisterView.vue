<template>
  <WelcomeLayout>
    <template #content>
      <div class="register_view_container">
        <h4 class="title">Create your account</h4>
        <label class="text_label" for="name">
          <span class="text_label_span">Name</span>
          <input
            v-model="user.name"
            class="text_label_input"
            :class="{ 'p-invalid': validateName }"
            type="text"
            name="name"
            id="name"
            placeholder="John Smith"
            required
          />
        </label>
        <label class="text_label" for="email">
          <span class="text_label_span">Email Address</span>
          <input
            v-model="user.email"
            class="text_label_input"
            :class="{ 'p-invalid': validateEmail }"
            type="email"
            name="email"
            id="email"
            placeholder="yourname@gmail.com"
            required
          />
        </label>
        <label class="password_label" for="password">
          <span class="password_label_span">Password</span>
          <input
            v-model="user.password"
            class="password_label_input"
            :class="{ 'p-invalid': validatePassword }"
            type="password"
            name="password"
            id="password"
            placeholder="smallTiger21"
            required
          />
        </label>
        <label class="password_label" for="repeatPassword">
          <span class="password_label_span">Repeat Password</span>
          <input
            v-model="modelRepeatPassword"
            class="password_label_input"
            :class="{ 'p-invalid': validateRepeatPassword }"
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="smallTiger21"
            required
          />
        </label>
        <button type="submit" class="send_button" @click="register">Register</button>
      </div>
    </template>
    <template #header-right>
      <div class="header-right">
        <router-link class="header_button" :to="'/login'"> Login </router-link>
      </div>
    </template>
  </WelcomeLayout>
</template>

<script setup lang="ts">
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';
import api from '@/api';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  name: '',
  email: '',
  password: ''
});

const modelRepeatPassword = ref('');
const firstSend = ref(false);

const validateInput = (input: string) => {
  if (input === '') {
    return true;
  } else {
    return false;
  }
};

const validateName = computed(() => firstSend.value && validateInput(user.name));
const validateEmail = computed(() => firstSend.value && validateInput(user.email));
const validatePassword = computed(() => firstSend.value && validateInput(user.password));
const validateRepeatPassword = computed(
  () =>
    firstSend.value &&
    (validateInput(modelRepeatPassword.value) || user.password !== modelRepeatPassword.value)
);

const register = async () => {
  firstSend.value = true;
  if (
    validateName.value ||
    validateEmail.value ||
    validatePassword.value ||
    validateRepeatPassword.value
  ) {
    return;
  }
  try {
    await api.register(user);
    router.push('/login');
  } catch (error) {
    console.log(error);
  }
};
</script>

<script lang="ts">
export default {
  methods: {}
};
</script>

<style lang="scss" scoped>
::v-deep(.send_button) {
  margin-bottom: 27px;
  background: #248aff;
  border-radius: 6px;
  height: 54px;
  width: 100%;
  border: none;
  text-transform: uppercase;
  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
}
::v-deep(.password_input) {
  height: 57px;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  padding-left: 19px;
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  &::placeholder {
    color: #c4c4c4;
  }
}
@mixin span() {
  font-size: 16px;
  line-height: 19px;
  color: #4a4844;
}
@mixin label-input() {
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
.register_view_container {
  width: 450px;
  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: #000000;
    margin-bottom: 22px;
  }
  .text_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .text_label_span {
      @include span();
      margin-bottom: 14px;
    }
    .text_label_input {
      @include label-input();
    }
  }
  > .password_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    > .password_label_span {
      @include span();
      margin-bottom: 14px;
    }
    > .password_label_input {
      @include label-input();
    }
  }
}
.header-right {
  display: flex;
  align-items: center;
  height: 100%;
  .header-text {
    margin-right: 24px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #757575;
  }
  .header_button {
    width: 147px;
    height: 42px;
    margin-right: 42px;
    border: 1px solid #248aff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #248aff;
  }
}
</style>
