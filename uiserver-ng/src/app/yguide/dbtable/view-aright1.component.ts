import { Component, OnInit } from '@angular/core';
import { AatableService } from 'src/app/aservice/aatable.service';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { zTestDataUtil } from 'src/app/autil/zTestDataUtil';
import { ArrayUtil } from 'src/app/autil/ArrayUtil';
import { DateUtil } from 'src/app/autil/DateUtil';
import { MathUtil } from 'src/app/autil/MathUtil';

@Component({
  selector: 'app-view-aright1',
  template: `
  <nz-table #myTable nzBordered [nzData]="getTableData()" nzSize="small">
  <thead>
    <tr>
      <ng-container *ngIf="checkable"><th nzShowCheckbox [nzDisabled]="true"></th></ng-container>
      <ng-container *ngFor="let column of getTableColumns()">
        <th *ngIf="column.show">{{column["name"]}}</th>
      </ng-container>
    </tr>
  </thead>
  <tbody>
    <ng-container *ngFor="let data of myTable.data">
      <tr>        
        <ng-container *ngIf="checkable"><td nzShowCheckbox [(nzChecked)]="data.checked" (nzCheckedChange)="selectRow(data)"></td></ng-container>
        <ng-container *ngFor="let column of getTableColumns()">
          <td *ngIf="column.show">
            <ng-container *ngIf="!editable">{{data[column["name"]]}}</ng-container>
            <ng-container *ngIf="editable"> <input type="text" nz-input [(ngModel)]='data[column["name"]]'/></ng-container>
          </td>
        </ng-container>
      </tr>
    </ng-container>
  </tbody>
</nz-table>      
  `,
  styles: [
  ]
})
export class ViewAright1Component implements OnInit {

  constructor(private table: AatableService, private pubsub: AapubsubService,private logging:AaloggingService) {}

  topicprefix = "myname.table";//this.topicprefix+".datas"

  ngOnInit() {
    //pubsub-table 샘플
    this.pubsub.sub(this.topicprefix+".datas", datas => {
      this.table.setData(datas);//this.table.clearData(); this.table.addDatas(datas);
    });
    this.pubsub.sub(this.topicprefix+".data", data => {
      if(Array.isArray(data)) this.table.addDatas(data);
      else this.table.addData(data);
    });
    this.pubsub.sub(this.topicprefix+".clear", data => {
      this.table.clearColumns();
      this.table.clearData();
    });

    //pubsub-table 샘플 - 컬럼 show
    this.pubsub.sub(this.topicprefix+".columnshow", column => {
      this.table.changeColumnShow(column);
    });

    this.tableInit();
  }

  getTableData() { return this.table.getData(); }
  getTableColumns() { return this.table.getColumns(); }
  editable = false;
  checkable = true;
  selectRow(data) {
    // console.log("====== selectRow data=" + JSON.stringify(data));
    this.pubsub.pub(this.topicprefix+".selectdata", data);
  }
  tableInit()
  {
    ////////////////////////////////////////////////////////// edit  
    // this.table.setEditable(false);
    ////////////////////////////////////////////////////////// checkable
    // this.table.setCheckable(true);

    ////////////////////////////////////////////////////////// testdata  
    this.test_datas();
  }




  
  /////////////////////////////////////////////////////////// button
  buttonStatus = "-";
  buttonStatusClick()
  {
    this.logging.debug("======= buttonStatusClick # "+ this.buttonStatus);
  }

  createtable(){}
  savelocalstorage(){}




  ////////////////////////////////////////////////////////// testdata  
  test_datas()
  {
    //let datas = this.table.test_data();
    let datas = zTestDataUtil.test_data();
    ArrayUtil.setColumnValue(datas,"checked",false);//datas.forEach(data=>data["checked"]=true);
    this.pubsub.pub(this.topicprefix+".datas",datas);//this.table.setData(datas);
  }
  test_no = 0;
  test_data() { 
    this.test_no++; let curdate = new Date(); let date = DateUtil.addDays(curdate,this.test_no);
    let value = MathUtil.random(0,10);
    let data = {host:"host-x",ip:"ip-x",date:date,cpu:value,memory:value*2,checked:false};
    this.pubsub.pub(this.topicprefix+".data",data);//this.table.addDatas(data);
  }
  test_columnshow()
  {
    this.pubsub.pub(this.topicprefix+".columnshow","host");//this.table.changeColumnShow("host");
  }
  test_editable = false; test_edit() { this.test_editable = this.test_editable?false:true; this.editable = this.test_editable; }
  test_checkable = false; test_check() { this.test_checkable = this.test_checkable?false:true; this.checkable = this.test_checkable; }
  test_checkedall = false; test_checkall() { this.test_checkedall = this.test_checkedall?false:true; ArrayUtil.setColumnValue(this.table.getData(),"checked",this.test_checkedall); }

}
