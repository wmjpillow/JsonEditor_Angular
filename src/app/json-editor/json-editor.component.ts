import { Component, OnInit, Renderer2 } from '@angular/core';
import * as JSONEditor from 'jsoneditor';
import { ConfirmResetComponent } from '../confirm-reset/confirm-reset.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {
  dialog: MatDialog;
  renderer: Renderer2;
  options: any;
  jsonEditorCode: any;
  jsonEditorTree: any;
  autoConvert: boolean;
  jsonCode: any;
  products: any = [];

  constructor(dialog: MatDialog, renderer: Renderer2, private httpClient: HttpClient) { 
    this.dialog = dialog;
    this.renderer = renderer;
  }

  ngOnInit() {
        this.options = {
            code : {
                mode: 'code',
                onChange: () => {
                    const json = this.jsonEditorCode.get();
                    if (json) {
                        this.jsonCode = json;
                        this.setLocalStorage('jsonCode', JSON.stringify(json));
                        // if (this.autoConvert) {
                            this.validateJSON('Tree');
                        // }
                    }
                }
            },
            tree : {
                mode: 'tree',
                onChange: () => {
                    const json = this.jsonEditorTree.get();
                    if (json) {
                        this.jsonCode = json;
                        this.setLocalStorage('jsonCode', JSON.stringify(json));
                        this.validateJSON('Code');
                    }
                }
            }
        };
        this.jsonEditorCode = new JSONEditor(document.getElementById('jsonEditorCode'), this.options.code);
        this.jsonEditorTree = new JSONEditor(document.getElementById('jsonEditorTree'), this.options.tree);
        // this.setDefaultOptions();
        this.httpClient.get("assets/json/admin.json").subscribe(data =>{
            data;
            console.log(data);
            this.autoConvert = JSON.parse(localStorage.getItem('autoConvertJSON'));
            this.jsonCode = localStorage.getItem('jsonCode') ? JSON.parse(localStorage.getItem('jsonCode')) : data;
            this.validateJSON('Tree');
            // if (this.autoConvert) {
                this.validateJSON('Code');
            // }
          })
  
    }

    validateJSON = (type) => {
        if (type === 'Tree') {
            this.jsonEditorTree.set(this.jsonCode);
        } else if (type === 'Code') {
            this.jsonEditorCode.set(this.jsonCode);
        }
    }

    setLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    }

    clearStorageOptions = () => {
        const dialogRef = this.dialog.open(ConfirmResetComponent, {
            restoreFocus: false
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                localStorage.removeItem('jsonCode');
                localStorage.removeItem('autoConvertJSON');
                // this.setDefaultOptions();
            }
        });
    }
}
