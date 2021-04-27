import { createAction, props } from '@ngrx/store';
import { ConnectWithCoach, ConnectWithVpInput } from '@gql';


export const requestToSaveConnectWithCoachForm = createAction
  (
    '[ConnectWithCoach] request to save connect with coach form',
    props<{ connectWithCoach: ConnectWithCoach; }>()
  );

export const connectWithCoachReceivedFromServer = createAction
  (
    '[ConnectWithCoach] connect with coach received from server',
    props<{ connectWithCoach: ConnectWithCoach; }>()
  );

export const connectCoachFailure = createAction
  (
    '[ConnectWithCoach] failure',
    props<{ error: any; }>()
  );

export const requestToSaveConnectWithVPForm = createAction
  (
    '[ConnectWithCoach] request to save connect with VP form',
    props<{ connectWithVP: ConnectWithVpInput; }>()
  );

export const connectWithVPReceivedFromServer = createAction
  (
    '[ConnectWithCoach] connect with VP received from server',
    props<{ result: string; }>()
  );
