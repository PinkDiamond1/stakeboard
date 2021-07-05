import { Story, Meta } from '@storybook/react'

import { Account, Dashboard, Props } from './Dashboard'

export default {
  title: 'Dashboard',
  component: Dashboard,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <Dashboard {...args} />

const accounts: Account[] = [
  {
    address: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
    name: 'KILT Identity 1',
    staked: 14_000,
    stakeable: 8_000,
  },
  {
    address: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
    name: 'KILT Identity 2',
    staked: 5_000,
    stakeable: 16_000,
  },
  {
    address: '5G1CE7waPWQCoUWLmK3NMh5gV6D8gdc1WDe2G8yST4tc9y3o',
    name: 'KILT Identity 3',
    staked: 8_000,
    stakeable: 0,
  },
]

export const Primary = Template.bind({})
Primary.args = {
  accounts
}
