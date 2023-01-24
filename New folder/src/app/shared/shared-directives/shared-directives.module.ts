import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextDirective } from './text.directive';



@NgModule({
  declarations: [
    TextDirective
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    TextDirective

  ]
})
export class SharedDirectivesModule { }
