import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaCovidComponent } from './normativa-covid.component';

describe('NormativaCovidComponent', () => {
  let component: NormativaCovidComponent;
  let fixture: ComponentFixture<NormativaCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormativaCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativaCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
