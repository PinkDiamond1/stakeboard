import React, { useContext, useEffect, useState } from 'react'
import styles from './Footer.module.css'
import packageInfo from '../../../package.json'
import {
  getPercentage,
  delegatorsRewardRate,
} from '../../utils/stakePercentage'
import { femtoToKilt } from '../../utils/conversion'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'
import cx from 'classnames'

export const Footer: React.FC = () => {
  const [delegatorsPercentage, setDelegatorsPercentage] = useState<string>('0')
  const [delegatorsReward, setDelegatorsReward] = useState<string>('0')

  const { overallTotalStake, totalIssuance, bestBlock } = useContext(
    BlockchainDataContext
  )

  useEffect(() => {
    if (!overallTotalStake || !totalIssuance) return
    // Takes it to a whole KILT
    const convertedDelegatorsStake = femtoToKilt(overallTotalStake.delegators)
    // Takes it to a whole KILT
    const convertedTotalIssuance = femtoToKilt(totalIssuance)
    setDelegatorsPercentage(
      getPercentage(convertedDelegatorsStake, convertedTotalIssuance)
    )
  }, [overallTotalStake, totalIssuance])

  useEffect(() => {
    if (!bestBlock) return

    const rewardRate = delegatorsRewardRate(
      Number(delegatorsPercentage),
      bestBlock
    )
    setDelegatorsReward(rewardRate)
  }, [bestBlock, delegatorsPercentage])

  return (
    <footer className={styles.footerContainer}>
      <div className={cx(styles.footer, styles.name)}>
        <nav className={styles.legal}>
          <a
            className={styles.legalAnchor}
            href={process.env.PUBLIC_URL + 'imprint.html'}
            target="_blank"
            rel="noreferrer"
          >
            Imprint
          </a>
          <a
            className={styles.legalAnchor}
            href={process.env.PUBLIC_URL + 'terms.html'}
            target="_blank"
            rel="noreferrer"
          >
            Terms
          </a>
          <a
            className={styles.legalAnchor}
            href="https://github.com/BTE-Trusted-Entity/stakeboard"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.legalAnchor}
            href="https://support.kilt.io/"
            target="_blank"
            rel="noreferrer"
          >
            Support
          </a>
        </nav>
        <div className={styles.reward}>
          <span className={cx(styles.gray, styles.paddingRight)}>STAKED</span>
          <span
            className={
              delegatorsPercentage <= '40' ? styles.yellow : styles.red
            }
          >{`${delegatorsPercentage}%`}</span>
          <span className={styles.spacer} />
          <span className={cx(styles.gray, styles.paddingRight)}>
            {' '}
            REWARD RATE
          </span>
          <span
            className={
              delegatorsPercentage <= '40' ? styles.yellow : styles.red
            }
          >
            {delegatorsReward}%
          </span>
        </div>

        <div className={styles.versionInfo}>
          v {packageInfo.version} © 2022 B.T.E. BOTLabs Trusted Entity GmbH
        </div>
      </div>
    </footer>
  )
}
