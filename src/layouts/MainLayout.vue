<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          Clínica Médica
        </q-toolbar-title>
        <q-breadcrumbs class="col-3">
          <q-breadcrumbs-el
            v-for="(el, index) in setBreadcrumbs($route.meta.name, $route.meta.icons)"
            :key="index"
            :class="index == setBreadcrumbs($route.meta.name, $route.meta.icons).length - 1 ? 'text-white' : 'text-warning'"
            :label="el.name"
            :icon="el.icon"
          />
        </q-breadcrumbs>
        <q-btn-dropdown icon="person" dense rounded>
          <q-list style="min-width: 250px" dense>
            <q-item>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <strong>Nome:</strong>
                  {{ user.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click.native="updatePassword()">
              <q-item-section avatar>
                <q-icon name="build" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Alterar senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click.native="logout()">
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250" content-class="bg-grey-1">
      <q-list class="img-background">
        <q-item v-for="route in routes" :key="route.id" clickable :to="route.path" exact active-class="text-blue-10" v-show="verifyIfRoleExistInRolesRoute(route.meta.roles)">
          <q-item-section avatar>
            <q-icon :name="route.meta.icons" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ route.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <update-password ref="modalUpdatePassword"></update-password>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { recoverRoles, verifyIfRoleExistInRolesRoute } from '../router/verifyRoutes'
import UpdatePassword from '../pages/users/components/UpdatePassword'
export default {
  name: 'MainLayout',
  components: {
    UpdatePassword
  },
  data () {
    return {
      leftDrawerOpen: false,
      routes: this.$router.options.routes[2].children
    }
  },
  computed: {
    ...mapState('Users', ['user'])
  },
  methods: {
    ...mapActions('Users', ['logout']),
    setBreadcrumbs (route, icon) {
      const r = route.split(' / ')
      const i = icon.split(' / ')
      const arr = []
      r.map((el, index) => {
        arr.push({
          icon: i[index],
          name: r[index]
        })
      })
      return arr
    },
    updatePassword () {
      this.$refs.modalUpdatePassword.openModal()
    },
    verifyIfRoleExistInRolesRoute (rolesRoute) {
      const roles = recoverRoles()
      return verifyIfRoleExistInRolesRoute(rolesRoute, roles[0])
    }
  }
}
</script>
<style>
table tbody tr {
  cursor: pointer;
}

table tbody tr:nth-child(2n) {
  background-color: rgb(231, 231, 231);
}

table tbody tr:nth-child(2n):hover {
  background-color: rgb(196, 196, 196);
}

table tbody tr:nth-child(2n + 1):hover {
  background-color: rgb(196, 196, 196);
}

.img-background {
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-yellow-gold {
  background-color: rgba(222, 172, 86, 0.473) !important;
}
.text-yellow-gold {
  color: #f2c037 !important;
}
.w3-toolbar {
  min-height: 22px !important;
  max-height: 22px !important;
}
.w3-toolbar-title {
  font-size: 14px;
  font-weight: 500;
}
.q-field--with-bottom {
  padding-bottom: 10px !important;
}
.q-field__messages {
  line-height: 0;
}
.q-table__bottom {
  padding: 0px !important;
}
.q-table--dense .q-table thead tr,
.q-table--dense .q-table tbody tr,
.q-table--dense .q-table tbody td {
  height: 10px !important;
}
.q-table--dense .q-table th,
.q-table--dense .q-table td {
  padding: 0px 5px !important;
}
.q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
  height: 35px;
}
.q-field--labeled.q-field--dense .q-field__native,
.q-field--labeled.q-field--dense .q-field__prefix,
.q-field--labeled.q-field--dense .q-field__suffix {
  padding-bottom: 0px !important;
}
.q-field {
  font-size: 13px;
}
.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native{
  min-height: 28px;
}
</style>
