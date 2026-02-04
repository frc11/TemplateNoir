export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: 'starter' | 'main' | 'dessert' | 'cocktail';
}

export interface ConciergeMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}
