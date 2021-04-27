import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, OccupationStore } from '../root-store';
import { Occupation, Pathway } from '@gql';


@Injectable({
  providedIn: 'root'
})
export class OccupationFacadeService
{
  constructor
    (
      private store: Store<IRootState>
    ) { }


  requestClearSelectedOccupationModel()
  {
    return this.store.dispatch(OccupationStore.Actions.requestClearSelectedOccupationModel());
  }
  requestOccupationDetails(occupationId: string)
  {
    return this.store.dispatch(OccupationStore.Actions.requestOccupationDetails({ occupationId }));
  }
  requestOccupationPreview(occupationId: string)
  {
    return this.store.dispatch(OccupationStore.Actions.requestOccupationPreview({ occupationId }));
  }


  // GET OCCUPATION DETAILS BASED ON AREA OF STUDY NAME
  getOccupationDetailsByName(): Observable<Occupation[]>
  {
    return this.store.pipe(select(OccupationStore.Selectors.getOccupationCardList));
  }
  getOccupationDetails(): Observable<Occupation>
  {
    return this.store.pipe(select(OccupationStore.Selectors.getOccupationDetails));
  }
  getOccupationCardList(): Observable<Occupation[]>
  {
    return this.store.pipe(select(OccupationStore.Selectors.getOccupationCardList));
  }
  getOccupationPreview(): Observable<Occupation>
  {
    return this.store.pipe(select(OccupationStore.Selectors.getOccupationPreview));
  }


  //PATHWAY
  setSelectedPathwayFromAreaOfStudyOccupationList(pathway: Pathway)
  {
    return this.store.dispatch(OccupationStore.Actions.setSelectedPathwayFromAreaOfStudyOccupationList({ pathway }));
  }
  setSelectedPathwayFromOccupationList(pathway: Pathway)
  {
    return this.store.dispatch(OccupationStore.Actions.setSelectedPathwayFromOccupationList({ pathway }));
  }
  setSelectedPathwayFromPathwayDetails(pathway: Pathway)
  {
    return this.store.dispatch(OccupationStore.Actions.setSelectedPathwayFromPathwayDetails({ pathway }));
  }
  setSelectedPathwayFromOccupationPathwayList(pathway: Pathway)
  {
    return this.store.dispatch(OccupationStore.Actions.setSelectedPathwayFromOccupationPathwayList({ pathway }));
  }
  getSelectedPathway(): Observable<Pathway>
  {
    return this.store.pipe(select(OccupationStore.Selectors.getSelectedPathway));
  }
}
