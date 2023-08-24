import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardService } from '../../services/dashboard.service';
import { NewSessionComponent } from '../new-session/new-session.component';
import { EditSessionComponent } from '../edit-session/edit-session.component';
import { SessionService } from '../../services/session/session.service';

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
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private sessionService:SessionService
  ) {}

  createSessionDialog() {
    const dialogRef = this.dialog.open(NewSessionComponent, {
      width: '27%',
      height:'80%'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  editSession(session:Session){
    const dialogRef=this.dialog.open(EditSessionComponent,{
      width:'35%',
      data:session
    })
    dialogRef.afterClosed().subscribe((updatedSession: Session) => {
      if (updatedSession) {
        this.getActiveSessions();
      }
    });
  }

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
