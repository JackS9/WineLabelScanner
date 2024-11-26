import Dexie, { type Table } from 'dexie';

export interface Wine {
  id?: number;
  name: string;
  producer: string;
  vintage: string;
  region: string;
  country: string;
  varietal: string;
  notes: string;
  imageUrl?: string;
  alcoholContent?: string;
  price?: string;
  rating?: number;
  dateAdded: Date;
  links: string[];
  scrapedData?: string;
}

export class WineDatabase extends Dexie {
  wines!: Table<Wine>;

  constructor() {
    super('WineDB');
    this.version(1).stores({
      wines: '++id, name, producer, vintage, region, country, varietal, dateAdded'
    });
  }
}

export const db = new WineDatabase();