import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState, ConnectWithCoachStore } from '../root-store';
import { ConnectWithCoach, ConnectWithVpInput } from '@gql';

@Injectable({
  providedIn: 'root',
})
export class ConnectWithCoachFacadeService
{
  constructor
    (
      private store: Store<IRootState>
    ) { }

  requestToSaveConnectWithCoachForm(connectWithCoach: ConnectWithCoach)
  {
    return this.store.dispatch(ConnectWithCoachStore.Actions.requestToSaveConnectWithCoachForm({ connectWithCoach }));
  }
  requestToSaveConnectWithVPForm(connectWithVP: ConnectWithVpInput)
  {
    return this.store.dispatch(ConnectWithCoachStore.Actions.requestToSaveConnectWithVPForm({ connectWithVP }));
  }
}
