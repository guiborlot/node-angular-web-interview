import {Component, OnInit, TemplateRef} from '@angular/core';
import {PersonService} from "../person.service";
import {Person} from "../model/person.model";
import {Profession} from "../model/profession.model";
import {ProfessionService} from "../profession.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
	selector: 'app-person-list',
	templateUrl: './person-list.component.html',
	styleUrl: './person-list.component.scss'
})
export class PersonListComponent implements OnInit {

	persons: Person[] = []
	professions: Profession[] = []
	selectedPersonId: string = ""

	constructor(private personService: PersonService, private professionService: ProfessionService, private dialog: MatDialog,) {
	}

	ngOnInit(): void {
		this.personService.getAll().subscribe(res => {
			this.persons = res;
			this.persons.forEach(person => {
				this.loadProfession(person.id || '')
			})
		})
	}

	private loadProfession(personId: string) {
		this.professionService.get(personId).subscribe(res => {
			if(res != undefined) {
				this.professions.push(res)
			}
		})
	}

	getProfessionName(personId: string) {
		return this.professions.find(profession => profession.person_id === personId)?.name
	}

	removeDialog(personId: string, template: TemplateRef<any>) {
		this.selectedPersonId = personId
		this.dialog.open(template)
	}

	remove() {
		this.personService.remove(this.selectedPersonId).subscribe(() => {
			this.ngOnInit()
		})
	}

	addPerson() {

	}
}
