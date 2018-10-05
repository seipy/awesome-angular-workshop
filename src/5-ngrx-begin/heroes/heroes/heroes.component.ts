import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { FilterObserver } from '../../shared/filter';
// import { HeroService } from '../hero.service.1'; // messy 1st version
import { HeroService } from '../hero.service'; // clean version

@Component({
  selector: 'aw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  selectedHero: Hero;

  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  loading$: Observable<boolean>;

  constructor(public heroService: HeroService) {
    this.filterObserver = heroService.filterObserver;
    this.filteredHeroes$ = heroService.filteredEntities$;
    this.loading$ = this.heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  clear() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.unselect();
    this.heroService.delete(hero.id);
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroService.getAll();
    this.unselect();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  update(hero: Hero) {
    this.heroService.update(hero);
  }

  add(hero: Hero) {
    this.heroService.add(hero);
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}
