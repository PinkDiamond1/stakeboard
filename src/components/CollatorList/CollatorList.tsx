import React, { useEffect, useState } from 'react'
import { Collator } from '../Collator/Collator'
import styles from './CollatorList.module.css'

export interface Props {}

interface Data {
  collator: string
  stake: string
  delegators: number
  lowestStake: string
}

const dataSet: Data[] = [
  {
    collator: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
    stake: '200.000',
    delegators: 5,
    lowestStake: '10.000',
  },
  {
    collator: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
    stake: '600.000',
    delegators: 25,
    lowestStake: '20.000',
  },
]

const leftFillZero = (num: number, length: number) =>
  num.toString().padStart(length, '0')

export const CollatorList: React.FC<Props> = ({}) => {
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')

  const [data, setData] = useState(dataSet)

  useEffect(() => {
    if (!search.length) return setData(dataSet)

    const newData = dataSet.filter((value) => value.collator.startsWith(search))
    setData(newData)
  }, [search])

  return (
    <table role="table" className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.spacer}></th>
          <th>
            Collator{' '}
            <span
              className={styles.searchButton}
              onClick={() => setShowSearch(!showSearch)}
            >
              🔎
            </span>
          </th>
          <th>Total Stake (Rank)</th>
          <th>Total Reward</th>
          <th>Delegators</th>
          <th>Lowest Stake</th>
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
          <tr className={styles.row}>
            <td className={styles.spacer}></td>
            <td>
              <Collator address={entry.collator} />
            </td>
            <td>
              {entry.stake} ({leftFillZero(index + 1, 3)})
            </td>
            <td></td>
            <td>{leftFillZero(entry.delegators, 2)} / 25</td>
            <td>{entry.lowestStake}</td>
            <td>Add Stake</td>
            <td className={styles.spacer}></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
