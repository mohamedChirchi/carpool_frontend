import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubjects: Map<number, BehaviorSubject<number>> = new Map<number, BehaviorSubject<number>>();

  startCountdown(countdownDate: Date, rideId: number): Observable<number> {
    if (!this.countdownSubjects.has(rideId)) {
      this.countdownSubjects.set(rideId, new BehaviorSubject<number>(0));
    }

    const endTime = countdownDate.getTime();
    const currentTime$ = timer(0, 1000);

    return currentTime$.pipe(
      map(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        return Math.max(0, distance);
      }),
      //throttleTime(1000),
      takeWhile(distance => distance > 0),
      takeWhile(() => this.countdownSubjects.has(rideId)),
      map(distance => {
        this.countdownSubjects.get(rideId)?.next(distance);
        return distance;
      })
    );
  }

  getCountdownObservable(rideId: number): Observable<number> | undefined {
    return this.countdownSubjects.get(rideId)?.asObservable();
  }
}
