import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project-signal';



  // إنشاء إشارة بقيمة ابتدائية
  count = signal(0);
  constructor() {
    effect(() => {
      console.log(`The current count is: ${this.count()}`);
    });




    effect((onCleanup) => {
      const user = this.currentUser();
      const timer = setTimeout(() => {
        console.log(`1 second ago, the user became ${user}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });

  }

   currentUser() {
    console.log(`1 second ago, the user became `);

  }
  




  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.count.set(22);
    this.count.update(value => value + 1);
    // Signals are getter functions - calling them reads their value.
    console.log('The count is:نشاء إشارة بقيمة ابتدائية ' + this.count());



  }
}

