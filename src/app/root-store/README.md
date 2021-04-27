# NgRx Store

Below is an image depicting organizing NgRx store into different slices of content:

![Image of Yaktocat](https://gist.githubusercontent.com/tomschreck/7a90ac15fd4ee836c09284b80d5cba0a/raw/d7e3264b4715cc0dcc5f030f83995a2626e2463b/ngrx_best_practices_enterprise.png)



## ___Feature Modules___
A feature module represents a 'slice' of state within a NgRx Store.  Basically, a slice represents a property on the NgRx store object.  


---

### _Feature Module_
To create a feature module:

*note*: replace '[name-of-state-slice]' below with a meaningful name representing the slice of state in the NgRx store.  Example:  occupation.

<br/>
<br/>

1. **Create** an Angular module:

  ```javascript
  ng g m root-store/[name-of-state-slice]-store --flat false --module root-store/root-store.module.ts
  ```

<br/>
<br/>

2. **Create** feature module

  ```javascript
  ng g feature root-store/[name-of-state-slice]-store/[name-of-state-slice] --module root-store/[name-of-state-slice]-store/[name-of-state-slice]-store.module.ts --reducers ../root-store.ts
  ```
> _note_: using --reducers flag will register this slice's reducer with root-state ('src/app/root-store/root-state/index.ts)

>the following will be generated:
>- [name-of-state-slice].actions.ts
>- [name-of-state-slice].effects.ts
>- [name-of-state-slice].reducers.ts
>- [name-of-state-slice].selectors.ts
>

<br/>
<br/>

3. **Move** all test files into a '_tests' folder so they are out of the way.

<br/>
<br/>

4. **Generate** the following additional files manually:
- [name-of-state-slice]-facade.service.ts
- [name-of-state-slice].service.ts
- [name-of-state-slice]-state.ts
- index.ts

``` javascript
// from VS CODE TERMINAL:

// generate facade service (an Angular service):
ng g s root-store/[name-of-state-slice]-store/[name-of-state-slice]-facade

// generate service (an Angular service):
ng g s root-store/[name-of-state-slice]-store/[name-of-state-slice]

// generate state file (an empty file)
code src/app/root-store/[name-of-state-slice]-store/[name-of-state-slice].state.ts

// generate index (an empty file)
code src/app/root-store/[name-of-state-slice]-store/index.ts

```

> ___[name-of-state-slice]-facade.service.ts___ - the purpose of the facade service is to shield the application from the complexities of NgRx actions.  The application simply calls methods in facade service.  The facade service calls the appropriate actions.

> ___[name-of-state-slice].service.ts___ - the purpose of this service is to handle any needed HTTP requests to APIs or other serveices.

> ___[name-of-state-slice]-state.ts___ - the purpose of the state file is for convenience.  Typically feature state is defined in reducer file.  The state file offers clarity in the project structure.

>___index.ts___ - the purpose of the index file is to export the different files so they are available to application.

<br/>
<br/>

5. **Move** state interface and constructs from [name-of-state-slice].reducers.ts file to [name-of-state-slice].state.ts file.

```javascript
// src/app/root-store/[name-of-state-slice]-store/[name-of-state-slice].state.ts

export const [name-of-state-slice]FeatureKey = '[name-of-state-slice]';

export interface [name-of-state-slice]State
{
}

export const initial[name-of-state-slice]State: [name-of-state-slice]State =
{
};
```

<br/>
<br/>

6. **Code** index.ts file for exporting code assets for NgRx slice:

```javascript
// src/app/root-store/[name-of-state-slice]-store/index.ts
import * as Actions from './[name-of-state-slice].actions';
import * as Effects from './[name-of-state-slice].effects';
import * as Reducers from './[name-of-state-slice].reducer';
import * as Selectors from './[name-of-state-slice].selectors';
import * as State from './[name-of-state-slice].state';

export
{
  Actions,
  Effects,
  Reducers,
  Selectors,
  State
};
```

<br/>
<br/>


7. **Register** new NgRx slice with root-store.ts file:

```javascript
// src/app/root-store/root-store.ts

...
import * as [name-of-state-slice]Store from './[name-of-state-slice]-store';

export interface IRootState
{
  ...
  [[name-of-state-slice]Store.State.[name-of-state-slice]FeatureKey]: [name-of-state-slice]Store.State.[name-of-state-slice]State;
}

export
{
  ...,
  [name-of-state-slice]Store
};

export const reducers: ActionReducerMap<IRootState> =
{
  ...
  [[name-of-state-slice]Store.State.[name-of-state-slice]FeatureKey]: [name-of-state-slice]Store.Reducers.reducer,
};
```

<br/>
<br/>


8. **DEFINE** store module:

```javascript
// src/app/root-store/[name-of-state-slice]-store/[name-of-state-slice].module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { [name-of-state-slice]Store } from '../root-store';


@NgModule({
  imports:
    [
      CommonModule,
      StoreModule.forFeature([name-of-state-slice]Store.State.spinnerFeatureKey, [name-of-state-slice]Store.Reducers.reducer),
      EffectsModule.forFeature([[name-of-state-slice]Store.Effects.[name-of-state-slice]Effects])
    ],
  declarations:
    [

    ]
})
export class [name-of-state-slice]StoreModule { }


```

<br/>
<br/>


9. **CLEAN UP.**  Most likely you will have some clean up activities because we moved state constructs out of the reducer file into it's own state file.  Areas to cleanup:

- check all test files for changes in references to NgRx slice assets
- src/app/root-store/root-state/index.ts.  The registration of the reducer in this index.ts file could have incorrect references.
- review src/app/root-store/root-store.module.ts.  The only reference to your new NgRx slice should be an import of your `[name-of-state-slice]StoreModule`.

<br/>
<br/>


10. **OPTIONAL.**  We are using `@larscom/ngrx-store-storagesync` to synchronize NgRx store with local and/or session storage.  If your NgRx slice benefits from maintaining state in local/session sotrage, then you will need to register your NgRx slice with storageSyncReducer as found in src/app/root-store/root-state/index.ts:

```javascript
// src/app/root-store/root-state/index.ts

...
// slices of state participating in session/local storage persistance
export function storageSyncReducer(reducer: ActionReducer<IRootState>)
{
  return storageSync<IRootState>({
    features:
      [
        { stateKey: fromDeviceStore.State.deviceFeatureKey, storageForFeature: window.localStorage }
      ],
    // defaults to localStorage
    storage: window.localStorage
  })(reducer);
}
...
```

<br/>
<br/>

11. **Define**  your state in [name-of-state-slice].state.ts file


<br/><br/>


### Advice
- Setup of NgRx can be challenging.  However, once setup, NgRx is easy to use espcially with facade services approach.  
- You should ***limit*** the injection of NgRx store as much as possible throughout the application.  Strive towards only injecting NgRx store in facade services.  Polluting application with injection of NgRx store is bad practice.  

Avoid this (except for facade services):

```javascript
  constructor
    (
      private store: Store<IRootState>,
    )
  {
  }
```

<br/><br/>

### Further help

To get more help on best practices for using NGRX check out the [NgRx — Best Practices for Enterprise Angular Applications](https://wesleygrimes.com/angular/2018/05/30/ngrx-best-practices-for-enterprise-angular-applications.html).


To get more help on creating Feature Module, check out [NgRx Feature Schematic](https://ngrx.io/guide/schematics/feature).


To get more help with synchronizing NgRx store with local and/or session storage, check out [@larscom/ngrx-store-storagesync](https://github.com/larscom/ngrx-store-storagesync#readme)
