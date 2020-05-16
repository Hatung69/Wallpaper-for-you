import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
const MatComponent = [MatTabsModule, MatDialogModule];

@NgModule({
  imports: [MatComponent],
  exports: [MatComponent],
})
export class MaterialModule {}
