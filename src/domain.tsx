const defaultLocalTime = '00:00:00'

export interface Token {
  token: string,
}

export const defaultToken: Token = {
  token: '',
}

export interface Profile {
  identified: boolean,
  name: string,
  roles: string[],
}

export const defaultProfile: Profile = {
  identified: false,
  name: '<anonymous>',
  roles: [],
}

export interface CurrencyGroup {
  id: number,
  name: string,
  priority: number,
}

export const defaultCurrencyGroup: CurrencyGroup = {
  id: 0,
  name: 'DEFAULT',
  priority: 0,
}

export interface Position {

}

export const defaultPosition: Position = {

}

export interface Bank {
  id: number,
  name: string,
  opening: string,
  settlementCompletionTarget: string,
  closing: string,
  minimumPayIn : Position,
}

export const defaultBank: Bank = {
  id: 0,
  name: 'DEFAULT_BANK',
  opening: defaultLocalTime,
  settlementCompletionTarget: defaultLocalTime,
  closing: defaultLocalTime,
  minimumPayIn : defaultPosition,
}

export interface Account {
  id: number,
  bankId: number,
  name: string,
  shortPositionLimit: Position,
}

export const defaultAccount: Account = {
  id: 0,
  bankId: 0,
  name: 'DEFAULT_ACCOUNT',
  shortPositionLimit: defaultPosition,
}

export interface Currency {
  id: number,
  bankId: number,
  currencyGroupId: number,
  coin: string,
  opening: string,
  fundingCompletionTarget: string,
  closing: string,
  close: string,
}

export const defaultCurrency: Currency = {
  id: 0,
  bankId: 0,
  currencyGroupId: 0,
  coin: 'XXX',
  opening: defaultLocalTime,
  fundingCompletionTarget: defaultLocalTime,
  closing: defaultLocalTime,
  close: defaultLocalTime,
}

export interface Perpetual {
  profile: Profile,
  account: Account,
  bank: Bank,
  currencyGroups: CurrencyGroup[],
  currencies: Currency[]
}

export const defaultPerpetual: Perpetual = {
  profile: defaultProfile,
  account: defaultAccount,
  bank: defaultBank,
  currencyGroups: [],
  currencies: [],
}

export interface Instruction {
  id: number,
  principal: string,
  counterParty: string,

}

export const defaultInstruction: Instruction = {
  id: 0,
  principal: '',
  counterParty: '',

}