import { Story, Meta } from '@storybook/react'

import { CollatorList, Props } from './CollatorList'

export default {
  title: 'CollatorList',
  component: CollatorList,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <CollatorList {...args} />

export const Primary = Template.bind({})
Primary.args = {}
