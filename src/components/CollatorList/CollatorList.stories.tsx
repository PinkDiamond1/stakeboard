import { Story, Meta } from '@storybook/react'

import { CollatorList, Props } from './CollatorList'

export default {
  title: 'CollatorList',
  component: CollatorList,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <CollatorList {...args} />

export const Primary = Template.bind({})
Primary.args = {
  dataSet: [
    {
      collator: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
      active: true,
      activeNext: false,
      isLeaving: false,
      totalStake: 200_000,
      delegators: 5,
      lowestStake: 10_000,
      stakes: [],
      favorite: true
    },
    {
      collator: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
      active: true,
      activeNext: true,
      isLeaving: false,
      totalStake: 400_000,
      delegators: 15,
      lowestStake: 15_000,
      stakes: [
        {
          stake: 100_000,
          account: {
            name: 'SPORRAN Account 3',
            available: 200_000,
          },
        },
      ],
      favorite: false
    },
    {
      collator: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
      active: true,
      activeNext: true,
      isLeaving: true,
      totalStake: 600_000,
      delegators: 25,
      lowestStake: 20_000,
      stakes: [],
      favorite: false
    },
  ]
}
