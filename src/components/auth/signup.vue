<template>
  <div id="signup">
    <div id="signin">
      <div class="form">
        <form class="login-form" @submit.prevent="onSubmit">
          <div class="input" :class="{ invalid: $v.email.$error }">
            <input
              type="email"
              placeholder="Email"
              id="email"
              @blur="$v.email.$touch()"
              v-model="email"
            />
          </div>
          <div class="input">
            <input type="name" placeholder="name" id="name" v-model="name" />
          </div>
          <div class="input" :class="{ invalid: $v.age.$error }">
            <h6 v-if="!$v.age.minVal">
              You have to be at least {{ $v.age.$params.minVal.min }} years old.
            </h6>
            <input
              type="number"
              placeholder="Age"
              id="age"
              @blur="$v.email.$touch()"
              v-model.number="age"
            />
          </div>
          <div class="input" :class="{ invalid: $v.password.$error }">
            <input
              type="password"
              placeholder="Password"
              id="password"
              @blur="$v.password.$touch()"
              v-model="password"
            />
          </div>
          <div class="input" :class="{ invalid: $v.confirmPassword.$error }">
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirm-password"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            />
          </div>
          <button type="submit" :disabled="$v.$invalid">create</button>
          <p class="message">
            Already registered? <router-link to="/signin">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  numeric,
  minValue,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      name: "",
      age: null,
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {
      const signupData = {
        name: this.name,
        email: this.email,
        age: this.age,
        password: this.password,
        confirmPassword: this.confimPassword
      };
      console.log(signupData);
      this.$store.dispatch("signup", signupData);
    }
  },
  validations: {
    email: {
      required,
      email,
      unique: val => {
        if (val === "") return true;
        return axios
          .get(
            'https://toyproject-vote-service-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="' +
              val +
              '"'
          )
          .then(res => {
            return Object.keys(res.data).length === 0;
          });
      }
    },
    age: {
      required,
      numeric,
      minVal: minValue(18)
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs(vm => {
        return vm.password;
      })
    }
  }
};
</script>

<style></style>
