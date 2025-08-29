// Base types for database records
export interface Class {
  id: number;
  name: string;
  updated_at?: string; // ISO string format
  created_at: string;  // ISO string format, has default
}

export interface Set {
  id: number;
  name: string;
  created_at: string; // ISO string format, has default
  class_id: number;   // Foreign key to class.id
}

export interface Card {
  id: number;
  term: string;
  definition: string;
  created_at: string; // ISO string format, has default
  set_id: number;     // Foreign key to sets.id
}

// Types for creating new records (without auto-generated fields)
export interface CreateClass {
  name: string;
  updated_at?: string;
}

export interface CreateSet {
  name: string;
  class_id: number;
}

export interface CreateCard {
  term: string;
  definition: string;
  set_id: number;
}

// Types for updating records (all fields optional except constraints)
export interface UpdateClass {
  name?: string;
  updated_at?: string;
}

export interface UpdateSet {
  name?: string;
  class_id?: number;
}

export interface UpdateCard {
  term?: string;
  definition?: string;
  set_id?: number;
}

// Extended types with relationships (useful for joins)
export interface SetWithClass extends Set {
  class: Class;
}

export interface CardWithSet extends Card {
  set: Set;
}

export interface CardWithSetAndClass extends Card {
  set: SetWithClass;
}

export interface ClassWithSets extends Class {
  sets: Set[];
}

export interface SetWithCards extends Set {
  cards: Card[];
}