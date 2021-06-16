import { Story, Meta } from '@storybook/react'

import { CollatorListRaw, Props } from './CollatorListRaw'

export default {
  title: 'CollatorListRaw',
  component: CollatorListRaw,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <CollatorListRaw {...args} />

export const Primary = Template.bind({})
Primary.args = {}
