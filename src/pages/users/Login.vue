<template>
  <q-page class="docs-input row justify-center">
    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pl-xl q-pr-xl dark">
      <div class="text-center" style="color:white">
        <img src="statics/logo-travessia.png" width="210em" />
        <h6 class="text-weight-bold q-mt-xl">Sistema de Acesso ao Administrador</h6>
      </div>
      <div class="q-mt-xl">
        <q-input v-model="userData.email" inverted color="dark" type="text" label="Login" key="login-com-ad" />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="userData.password"
          inverted
          color="dark"
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
      <div class="q-mt-md">
        <q-toggle v-model="userData.savePassword" color="amber-10" label="Salvar Senha" class="text-white" />
      </div>
      <div class="q-mt-sm">
        <q-btn color="amber-10" push class="full-width" @click="doLogin()" label="Entrar" size="lg" :loading="loading">
          <span slot="loading"> <q-spinner-hourglass class="on-left" />Carregando... </span>
        </q-btn>
      </div>
      <div class="q-mt-md">
        <q-btn color="white" outline @click="forgotPasswordModal = !forgotPasswordModal" rounded class="full-width" label="Esqueci minha senha" size="sm"> </q-btn>
      </div>
    </div>
    <q-dialog v-model="forgotPasswordModal">
      <q-card>
        <h4 class="q-mr-lg q-ml-lg">Recuperar Senha</h4>
        <div class="q-pl-lg q-pr-lg">
          <q-form>
            <q-input
              type="email"
              outlined
              label="Digite o E-mail"
              v-model="forgotPasswordData.email"
              lazy-rules
              error-message="Campo Obrigatório"
              :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
            />
            <q-input
              type="password"
              outlined
              label="Digite a Senha"
              v-model="forgotPasswordData.password"
              lazy-rules
              error-message="Campo Obrigatório"
              :rules="[val => (val && val.length > 0) || 'Campo obrigatório']"
            />
          </q-form>
          <div class="row q-mt-lg q-mb-md">
            <div class="col">
              <q-btn class="float-right" color="amber-10" @click="forgotPasswordModal = false" push label="Confirmar" />
              <q-btn class="q-mr-md float-right" @click="forgotPasswordModal = false" label="Cancelar" push />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
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
        password: '123',
        login: '',
        returnUrl: '',
        savePassword: false
      },
      loading: false,
      forgotPasswordModal: false,
      forgotPasswordData: {}
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
</style>
