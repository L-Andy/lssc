export type Product = {
    id: string
    profit_value: number;
    price: number;
    quantity: number;
    rentable: boolean;
    image: string;
};

export const products: Product[] = [
    {
        id: '4829103746',
        profit_value: 1,
        price: 490,
        quantity: 1,
        rentable: false,
        image: '/assets/scooter/image1.png',
    },
    {
        id: '9301748265',
        profit_value: 3.8,
        price: 960,
        quantity: 8,
        rentable: true,
        image: '/assets/scooter/image3.png',
    },
    {
        id: '1847263950',
        profit_value: 4.5,
        price: 2180,
        quantity: 15,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        id: '5728391046',
        profit_value: 4.4,
        price: 4980,
        quantity: 35,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        id: '7601923845',
        profit_value: 5.1,
        price: 10700,
        quantity: 65,
        rentable: true,
        image: '/assets/scooter/image.png',
    },
    {
        id: '3950284716',
        profit_value: 6,
        price: 23000,
        quantity: 120,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
    {
        id: '8203741956',
        profit_value: 7.1,
        price: 50000,
        quantity: 220,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
    {
        id: '6172039845',
        profit_value: 6.9,
        price: 125000,
        quantity: 565,
        rentable: true,
        image: '/assets/scooter/image2.png',
    },
];
