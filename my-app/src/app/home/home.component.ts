import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form (submit)="$event.preventDefault(); filterResults(filter.value)">
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      @for (housingLocation of filteredLocationList; track housingLocation.id){
        <app-housing-location [housingLocation]="housingLocation">
        </app-housing-location>
      }
    </section>
  `,
  styleUrl: './home.component.css'  
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = []; 

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

}


// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, HousingLocationComponent],
//   template: `
//     <section>
//       <form (submit)="$event.preventDefault(); filterResults(filter.value); query.set(filter.value)">
//         <input type="text" placeholder="Filter by city" #filter />
//         <button class="primary" type="submit">Search</button>
//       </form>
//     </section>
//     <section class="results">
//       @for (housingLocation of filteredLocationList; track housingLocation.id){
//         <app-housing-location [housingLocation]="housingLocation">
//         </app-housing-location>
//       }
//     </section>
//   `,
//   styleUrl: './home.component.css'  
// })

// export class HomeComponent {
//   readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

//   housingLocationList: WritableSignal<HousingLocation[]> = signal([]);
//   test = computed(() => this.housingLocationList().length);
//   housingService: HousingService = inject(HousingService);
//   filteredLocationList: HousingLocation[] = []; 
//   query = signal('');

//   constructor() {
//     this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
//       this.housingLocationList.set(housingLocationList);
//       this.filteredLocationList = housingLocationList;
//     });

//   }

//   filterResults(text: string) {
//     if (!text) this.filteredLocationList = this.housingLocationList;

//     this.filteredLocationList = this.housingLocationList.filter(
//       housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
//     );
//   }

//   async httpresponse() {

//   }


// }






