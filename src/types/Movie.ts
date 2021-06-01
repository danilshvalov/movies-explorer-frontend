import {Id} from './types';

export interface SaveCardData {
  id: Id;
  isSaved: boolean;
}

export interface DeleteCardData {
  id: Id;
}
