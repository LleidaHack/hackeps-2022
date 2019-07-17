import { Component } from '@angular/core';
import { FirebaseService } from './services/firebae.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackeps2019';

  constructor(private fs: FirebaseService) {
    fs.all().subscribe(r => r.forEach(d => console.log(d.data())));
  }
}
