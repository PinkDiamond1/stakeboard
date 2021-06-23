import React from 'react'
import arrow_down from '../../icons/arrow_down.svg'
import arrow_straight from '../../icons/arrow_straight.svg'
import arrow_up from '../../icons/arrow_up.svg'
import block from '../../icons/block.svg'
import bulb_gray from '../../icons/bulb_gray.svg'
import bulb_yellow from '../../icons/bulb_yellow.svg'
import check from '../../icons/check.svg'
import close from '../../icons/close.svg'
import exclamation from '../../icons/exclamation.svg'
import fav_gray from '../../icons/fav_gray.svg'
import fav_yellow from '../../icons/fav_yellow.svg'
import next_session_gray from '../../icons/next_session_gray.svg'
import next_session_yellow from '../../icons/next_session_yellow.svg'
import order_white from '../../icons/order_white.svg'
import order_yellow from '../../icons/order_yellow.svg'
import search from '../../icons/search.svg'
import time from '../../icons/time.svg'
import tokens_gray from '../../icons/tokens_gray.svg'
import tokens_white from '../../icons/tokens_white.svg'
import tokens_yellow from '../../icons/tokens_yellow.svg'
import styles from './Icon.module.css'

const Icons = {
  arrow_down,
  arrow_straight,
  arrow_up,
  block,
  bulb_gray,
  bulb_yellow,
  check,
  close,
  exclamation,
  fav_gray,
  fav_yellow,
  next_session_gray,
  next_session_yellow,
  order_white,
  order_yellow,
  search,
  time,
  tokens_gray,
  tokens_white,
  tokens_yellow,
}

export interface Props {
  type: keyof typeof Icons
}

export const Icon: React.FC<Props> = ({ type }) => {
  return <img className={styles.img} src={Icons[type]} alt="Favorite" />
}