import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NewSessionComponent } from '../new-session/new-session.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  activeTabColor='red';
  
  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;

 
  
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }

  ngOnInit(): void {
    this.getActiveSessions();
  }

  constructor(private dashboardService: DashboardService, private dialog:MatDialog){}
  activeDisplayedColumns: string[] = [
    'sessionName',
    'sessionID',
    'customerName',
    'createdBy',
    'updatedBy',
    'createdOn',
    'updatedOn',
    'status',
    'view',
    'edit',
    'delete',
    'archive'
  ];

  archiveDisplayedColumns: string[] = [
    'sessionName',
    'sessionID',
    'customerName',
    'createdBy',
    'updatedBy',
    'createdOn',
    'updatedOn',
    'status',
    'view'
  ];

  dataSource = new MatTableDataSource<Session>();

  openNewSessionModal() {
    const dialogRef = this.dialog.open(NewSessionComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getArchiveSessions();
    }else {
      this.getActiveSessions(); 
    }
    }

  getActiveSessions(){
    this.dashboardService.getActiveSessions().subscribe(
      (z) => {
        this.dataSource.data = z;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  getArchiveSessions(){
    this.dashboardService.getArchivedSessions().subscribe(
      (z) => {
        this.dataSource.data = z
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  transformSessionID(sessionID: string): string {
    if (sessionID.length >= 8) {
      const prefix = sessionID.slice(0, 6);
      const maskedSuffix = 'XXXX';
      return prefix + maskedSuffix;
    } else {
      return sessionID;
    }
  }

  isArchiveable(updatedOn: string): boolean {
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    const updatedDate = new Date(updatedOn);
    const currentDate = new Date();
    
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    return timeDifference >= tenDaysInMilliseconds;
  }
  
  
  
  


  

}

export interface Session {
  sessionName: string;
  sessionID: number;
  remarks: string;
  createdBy: string;
  updatedBy: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;
  customerName: string;
}