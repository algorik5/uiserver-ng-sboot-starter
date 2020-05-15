import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-aright2',
  template: `
    <nz-code-editor style="height:100px;" [(ngModel)]="editorData" [nzEditorOption]="{ language: 'json' }"></nz-code-editor>

  `,
  styles: [
  ]
})
export class ViewAright2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editorData = "";
}
