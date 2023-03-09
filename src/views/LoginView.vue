<template>
  <WelcomeLayout>
    <template #content>
      <form @submit.prevent="login" class="login_view_container">
        <h4 class="title">Enter your credentials</h4>
        <LabelInput
          span-text="Email Address"
          :input-value="user.email"
          input-type="email"
          input-name="email"
          input-placeholder="yourname@gmail.com"
          :input-required="true"
          :input-validate="validateEmail"
        />
        <label class="password_label" for="password">
          <div class="password_label_description">
            <span class="password_label_description_span">Password</span>
            <router-link class="password_label_description_link" to="/forgot-password"
              >Forgot password?</router-link
            >
          </div>
          <input
            v-model="user.password"
            @keyup.enter="login"
            class="password_label_input"
            :class="{ 'p-invalid': validatePassword }"
            type="password"
            name="password"
            id="password"
            placeholder="smallTiger21"
            required
          />
        </label>
        <label class="check_label" for="keep">
          <input
            v-model="modelKeep"
            class="check_label_input"
            type="checkbox"
            name="keep"
            id="keep"
            required
          />
          <span class="check_label_span">Keep me signed in</span>
        </label>
        <button type="submit" class="button">
          <span class="button_span">Login</span>
        </button>
        <div class="register">
          <span class="register_span">Not a member? </span>
          <router-link class="register_link" to="/register">Sign up</router-link>
        </div>
      </form>
    </template>
    <template #header-right>
      <div class="header-right">
        <div class="header-text">No employer account yet?</div>
        <router-link class="header_button" :to="'/register'"> Register </router-link>
      </div>
    </template>
  </WelcomeLayout>
</template>

<script setup lang="ts">
import WelcomeLayout from '@/layouts/WelcomeLayout.vue';
import LabelInput from '@/components/LabelInput.vue';
import api from '@/api';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  email: '',
  password: ''
});
const modelKeep = ref(false);
const firstSend = ref(false);

const validateInput = (input: string | null) => {
  if (input === '' || input === null) {
    return true;
  } else {
    return false;
  }
};
const validateEmail = computed(() => firstSend.value && validateInput(user.email));
const validatePassword = computed(() => firstSend.value && validateInput(user.password));

const login = async () => {
  firstSend.value = true;
  if (validateEmail.value || validatePassword.value) {
    return;
  }
  try {
    const data = await api.login(user);
    localStorage.setItem('token', data.token);
    router.push('/products');
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
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
.login_view_container {
  width: 450px;
  > .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: #000000;
    margin-bottom: 22px;
  }
  > .email_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    > .email_label_span {
      @include span();
      margin-bottom: 14px;
    }
    > .email_label_input {
      @include label-input();
    }
  }
  > .password_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 52px;
    > .password_label_description {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      > .password_label_description_span {
        @include span();
      }
      > .password_label_description_link {
        font-size: 16px;
        line-height: 19px;
        color: #5177fd;
        text-decoration: none;
      }
    }
    > .password_label_input {
      @include label-input();
    }
  }
  > .check_label {
    display: flex;
    align-items: center;
    margin-bottom: 31px;
    > .check_label_span {
      @include span();
      margin-left: 9px;
    }
    > .check_label_input {
      appearance: none;
      width: 20px;
      height: 20px;
      &:before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #ced4da;
        border-radius: 2px;
        cursor: pointer;
      }
      &:checked:before {
        background-color: #2196f3;
      }
    }
  }
  .button {
    margin-bottom: 27px;
    background: #248aff;
    border-radius: 6px;
    height: 54px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    > .button_span {
      @include span();
      color: white;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
    }
  }
  .register {
    > .register_span {
      @include span();
      cursor: initial;
    }
    > .register_link {
      color: #248aff;
      text-decoration: none;
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
