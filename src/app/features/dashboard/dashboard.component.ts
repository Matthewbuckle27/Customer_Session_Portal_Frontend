import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { SessionViewComponent } from '../session-view/session-view.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  activeTabColor = 'red';
  dataSource = new MatTableDataSource<Session>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getActiveSessions();
  }

  constructor(
    private dashboardService: DashboardService,private dialog: MatDialog,private http: HttpClient) {}

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
    'archive',
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
    'view',
  ];

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getArchiveSessions();
    } else {
      this.getActiveSessions();
    }
  }

  getActiveSessions() {
    this.dashboardService.getActiveSessions().subscribe((z) => {
      this.dataSource.data = z;
    });
  }

  getArchiveSessions() {
    this.dashboardService.getArchivedSessions().subscribe((z) => {
      this.dataSource.data = z;
    });
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
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
    const updatedDate = new Date(updatedOn);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - updatedDate.getTime();
    return timeDifference >= tenDaysInMilliseconds;
  }

  viewSession(session:any):void
  {
    const dialogref=this.dialog.open(SessionViewComponent,{
      width:'25%',
      data:session
    });
}
}

export interface Session {
  sessionName: string;
  sessionId: string; // Change this to string
  remarks: string;
  createdBy: string;
  updatedBy: string;
  createdOn: Date;
  updatedOn: Date;
  status: string;
  customerName: string;
}
