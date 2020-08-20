import { PipesPipe } from './pipes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PipesPipe],
  exports: [PipesPipe], //Se importa y se declara el pip creado en este apartadopara el tratado de imags
  imports: [CommonModule],
})
export class PipesModule {}
