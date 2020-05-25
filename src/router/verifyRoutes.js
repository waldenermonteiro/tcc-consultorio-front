export const verifyUserIsLogged = () => localStorage.getItem('token_clinic') !== null
export const verifyIfRoleExistInRolesRoute = (rolesRoute, role) => {
  if (Array.isArray(rolesRoute)) {
    for (const roleRoute of rolesRoute) {
      if (roleRoute === role) {
        return true
      }
    }
    return false
  }
  return false
}
export const verifyRolesToUser = (to, next, roles, routeReject) => {
  for (const role of roles) {
    if (to.matched.some(record => verifyIfRoleExistInRolesRoute(record.meta.roles, role))) {
      next()
      return
    }
  }
  next(routeReject)
}
export const recoverRoles = () => {
  const data = JSON.parse(localStorage.getItem('roles_clinic'))
  const roles = data === null ? ['login'] : data.roles
  return roles
}
