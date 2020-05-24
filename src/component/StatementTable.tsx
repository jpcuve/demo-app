import React, { Fragment } from 'react'
import { Instruction, Perpetual } from '../domain'

interface Props {
  instructions: Instruction[],
  perpetual: Perpetual,
}

const StatementTable: React.FC<Props> = props => {
  const {perpetual: {currencies, account}, instructions} = props
  return (
    <table>
      <thead>
        <tr>
          <th>Book #</th>
          <th>Moment</th>
          <th>Type</th>
          <th>Counterparty</th>
          {currencies.map(currency => {
            return (
              <th key={currency.coin} colSpan={2}>{currency.coin}</th>
            )
          })}
          <th>Reference</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          {currencies.map(currency => {
            return (
              <Fragment key={currency.coin}>
                <th>DB</th>
                <th>CR</th>
              </Fragment>
            )
          })}
          <th></th>
        </tr>
      </thead>
      <tbody>
      {instructions.map(instruction => {
        return (
          <tr>
            <td key={instruction.id}>{instruction.bookId}</td>
            <td>{instruction.booked}</td>
            <td>{instruction.type}</td>
            <td>{JSON.stringify(instruction.partyIds)}</td>
            {currencies.map(currency => {
              const rawAmount = instruction.amount[currency.coin] || 0
              var dbAmount = rawAmount
              var crAmount = 0
              if (instruction.crId === account.id){
                dbAmount = 0
                crAmount = rawAmount
              }
              return (
                <>
                  <td className="amount">{dbAmount !== 0 ? dbAmount.toFixed(2) : ''}</td>
                  <td className="amount">{crAmount !== 0 ? crAmount.toFixed(2) : ''}</td>
                </>
              )
            })}
            <td>{instruction.reference}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )

}

export default StatementTable