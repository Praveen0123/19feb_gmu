import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const devToolsInstrument = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];
