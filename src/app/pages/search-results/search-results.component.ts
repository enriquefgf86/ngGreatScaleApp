import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from 'src/app/services/searches.service';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  public searchUsers: User[] = [];
  public searchHospitals: Hospital[] = [];
  public searchDoctors: Doctor[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchAll: SearchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchInit();
  }

  searchInit() {
    this.activatedRoute.params.subscribe((response) => {
      console.log(response.textTerm);

      this.globalSearch(response.textTerm);
    });
  }

  globalSearch(text: String) {
    this.searchAll.globalSearch(text).subscribe((response: any) => {
      console.log(response);

      this.searchUsers = response.users;
      this.searchDoctors = response.doctors;
      this.searchHospitals = response.hospitals;
    });
  }

  toDoctor(doctor: Doctor) {
    return this.router.navigate([`doctor/${doctor.id}`]);
  }
}
