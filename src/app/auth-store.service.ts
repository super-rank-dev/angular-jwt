import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class AuthStoreService {
  private state = new BehaviorSubject<Object>({
    user: null as User | null
  });

  constructor() { }

  get $state() {
    return this.state;
  }

  public setUser(user: User) {
    const newState = { ...this.state.value, user };
    this.state.next(newState);
  }

  public removeUser() {
    const newState = { ...this.state.value, user: null };
    this.state.next(newState);
  }
}