export interface InventoryItem {
  id: string;
  type: 'misc' | 'weapon' | 'armor';
  name: string;
  imageUrl: string;
  count?: number;
  cooldown?: number;
  charges?: number;
  maxCharges?: number;
}

export interface Tab {
  name: string;
  title: string;
  disabled: boolean;
}

export type FilterItemName = InventoryItem['type'] | 'all';
