export interface IUser {
	username: string
	password: string
}

export interface IUserWithId extends IUser {
	id: number
}
