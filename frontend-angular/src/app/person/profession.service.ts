import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profession} from "./model/profession.model";
import {CreatedPersonResponse} from "./model/person.model";

const professionEndpoint = "http://localhost:3333/profession";

@Injectable({
	providedIn: 'root'
})
export class ProfessionService {

	constructor(
		private http: HttpClient
	) {
	}

	get(personId: string): Observable<Profession> {
		return this.http.get<Profession>(`${professionEndpoint}/${personId}`)
	}

	create(personId: string, professionName: string): Observable<CreatedPersonResponse> {
		return this.http.post<CreatedPersonResponse>(`${professionEndpoint}`, {
			name: professionName,
			personId: personId
		})
	}

	update(profession: Profession): Observable<any> {
		return this.http.put(`${professionEndpoint}/${profession.id}`, {name: profession.name})
	}
}
