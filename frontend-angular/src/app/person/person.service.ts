import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "./model/person.model";

const personEndpoint = "http://localhost:3333/person";

@Injectable({
	providedIn: 'root'
})
export class PersonService {

	constructor(
		private http: HttpClient
	) {
	}

	getAll(): Observable<Person[]> {
		return this.http.get<Person[]>(`${personEndpoint}`)
	}

	get(personId: string): Observable<Person> {
		return this.http.get<Person>(`${personEndpoint}/${personId}`)
	}

	create(person: Person): Observable<any> {
		return this.http.post(`${personEndpoint}`, person)
	}

	update(person: Person): Observable<any> {
		return this.http.put(`${personEndpoint}/${person.id}`, person)
	}

	remove(id: string): Observable<any> {
		return this.http.delete(`${personEndpoint}/${id}`)
	}
}
