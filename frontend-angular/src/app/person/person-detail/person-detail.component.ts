import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CreatedPersonResponse, Person} from "../model/person.model";
import {Observable, of, switchMap, tap} from "rxjs";
import {PersonService} from "../person.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfessionService} from "../profession.service";
import {Profession} from "../model/profession.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'app-person-detail',
	templateUrl: './person-detail.component.html',
	styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {

	person: Person | undefined = undefined
	profession: Profession | undefined = undefined
	personForm!: FormGroup;
	isCreate: boolean = false;

	constructor(private route: ActivatedRoute,
							private router: Router,
							private personService: PersonService,
							private dialog: MatDialog,
							private professionService: ProfessionService
	) {
	}

	ngOnInit(): void {
		this.loadPersonForm();

		this.route.paramMap.pipe(
			switchMap(params => {
				const selectedId = params.get('id');
				this.isCreate = selectedId === null; // Using nullish coalescing for cleaner check

				if (selectedId) {
					return this.personService.get(selectedId).pipe(
						tap(res => {
							this.person = res;
							this.loadProfession(this.person.id || '');
						})
					);
				} else {
					return of(null); // Returning an observable of null for create case
				}
			})
		).subscribe();
	}

	private loadProfession(personId: string) {
		this.professionService.get(personId).subscribe(res => {
				this.profession = res
				this.loadPersonForm()
			}
		)
	}

	private loadPersonForm() {
		this.personForm = new FormGroup({
			id: new FormControl(this.person?.id || ''),
			name: new FormControl(this.person?.name || '', [Validators.required]),
			email: new FormControl(this.person?.email || '', [Validators.required]),
			phone: new FormControl(this.person?.phone || '', [Validators.required]),
			profession: new FormControl(this.profession?.name || '', [Validators.required]),
		})
	}

	get name() {
		return this.personForm.get('name');
	}

	get email() {
		return this.personForm.get('email');
	}

	get phone() {
		return this.personForm.get('phone');
	}

	get professionName() {
		return this.personForm.get('profession');
	}

	save() {
		if (this.personForm.invalid) {
			return;
		}
		if (this.isCreate) {
			this.createPerson()
		} else {
			this.updatePerson()
		}
	}

	private updatePerson() {
		const personReq: Person = {
			id: this.personForm.value.id,
			name: this.personForm.value.name,
			email: this.personForm.value.email,
			phone: this.personForm.value.phone
		}
		this.personService.update(personReq).subscribe(() => {
				if (this.profession?.id == undefined) {
					this.createProfession(personReq.id || '')
				} else {
					this.updateProfession()
				}
			}
		)
	}

	private updateProfession() {
		const professionReq: Profession = {
			id: this.profession?.id,
			name: this.personForm.value.profession,
			person_id: this.personForm.value.id
		}
		this.professionService.update(professionReq).subscribe(() => this.back())
	}

	private createPerson() {
		const personReq: Person = {
			id: undefined,
			name: this.personForm.value.name,
			email: this.personForm.value.email,
			phone: this.personForm.value.phone
		}
		this.personService.create(personReq).subscribe((res: CreatedPersonResponse) =>
			this.createProfession(res.insertId.toString())
		)
	}

	private createProfession(personId: string) {
		this.professionService.create(personId, this.personForm.value.profession).subscribe(() => this.back())
	}

	back() {
		this.router
			.navigateByUrl("/")
	}

	saveDialog(template: TemplateRef<any>) {
		this.dialog.open(template)
	}

}
