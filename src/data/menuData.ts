import { MenuItem } from '../../types';

export const MENU_CATEGORIES = ['Appetizers', 'Main Courses', 'From the Fire', 'Desserts', 'Cocktails'] as const;

export const MENU_DATA: MenuItem[] = [
    // Appetizers
    {
        id: 'app-1',
        name: 'Obsidian Scallop',
        description: 'Vieira sellada sobre piedra volcánica, emulsión de tinta de calamar y huevas de trucha ahumada.',
        price: '24',
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop',
        tags: ['signature']
    },
    {
        id: 'app-2',
        name: 'Bone Marrow & Brioche',
        description: 'Tuétano asado con costra de hierbas negras, acompañado de brioche tostado y mermelada de cebolla.',
        price: '28',
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'app-3',
        name: 'Tuna Void Tartare',
        description: 'Atún rojo, sésamo negro, yema curada en soja añeja y aire de wasabi.',
        price: '26',
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1200&auto=format&fit=crop', // raw tuna/sushi focused
        tags: ['gluten-free']
    },
    {
        id: 'app-4',
        name: 'Foie Gras Rocher',
        description: 'Esfera de foie gras micuit cubierta de avellanas tostadas y oro comestible.',
        price: '32',
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop' // healthy/premium bowl or distinct dish
    },

    // Main Courses
    {
        id: 'main-1',
        name: 'Black Cod Eclipse',
        description: 'Bacalao negro glaseado en miso y carbón, servido con puré de coliflor ahumada.',
        price: '48',
        category: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=1200&auto=format&fit=crop',
        tags: ['signature', 'gluten-free']
    },
    {
        id: 'main-2',
        name: 'Duck & Shadows',
        description: 'Magret de pato, salsa de cerezas negras y remolacha asada en cenizas.',
        price: '42',
        category: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'main-3',
        name: 'Midnight Risotto',
        description: 'Arroz Carnaroli tinta de sepia, calamar baby y crujiente de parmesano.',
        price: '38',
        category: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop',
        tags: ['gluten-free']
    },
    {
        id: 'main-4',
        name: 'Lamb of the Night',
        description: 'Costillar de cordero en costra de café, puré de berenjena quemada y menta.',
        price: '54',
        category: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=1200&auto=format&fit=crop' // premium rack of lamb
    },

    // From the Fire
    {
        id: 'fire-1',
        name: 'Wagyu A5 Striploin',
        description: '150g de Wagyu japonés, sal de mar ahumada y mantequilla de trufa negra.',
        price: '120',
        category: 'From the Fire',
        image: '/wagyu.png',
        tags: ['signature', 'gluten-free']
    },
    {
        id: 'fire-2',
        name: 'Tomahawk Steak',
        description: 'Corte de 1.2kg madurado 60 días, terminado en mesa con romero y fuego.',
        price: '145',
        category: 'From the Fire',
        image: 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?q=80&w=1200&auto=format&fit=crop' // premium steak on dark background
    },
    {
        id: 'fire-3',
        name: 'Charred Octopus',
        description: 'Pulpo a la brasa, papas confitadas en grasa de pato y pimentón ahumado.',
        price: '46',
        category: 'From the Fire',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'fire-4',
        name: 'Smoked Lobster',
        description: 'Langosta entera ahumada en madera de manzano, mantequilla de ajo negro.',
        price: '85',
        category: 'From the Fire',
        image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=1200&auto=format&fit=crop'
    },

    // Desserts
    {
        id: 'dessert-1',
        name: 'Dark Matter',
        description: 'Domo de chocolate 85%, mousse de avellana, interior de maracuyá.',
        price: '22',
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1200&auto=format&fit=crop', // dark rich chocolate cake
        tags: ['signature', 'gluten-free']
    },
    {
        id: 'dessert-2',
        name: 'Ash Cheesecake',
        description: 'Cheesecake vasco "quemado", carbón activado, coulis de frutos negros.',
        price: '20',
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'dessert-3',
        name: 'Invisible Apple',
        description: 'Láminas finas de manzana, caramelo salado, helado de vainilla ahumada.',
        price: '18',
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop' // elegant apple dessert
    },
    {
        id: 'dessert-4',
        name: 'Noir Sorbet Trio',
        description: 'Limón negro, Sésamo negro, Chocolate negro. Texturas frías.',
        price: '16',
        category: 'Desserts',
        image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=1200&auto=format&fit=crop',
        tags: ['plant-based', 'gluten-free']
    },

    // Cocktails
    {
        id: 'cocktail-1',
        name: 'The Void',
        description: 'Vodka negro, licor de café, espresso, humo de canela.',
        price: '18',
        category: 'Cocktails',
        image: '/the_void_cocktail.png'
    },
    {
        id: 'cocktail-2',
        name: 'Smoke & Mirrors',
        description: 'Mezcal artesanal, agave, bitter de naranja, romero ahumado.',
        price: '20',
        category: 'Cocktails',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'cocktail-3',
        name: 'Obsidian Old Fashioned',
        description: 'Rye whiskey, azúcar negra, angostura, hielo tallado a mano.',
        price: '22',
        category: 'Cocktails',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'cocktail-4',
        name: 'Midnight Gin',
        description: 'Gin infusionado en moras, tónica premium, twist de limón quemado.',
        price: '18',
        category: 'Cocktails',
        image: '/midnight_gin_cocktail.png'
    }
];
