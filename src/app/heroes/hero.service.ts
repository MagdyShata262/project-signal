import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';



export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});





@Injectable({
  providedIn: 'root'
})
export class HeroService {


  // إنشاء إشارة لتخزين البيانات
  dataSignal = signal<any>(null);

  private apiUrl = 'https://jsonplaceholder.typicode.com'; // رابط API

  constructor(private http: HttpClient) { }

  // دالة لاستدعاء API
  getData2() {
    return this.http.get(`${this.apiUrl}/todos/1`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 0) {
      errorMessage = 'No internet connection or server is down.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (error.status === 401) {
      errorMessage = 'You are not authorized to access this resource.';
    } else if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    }
    return throwError(() => new Error(errorMessage));
  }

  getData(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts').pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  // إنشاء BehaviorSubject بقيمة ابتدائية
  private userSubject = new BehaviorSubject<string>('Guest');

  // تعريض BehaviorSubject كـ Observable
  public user$ = this.userSubject.asObservable();



  // دالة لتحديث قيمة المستخدم
  updateUser(name: string) {
    this.userSubject.next(name);
  }

}
