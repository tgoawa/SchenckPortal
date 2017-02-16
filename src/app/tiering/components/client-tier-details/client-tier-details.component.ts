import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IClientVal } from '../../models/clientTierVal.model';
import { ClientTierAnalysisService } from '../../services/client-tier-analysis.service';

@Component({
  selector: 'app-client-tier-details',
  templateUrl: './client-tier-details.component.html',
  styleUrls: ['./client-tier-details.component.css']
})
export class ClientTierDetailsComponent implements OnInit {
  menuItemId: number = 1;

  private title: string = 'Client Tier Analysis';
  private currentAnalysisData: Observable<IClientVal[]>;

  constructor(private clientTierAnalysisService: ClientTierAnalysisService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientTierAnalysisService.getParentValues(this.route.snapshot.params['id']);
    this.currentAnalysisData = this.clientTierAnalysisService.currentTierValues;
  }

}
