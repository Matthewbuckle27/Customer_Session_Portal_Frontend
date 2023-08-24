import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  const dashboardServiceMock = {
    getSessions: jest.fn().mockReturnValue(of([])),
  };

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock },
      ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getActiveSessions when the active tab is changed', () => {
    const tabChangeEvent = { index: 0 } as MatTabChangeEvent;
    const dashboardService = TestBed.inject(DashboardService);
    component.onTabChange(tabChangeEvent);
    expect(dashboardService.getSessions).toHaveBeenCalled();
  });
});
