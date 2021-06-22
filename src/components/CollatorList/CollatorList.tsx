import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import styles from './CollatorList.module.css'
import rowStyles from '../../styles/row.module.css'
import { CollatorListItem } from '../CollatorListItem/CollatorListItem'
import { Icon } from '../Icon/Icon'
import { Data } from '../../types'

export interface Props {
  dataSet: Data[]
}

enum SORT_BY {
  Rank,
  Rank_Reverse,
  TotalReward,
  Delegators,
  LowestStake,
  Favorite,
}

export const CollatorList: React.FC<Props> = ({ dataSet }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(SORT_BY.Rank)

  const [ranks, setRanks] = useState(new Map<string, number>())
  const [data, setData] = useState(dataSet)

  useEffect(() => {
    let ranks = new Map<string, number>()

    const sortedData = [...dataSet]
    sortedData.sort((a, b) => b.stake - a.stake)

    sortedData.forEach((value, index) => {
      ranks.set(value.collator, index + 1)
    })

    setRanks(ranks)
  }, [dataSet])

  useEffect(() => {
    let newData = !search.length
      ? [...dataSet]
      : dataSet.filter((value) => value.collator.startsWith(search))

    switch (sortBy) {
      case SORT_BY.Rank_Reverse: {
        newData.sort((a, b) => a.stake - b.stake)
        break
      }
      default:
      case SORT_BY.Rank: {
        newData.sort((a, b) => b.stake - a.stake)
        break
      }
    }
    setData(newData)
  }, [search, dataSet, sortBy])

  return (
    <table role="table" className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={rowStyles.spacer}></th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.Favorite,
            })}
            onClick={() => setSortBy(SORT_BY.Favorite)}
          >
            Collator{' '}
            <span
              className={styles.searchButton}
              onClick={(e) => {
                e.stopPropagation()
                setShowSearch(!showSearch)
              }}
            >
              <Icon type="search" />
            </span>
          </th>
          <th></th>
          <th
            className={cx({
              [styles.activeSort]:
                sortBy === SORT_BY.Rank || sortBy === SORT_BY.Rank_Reverse,
            })}
            onClick={() =>
              setSortBy(
                sortBy === SORT_BY.Rank ? SORT_BY.Rank_Reverse : SORT_BY.Rank
              )
            }
          >
            Total Stake (Rank)
          </th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.TotalReward,
            })}
            onClick={() => setSortBy(SORT_BY.TotalReward)}
          >
            Total Reward
          </th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.Delegators,
            })}
            onClick={() => setSortBy(SORT_BY.Delegators)}
          >
            Delegators
          </th>
          <th
            className={cx({
              [styles.activeSort]: sortBy === SORT_BY.LowestStake,
            })}
            onClick={() => setSortBy(SORT_BY.LowestStake)}
          >
            Lowest Stake
          </th>
          <th>
            <Icon type="tokens_white" />
          </th>
          <th className={rowStyles.spacer}></th>
        </tr>
        {showSearch && (
          <tr className={styles.search}>
            <th colSpan={42}>
              <div>
                <input
                  type="text"
                  placeholder="Search Collator"
                  value={search}
                  onInput={(event) => setSearch(event.currentTarget.value)}
                />
              </div>
            </th>
          </tr>
        )}
      </thead>
      <tbody className={styles.tableBody}>
        {data.map((entry) => (
          <CollatorListItem
            entry={entry}
            rank={ranks.get(entry.collator)}
            key={entry.collator}
          />
        ))}
      </tbody>
    </table>
  )
}
