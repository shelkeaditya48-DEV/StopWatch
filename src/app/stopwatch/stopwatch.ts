
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css'
})
export class Stopwatch implements OnDestroy {

  displayTime = '00:00:00';
  isRunning = false;

  private startTimestamp = 0;
  private elapsedBeforeStart = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  start(): void {
    if (this.isRunning) return;

    this.startTimestamp = Date.now();
    this.isRunning = true;

    // Update immediately when Start is clicked
    this.updateTime();

    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 100);
  }

  private updateTime(): void {
    const elapsed =
      this.elapsedBeforeStart + Date.now() - this.startTimestamp;

    const totalSeconds = Math.floor(elapsed / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.displayTime =
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}`;

    this.cdr.detectChanges();
  }

  stop(): void {
    if (!this.isRunning) return;

    this.elapsedBeforeStart += Date.now() - this.startTimestamp;
    this.isRunning = false;

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.updateStoppedTime();
  }

  private updateStoppedTime(): void {
    const totalSeconds = Math.floor(this.elapsedBeforeStart / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.displayTime =
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}`;

    this.cdr.detectChanges();
  }

  reset(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    this.startTimestamp = 0;
    this.elapsedBeforeStart = 0;
    this.displayTime = '00:00:00';

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}
