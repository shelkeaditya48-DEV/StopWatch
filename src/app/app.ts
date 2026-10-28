
import { Component } from '@angular/core';
import { Stopwatch } from './stopwatch/stopwatch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Stopwatch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
