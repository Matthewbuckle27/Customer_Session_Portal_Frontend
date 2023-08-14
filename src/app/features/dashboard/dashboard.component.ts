import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NewSessionComponent } from '../new-session/new-session.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,  AfterViewInit{


  activeSessionsSelected = true;

  toggleSessions(active: boolean) {
    this.activeSessionsSelected = active;
  }

  sessions: Session[] = [];
  archived = false;
  activeSessionsActive = false;
  archivedSessionsActive = false;
  
  ngOnInit(): void {
    this.getActiveSessions();
  }

  openNewSessionModal() {
    const dialogRef = this.dialog.open(NewSessionComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  constructor(private dashboardService: DashboardService, private dialog:MatDialog){}
  displayedColumns: string[] = [
    'sessionName',
    'sessionID',
    'customerName',
    'createdBy',
    'updatedBy',
    'createdOn',
    'updatedOn',
    'status',
    'remarks',
    'actions'
  ];

  dataSource = new MatTableDataSource<Session>();

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getActiveSessions(){
    this.archived=false;
    this.activeSessionsActive = true;
    this.archivedSessionsActive = false;
    this.dashboardService.getActiveSessions().subscribe(
      (z) => {
        // this.sessions = z;
        this.dataSource.data = z;
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }
  getArchiveSessions(){
    this.archived=true;
    this.activeSessionsActive = false;
    this.archivedSessionsActive = true;
    this.dashboardService.getArchivedSessions().subscribe(
      (z) => {
        // this.sessions = z;
        this.dataSource.data = z
        console.log(this.dataSource.data);
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  editSession(session: Session) {
    console.log('Edit session:', session);
  }

  deleteSession(session: Session) {
    console.log('Delete session:', session);
  }

  archiveSession(session: Session) {
    console.log('Archive session:', session);
  }

  
  vieweSession(session: Session) {
    console.log('View session:', session);
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