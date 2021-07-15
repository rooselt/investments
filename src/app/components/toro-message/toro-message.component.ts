import {Component, Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
templateUrl:  'toro-message.component.html',
styleUrls: ['toro-message.component.scss'],
})
export  class  ToroMessageComponent {
    constructor(private  dialogRef:  MatDialogRef<ToroMessageComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
    }
    public  closeMe() {
        this.dialogRef.close();
    }
}