import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

const MatComponent = [
  MatTabsModule,
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
];

@NgModule({
  imports: [MatComponent],
  exports: [MatComponent],
})
export class MaterialModule {}
