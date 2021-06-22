import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './CollatorList.module.css'
import { CollatorListRow } from '../CollatorListRow/CollatorListRow'
import { Data } from '../../types'

export interface Props {}

const dataSet: Data[] = [
  {
    collator: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
    stake: 200_000,
    delegators: 5,
    lowestStake: 10_000,
  },
  {
    collator: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
    stake: 600_000,
    delegators: 25,
    lowestStake: 20_000,
  },
  {
    collator: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
    stake: 400_000,
    delegators: 15,
    lowestStake: 15_000,
  },
]

enum SORT_BY {
  Rank,
  Rank_Reverse,
  TotalReward,
  Delegators,
  LowestStake,
  Favorite,
}

export const CollatorList: React.FC<Props> = ({}) => {
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
          <th className={styles.spacer}></th>
          <th
            className={classNames({
              [styles.activeSort]: sortBy === SORT_BY.Favorite,
            })}
            onClick={() => setSortBy(SORT_BY.Favorite)}
          >
            Collator{' '}
            <span
              className={styles.searchButton}
              onClick={() => setShowSearch(!showSearch)}
            >
              🔎
            </span>
          </th>
          <th
            className={classNames({
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
            className={classNames({
              [styles.activeSort]: sortBy === SORT_BY.TotalReward,
            })}
            onClick={() => setSortBy(SORT_BY.TotalReward)}
          >
            Total Reward
          </th>
          <th
            className={classNames({
              [styles.activeSort]: sortBy === SORT_BY.Delegators,
            })}
            onClick={() => setSortBy(SORT_BY.Delegators)}
          >
            Delegators
          </th>
          <th
            className={classNames({
              [styles.activeSort]: sortBy === SORT_BY.LowestStake,
            })}
            onClick={() => setSortBy(SORT_BY.LowestStake)}
          >
            Lowest Stake
          </th>
          <th>Action</th>
          <th className={styles.spacer}></th>
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
      <tbody>
        {data.map((entry) => (
          <CollatorListRow
            entry={entry}
            rank={ranks.get(entry.collator)}
            key={entry.collator}
          />
        ))}
      </tbody>
    </table>
  )
}
