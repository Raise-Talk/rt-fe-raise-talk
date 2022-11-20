// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      icon: 'mdi:poll',
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: 'mdi:contacts',
      title: 'Contatos',
      path: '/contacts'
    },
    {
      icon: 'mdi:bell',
      title: 'Lembretes',
      path: '/reminders'
    },
    {
      icon: 'mdi:currency-usd',
      title: 'Financeiro',
      path: '/financial'
    },
    {
      title: 'Imóveis',
      icon: 'mdi:home',
      badgeContent: 'Em breve',
      badgeColor: 'error',
      disabled: true,
      path: '/teste'
    },
    {
      title: 'Sites',
      icon: 'mdi:web',
      badgeContent: 'Em breve',
      badgeColor: 'error',
      disabled: true,
      path: '/teste'
    },
    {
      icon: 'mdi:cog',
      title: 'Integração',
      path: '/integration'
    }
  ]
}

export default navigation
