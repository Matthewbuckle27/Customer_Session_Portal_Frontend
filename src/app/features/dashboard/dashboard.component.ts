import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { IApiResponses, ISession } from '../models/session.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewSessionComponent } from '../view-session/view-session.component';
import { NewSessionComponent } from '../new-session/new-session.component';
import { EditSessionComponent } from '../edit-session/edit-session.component';
import { SessionService } from 'src/app/services/session-service/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  activeDisplayedColumns: string[] = [
    'sessionName',
    'sessionID',
    'customerName',
    'createdBy',
    'createdOn',
    'updatedOn',
    'status',
    'view',
    'edit',
    'delete',
    'archiveFlag',
  ];
  archiveDisplayedColumns: string[] = [
    'sessionName',
    'sessionID',
    'customerName',
    'createdBy',
    'createdOn',
    'updatedOn',
    'status',
    'view',
  ];

  dataSource = new MatTableDataSource<ISession>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  totalItems = 0;
  pageSizeOptions = [5, 10, 15];
  activeSessionsTab = true;
  archiveSessionsTab = false;
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  errorMessage = false;

  constructor(
    private dashboardService: SessionService,
    private dialog: MatDialog
  ) {}

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.archiveSessionsTab = true;
      this.activeSessionsTab = false;
    } else {
      this.activeSessionsTab = true;
      this.archiveSessionsTab = false;
    }
    this.totalItems = 0;
    this.currentPage = 0;
    this.paginator.pageIndex = 0;
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData();
  }

  getData() {
    this.dataSource.paginator = null;
    const sessionStatus = this.activeSessionsTab === true ? 'A' : 'X';
    const offset = this.currentPage;
    this.dashboardService
      .getSessions(sessionStatus, offset, this.pageSize)
      .subscribe(
        (response: IApiResponses) => {
          this.dataSource.data = response.content;
          this.totalItems = response.totalElements;
        },
        (error: Error) => {
          this.errorMessage = true;
          console.log(error);
        }
      );
  }

  editSession(session: ISession) {
    const dialogRef = this.dialog.open(EditSessionComponent, {
      width: '35%',
      data: session,
    });
    dialogRef.afterClosed().subscribe((updatedSession: ISession) => {
      if (updatedSession) {
        this.getData();
      }
    });
  }

  deleteSession(session: ISession) {
    const sessionId = session.sessionId;
  }

  archiveSession(session: ISession) {
    const sessionId = session.sessionId;
  }

  viewSession(session: ISession): void {
    const dialogref = this.dialog.open(ViewSessionComponent, {
      width: '32%',
      height: '60%',
      data: session,
    });
    console.log(session.sessionId);
  }

  createSessionDialog() {
    const dialogRef = this.dialog.open(NewSessionComponent, {
      width: '28%',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      result;
    });
  }

  transformSessionID(sessionId: string): string {
    if (sessionId.length >= 2) {
      const prefix = sessionId.slice(0, 10);
      const maskedSuffix = 'XXXX';
      return prefix + maskedSuffix;
    } else {
      return sessionId;
    }
  }
}
