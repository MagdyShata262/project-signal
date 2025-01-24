import { Component, computed, effect, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { HeroService } from './heroes/hero.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'project-signal';
  datae: any = []

  // دالة لزيادة العداد
  increment() {
    this.count.update((value) => value + 1);
  }
  doubleCount = computed(() => this.count() * 2);
  // إنشاء إشارة بقيمة ابتدائية
  count = signal(0);
  constructor(private heroService: HeroService) {
    // مراقبة تغييرات الإشارة
    effect(() => {
      console.log('Data changed:', this.data());
    });

    // تأثير لتسجيل التغييرات
    effect(() => {
      console.log('Count updated:', this.count());
    });
    const shippingOptions = signal(['Ground', 'Air', 'Sea']);
    const selectedOption = linkedSignal(() => shippingOptions()[0]);
    console.log(selectedOption()); // 'Ground'
    selectedOption.set(shippingOptions()[2]);
    console.log(selectedOption()); // 'Sea'
    shippingOptions.set(['Email', 'Will Call', 'Postal service']);
    console.log(selectedOption()); // 'Email'
    const activeUser = signal({ id: 123, name: 'Morgan', isAdmin: true });
    const email = linkedSignal(() => ({ id: `${activeUser().name}@example.com` }), {
      // Consider the user as the same if it's the same `id`.
      equal: (a, b) => a.id === b.id,
    });
    // Or, if separating `source` and `computation`
    const alternateEmail = linkedSignal({
      source: activeUser,
      computation: user => ({ id: `${user.name}@example.com` }),
      equal: (a, b) => a.id === b.id,
    });
    // This update to `activeUser` does not cause `email` or `alternateEmail`
    // to update because the `id` is the same.
    activeUser.set({ id: 123, name: 'Morgan', isAdmin: false });

  }
  number1: number = 0

  // إنشاء إشارة لتخزين البيانات
  data = signal<any>(null);

  // إنشاء إشارة لتخزين رسالة الخطأ
  errorMessage = signal<string>('');



  ngOnInit(): void {
    // تحويل Observable إلى إشارة
    const data$ = this.heroService.getData2().pipe(
      // معالجة الأخطاء
      catchError((error) => {
        this.errorMessage.set(error.message); // تحديث رسالة الخطأ
        return of(null); // إرجاع قيمة فارغة لتجنب إيقاف الإشارة
      })
    );

    // تحويل Observable إلى إشارة
    this.data.set(toSignal(data$));
  }


  








  // async ngOnInit(): Promise<void> {
  //   try {
  //     const response = await this.heroService.getData();
  //     this.dataSignal.set(response); // تحديث الإشارة بالبيانات
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }











}

































































