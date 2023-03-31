<template>
  <section id="signup">
    <div class="signup-container">
      <div class="card">
        <img
          v-if="$config.loginLogoUrl"
          :src="$config.loginLogoUrl"
          class="pt-2 pb-5"
        />
        <div class="mb-3">
          {{
            $gettext(
              "Please fill in all the required fields below and click on Signup to create your account."
            )
          }}
        </div>

        <form @submit.prevent="submit">
          <div class="field mb-5">
            <div class="field mb-2">
              <p class="control has-icons-left is-expanded">
                <input
                  v-model.trim="email"
                  class="input"
                  id="email"
                  :placeholder="$gettext('Email')"
                />
                <span class="icon is-small is-left">
                  <fa-icon icon="envelope" />
                </span>
              </p>
            </div>
            <div class="field mb-2">
              <p class="control has-icons-left is-expanded">
                <input
                  v-model.trim="firstName"
                  class="input"
                  id="first-name"
                  :placeholder="$gettext('Firstname')"
                />
                <span class="icon is-small is-left">
                  <fa-icon icon="user" />
                </span>
              </p>
            </div>
            <div class="field mb-2">
              <p class="control has-icons-left is-expanded">
                <input
                  v-model.trim="lastName"
                  class="input"
                  id="last-name"
                  :placeholder="$gettext('Lastname')"
                />
                <span class="icon is-small is-left">
                  <fa-icon icon="user" />
                </span>
              </p>
            </div>
            <div class="field mb-2">
              <p class="control has-icons-left">
                <input
                  v-model="password"
                  class="input"
                  id="password"
                  type="password"
                  :placeholder="$gettext('Password')"
                />
                <span class="icon is-small is-left">
                  <fa-icon icon="lock" />
                </span>
              </p>
            </div>
            <div class="field mb-2">
              <p class="control has-icons-left">
                <input
                  v-model="confirmPassword"
                  class="input"
                  id="confirm-password"
                  type="password"
                  :placeholder="$gettext('Confirm password')"
                />
                <span class="icon is-small is-left">
                  <fa-icon icon="lock" />
                </span>
              </p>
            </div>
          </div>
          <div class="sgnup-buttons">
            <div>
              <p class="control has-text-centered">
                <button type="submit" class="button is-login">
                  {{ $gettext("Sign up") }}
                </button>
              </p>
            </div>
          </div>
          <div>
            <p class="has-text-danger has-text-centered" v-if="errorMessage">
              {{ errorMessage }}
            </p>
          </div>
          <div class="signup-link">
            <button @click="$router.push({ name: 'Login' })" type="button">
              {{ $gettext("Already have an account ?") }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
  import { Options, Vue } from "vue-class-component"
  import { RestExc } from "@lokavaluto/lokapi-browser"

  @Options({
    name: "Signup",
    data() {
      return {
        email: "",
        lastName: "",
        firstName: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
      }
    },
    methods: {
      async submit(): Promise<void> {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = this.$gettext(
            "The password and the password confirmation must be equal."
          )
          return
        }
        this.$loading.show()
        try {
          await this.$lokapi.signup(
            this.email,
            this.lastName,
            this.firstName,
            this.password
          )
        } catch (e) {
          if (e instanceof RestExc.UserOrEmailAlreadyTaken) {
            this.errorMessage = this.$gettext("User or email already exist.")
          } else {
            this.errorMessage = this.$gettext(
              "Unexpected issue when attempting to connect to remote server."
            )
          }

          throw e
        } finally {
          this.$loading.hide()
        }
        this.$router.push({ name: "Login" })
        this.$msg.success(
          this.$gettext("Your account has been created successfully.")
        )
      },
    },
  })
  export default class Signup extends Vue {}
</script>
<style scoped lang="scss">
  @import "@/assets/custom-variables.scss";
  .signup-link {
    text-align: center;
    button {
      border: none;
      background: none;
      color: #777777;
      cursor: pointer;
    }
  }
  #signup {
    position: absolute;
    display: table;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    .signup-container {
      display: table-cell;
      vertical-align: middle;
      padding: 0 10px;
      .card {
        margin: 0 auto;
        max-width: 380px;
        padding: 20px;
        text-align: center;
        img {
          max-width: 200px;
        }
        .field {
          font-size: 2rem;
        }
        @media screen and (min-width: 768px) {
          padding: 30px;
        }
      }
    }
  }
</style>
