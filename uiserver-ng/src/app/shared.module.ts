import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzGridModule, NzIconModule, NzLayoutModule, NzMenuModule, NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule,
    FormsModule,ReactiveFormsModule,
    NgZorroAntdModule,NzCodeEditorModule 
  ]
})
export class SharedModule { }
