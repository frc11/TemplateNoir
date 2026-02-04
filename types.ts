export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  category: 'starter' | 'main' | 'dessert' | 'cocktail' | 'entrada' | 'principal' | 'postre' | 'Appetizers' | 'Main Courses' | 'From the Fire' | 'Desserts' | 'Cocktails';
  tags?: ('plant-based' | 'gluten-free' | 'signature')[];
}

export interface ConciergeMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}
