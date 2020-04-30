export interface User {
    id: number,
    email: string,
    roles: string[],
    super: boolean
}

export const defaultUser: User = {
    id: 0,
    email: '',
    roles: [],
    super: false,
}
