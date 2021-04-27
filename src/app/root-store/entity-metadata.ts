import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap =
{
  Hero: {},
  Villain: {}
};

// because the plural of "hero" is not "heros"
const pluralNames = { Hero: 'Heroes' };

export const entityConfig =
{
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig =
{
  timeout: 3000, // request timeout
};
