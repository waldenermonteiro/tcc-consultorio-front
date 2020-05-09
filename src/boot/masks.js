const formatCPFCNPJ = (val = '', type = '') => {
  let cpfCnpj = { ...{ val } }
  cpfCnpj.val = addZeroLeftMaskCpfCnpj(cpfCnpj.val.toString(), type)
  return cpfCnpj.val === null
    ? ''
    : type === 'cpf'
      ? cpfCnpj.val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : cpfCnpj.val.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
const formatCEP = (val = '') => {
  const valString = val === '' || val === null ? null : val.toString()
  return valString === null ? '' : valString.replace(/(\d{5})(\d{3})/, '$1-$2')
}
const formatPhoneNumber = (phone = '') => {
  return phone === null ? '' : phone.length === 9 ? phone.replace(/(\d{5})(\d{4})/, '$1-$2') : phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
const formatStatus = (val = '') => {
  return val ? 'Ativo' : 'Inativo'
}
const formatReplaceCpfCnpj = cpfCnpj => {
  cpfCnpj = cpfCnpj.replace(/[^0-9]+/g, '')
  return cpfCnpj
}
const formatReplaceCpfCnpjNumber = (cpfCnpj = '') => {
  cpfCnpj = cpfCnpj.toString()
  cpfCnpj = cpfCnpj.replace(/[^0-9]+/g, '')
  return parseInt(cpfCnpj) ? parseInt(cpfCnpj) : ''
}
const formatReplaceCep = cep => {
  cep = cep.replace('-', '')
  return cep
}
const formatReplacePhone = phone => {
  phone = phone.replace(/[^0-9]+/g, '')
  return phone
}
const formatReplaceAgencyAccountBank = (number = '') => {
  if (typeof number === 'number') return number
  number = number.replace('-', '')
  return parseInt(number) ? parseInt(number) : ''
}
const addZeroLeftMaskCpfCnpj = (cpfCnpj, type) => {
  return type === 'cpf' ? addZeroLeftString(cpfCnpj, 11) : addZeroLeftString(cpfCnpj, 14)
}
const addZeroLeftString = (num, size) => {
  let s = num + ''
  while (s.length < size) s = '0' + s
  return s
}
const formatDate = val => {
  function pad (val) {
    return val < 10 ? '0' + val : val
  }
  let d = new Date(val)
  return !val ? '' : [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/')
}
const formatDateBr = date => {
  if (date === null) return ''
  let pattern = /(\d{4})-(\d{2})-(\d{2})/g
  let getDate = pattern.exec(date)[0]
  return getDate.replace(pattern, '$3/$2/$1')
}
const formatDateBrInApi = (date) => {
  if (date === null) return ''
  let pattern = /(\d{2})\/(\d{2})\/(\d{4})/g
  let getDate = pattern.exec(date)[0]
  return getDate.replace(pattern, '$3-$2-$1')
}
const formatDateApi = val => {
  function pad (val) {
    return val < 10 ? '0' + val : val
  }
  var d = new Date(val)
  return !val ? '' : [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
}
const formatAgencyBank = agency => {
  return addZeroLeftString(agency, 4)
}
const formatAccountBank = account => {
  account = account.toString()
  let patt = /^([0-9]{7})$/
  patt.test(account)
  let lastChar = account.substr(account.length - 1)
  let xStr = account.substring(0, account.length - 1)
  return addZeroLeftString(xStr + '-' + lastChar, 11)
}
const formatCurrencyBrazil = value => {
  const val = (value / 1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const getMoneyApi = value => {
  return parseFloat(value + '').toFixed(2)
}
const setMoneyApi = value => {
  return value.parseFloat()
}
const convertToNumberApi = value => {
  value = value.replace(/[^0-9]/g, '')
  let lastChar = value.substr(value.length - 2)
  let xStr = value.substring(0, value.length - 2)
  return parseFloat(xStr + '.' + lastChar)
}

export {
  formatCPFCNPJ,
  formatCEP,
  formatPhoneNumber,
  formatStatus,
  formatReplaceCpfCnpj,
  addZeroLeftMaskCpfCnpj,
  formatReplaceCpfCnpjNumber,
  formatReplaceCep,
  formatReplacePhone,
  formatReplaceAgencyAccountBank,
  formatAgencyBank,
  formatAccountBank,
  formatDate,
  formatDateBr,
  formatDateBrInApi,
  formatCurrencyBrazil,
  formatDateApi,
  getMoneyApi,
  setMoneyApi,
  convertToNumberApi
}
