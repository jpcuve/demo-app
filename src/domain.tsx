export interface Profile {
  identified: boolean,
  token: string,
  name: string,
  roles: string[],
}

export const defaultProfile: Profile = {
  identified: false,
  token: '',
  name: '',
  roles: [],
}
