import React from 'react'
import fav_yellow from '../../icons/fav_yellow.svg'
import tokens_gray from '../../icons/tokens_gray.svg'
import tokens_white from '../../icons/tokens_white.svg'
import tokens_yellow from '../../icons/tokens_yellow.svg'
import search from '../../icons/search.svg'
import styles from './Icon.module.css'

const Icons = {
  fav_yellow,
  tokens_gray,
  tokens_white,
  tokens_yellow,
  search,
}

export interface Props {
  type: keyof typeof Icons
}

export const Icon: React.FC<Props> = ({ type }) => {
  return <img className={styles.img} src={Icons[type]} alt="Favorite" />
}
