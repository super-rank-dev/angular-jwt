import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/ngrx/models/app-state.model';
import { CourseItem } from 'src/ngrx/models/courseItem.model';
import { NgForm } from '@angular/forms';
import { AddItemAction } from 'src/ngrx/actions/course.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../assets/css/bootstrap.min.css'
  ]
})
export class HomeComponent implements OnInit {

  courseItems!: Observable<Array<CourseItem>>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.courseItems = this.store.select(({ course }) => (course));
  }

  addCourse(form: NgForm) {
    this.store.dispatch(new AddItemAction(form.value));
    form.reset();
  }
}
