<template>
  <q-page class="row justify-center">
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-pa-xl border-login">
      <div class="text-center" style="color:white">
        <img src="statics/logo-clinic.png" width="210em" />
      </div>
      <div class="q-mt-xl">
        <q-input v-model="userData.email" outlined debounce="300" color="primary" type="text" label="Login" />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="userData.password"
          outlined
          type="password"
          label="Senha"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          onpaste="return false"
          oncopy="return false"
          oncut="return false"
        />
      </div>
      <div class="q-mt-lg">
        <q-btn color="primary" push class="full-width" @click="doLogin()" label="Entrar" size="lg" :loading="loading">
          <span slot="loading"> <q-spinner-hourglass class="on-left" />Carregando... </span>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data () {
    return {
      userData: {
        email: 'teste@gmail.com',
        password: '123'
      },
      loading: false
    }
  },
  validations: {
    userData: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    doLogin () {
      const params = { ...this.userData }
      this.$login({
        urlDispatch: 'Users/login',
        params,
        callback: () => {
          location.reload()
        }
      })
    }
  }
}
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed !important;
  opacity: 0.8;
}
.border-login {
  border-radius: 8px;
  border: 1px solid #dadce0;
}
</style>
