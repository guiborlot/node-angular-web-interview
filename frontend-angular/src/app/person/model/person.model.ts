export class Person {
  constructor(
    public id: string | undefined,
    public name: string,
    public email: string,
    public phone: string
  ) {
  }
}

export class CreatedPersonResponse {
	constructor(
		public insertId: number
	) {
	}
}
