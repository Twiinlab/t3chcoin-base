import { Component, OnInit } from '@angular/core';

import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  candidates: Array<any>;
  newCandidateName: String;

  constructor(
    private candidatesService: CandidatesService
  ) { }

  ngOnInit() {
    this.initCandidates();
  }

  initCandidates() {
    this.candidatesService.getCandidates()
      .subscribe( result => { this.candidates = result; });
  }

  onAddCandidate(newCandidateName){
    this.candidatesService.addCandidate(newCandidateName)
    .subscribe( result => {
      this.initCandidates();
      this.newCandidateName = null;
    });
  }

  onAddVote(candidateName){
    this.candidatesService.voteCandidate(candidateName)
    .subscribe( result => { this.initCandidates(); });
  }

}
