import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { HeaderComponent } from '@shared/components/header/header.component';
import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-about',
    imports: [CommonModule, FormsModule, CounterComponent, WaveAudioComponent, HighlightDirective, HeaderComponent],
    templateUrl: './about.component.html'
})
export default class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber) 
  }

  setMessage(){
    this.message.set(Math.random().toString());
  }

}
