import React from 'react'
import { Instruction, Currency } from '../domain'

interface Props {
  instructions: Instruction[],
  currencies: Currency[],
}

const StatementTable: React.FC<Props> = props => {
  const {currencies, instructions} = props
  return (
    <table>
      <tr>
        <th>Book #</th>
        <th>Moment</th>
        <th>Type</th>
        {currencies.map(currency => {
          return (
            <th>{currency.coin}</th>
          )
        })}
        <th>Reference</th>
      </tr>
      {instructions.map(instruction => {
        return (
          <tr>
            <td>{instruction.bookId}</td>
            <td>{instruction.booked}</td>
            <td>{instruction.type}</td>
            {currencies.map(currency => {
              return (
                <td>{instruction.amount[currency.coin] || 0}</td>
              )
            })}
            <td>{instruction.reference}</td>
          </tr>
        )
      })}
    </table>
  )

}

export default StatementTable