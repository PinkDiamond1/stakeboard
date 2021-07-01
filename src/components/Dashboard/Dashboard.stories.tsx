import { Story, Meta } from '@storybook/react'

import { Dashboard, Props } from './Dashboard'

export default {
  title: 'Dashboard',
  component: Dashboard,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <Dashboard {...args} />

export const Primary = Template.bind({})
Primary.args = {}
