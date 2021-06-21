import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Collator } from '../Collator/Collator'
import styles from './CollatorList.module.css'

export interface Props {}

interface Data {
  collator: string
  stake: number
  delegators: number
  lowestStake: number
}

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
]

enum SORT_BY {
  Rank,
  Rank_Reverse,
  TotalReward,
  Delegators,
  LowestStake,
  Favorite,
}

const leftFillZero = (num: number | undefined, length: number) => {
  if (!num) num = 0
  return num.toString().padStart(length, '0')
}

const numberFormat = new Intl.NumberFormat()

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
        {data.map((entry, index) => (
          <tr className={styles.row} key={entry.collator}>
            <td className={styles.spacer}></td>
            <td>
              <Collator address={entry.collator} />
            </td>
            <td>
              {numberFormat.format(entry.stake)} (
              {leftFillZero(ranks.get(entry.collator), 3)})
            </td>
            <td></td>
            <td>{leftFillZero(entry.delegators, 2)} / 25</td>
            <td>{numberFormat.format(entry.lowestStake)}</td>
            <td>Add Stake</td>
            <td className={styles.spacer}></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
