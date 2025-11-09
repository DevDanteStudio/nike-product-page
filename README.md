# Nike Air Jordan Product Page

A fully functional e-commerce product page built with HTML, CSS, and JavaScript. Features a complete shopping experience with product customization, shopping cart, and checkout flow.

## Live Demo

[View Live Site](https://github.com/DevDanteStudio/nike-product-page)

## Features

### Core Functionality

- **Product Gallery**: Interactive image gallery with 4 views per colorway
- **Color Selector**: 4 colorway options (Bred, White/Black, Royal, White/Purple)
- **Size Selection**: UK sizes 7-13 with visual feedback
- **Quantity Controls**: Adjustable quantity (1-10) with pulse animation
- **Shopping Cart**: Full cart functionality with add/remove/update
- **Wishlist**: Save favorite products with heart animation

### User Experience

- **Loading States**: Spinner animations for async actions
- **Scroll Animations**: Elements fade in on scroll
- **Image Zoom**: Magnifying glass effect on product images
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Back to Top**: Smooth scroll navigation button

### E-Commerce Features

- **Product Tabs**: Description, Shipping, Reviews
- **Size Chart Modal**: UK/US/EU size conversion guide
- **Cart Summary**: Subtotal, shipping, and total calculations
- **Checkout Flow**: Order summary and checkout simulation
- **Notifications**: Toast notifications for user actions

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Flexbox, Grid, animations, transitions
- **JavaScript (ES6+)**: DOM manipulation, event handling, state management

## Screenshots

![Product Page](screenshots/product-page.png)
![Shopping Cart](screenshots/cart.png)
![Size Chart](screenshots/size-chart.png)

## Color Scheme

- Primary: Black (#111)
- Accent: Crimson Red (#DC143C)
- Background: White (#FFF)
- Text: Gray (#757575)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML/CSS/JavaScript (if modifying)

### Installation

1. Clone the repository

```bash
git clone https://github.com/DevDanteStudio/nike-product-page.git
```

2. Navigate to project folder

```bash
cd nike-product-page
```

3. Open in browser

- Simply double click `index.html`
- OR use Live Server extension in VS Code

## Project Structure

```
nike-product-page/
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # All JavaScript
├── images/             # Product images
│   ├── bred-*.jpg
│   ├── whiteblack-*.jpg
│   ├── royal-*.jpg
│   └── whitepurple-*.jpg
└── README.md           # Project documentation
```

## Key Code Features

### Color Switching System

Dynamic image switching based on selected colorway with organized data structure.

### Smart Cart Logic

Cart items grouped by product, size, and color with real time total calculations.

### Scroll Animations

Intersection based animations that trigger as elements enter viewport.

### Modal System

Reusable modal component for size chart and future features.

## 📱 Responsive Breakpoints

- Desktop: 1400px and up
- Tablet: 968px - 1399px
- Mobile: 320px - 967px

## Learning Outcomes

This project demonstrates:

- ✅ Complex state management in vanilla JavaScript
- ✅ Dynamic DOM manipulation
- ✅ CSS Grid and Flexbox layouts
- ✅ Event delegation and handling
- ✅ Animation timing and transitions
- ✅ Modal and overlay patterns
- ✅ Responsive design principles
- ✅ E-commerce UI/UX patterns

## Future Enhancements

- [ ] LocalStorage for cart persistence
- [ ] Multiple product pages
- [ ] User authentication
- [ ] Payment integration
- [ ] Product search functionality
- [ ] Reviews submission system

## Author

**DevDanteStudio**

- GitHub: [@DevDanteStudio](https://github.com/DevDanteStudio)
- Building in public: 30day coding challenge

## License

This project is open source and available for learning purposes.

## Acknowledgments

- Inspired by Nike.com
- Built as part of 30day web development challenge
- Week 2 project (Days 6-10)

---

**Built with Music and Water by DevDanteStudio**

Day 6-10 of my 30day coding journey
