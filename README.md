# REDHOPE - Blood and Organ Delivery Management System

A comprehensive web application for managing blood and organ delivery logistics.

## 📁 Project Structure

```
REDHOPE/
├── css/                    # Stylesheets
│   ├── styles.css         # Main styles and variables
│   └── components.css     # Component-specific styles
├── js/                    # JavaScript files
│   ├── common.js          # Shared functionality
│   ├── reports.js         # Reports page functionality
│   ├── login.js           # Login page functionality
│   └── register.js        # Registration page functionality
├── images/                # Image assets
│   └── favicon.ico        # Website favicon
├── dashboard.html         # Main dashboard page
├── delivery.html          # Delivery management page
├── inventory.html         # Inventory management page
├── newrequest.html        # New request creation page
├── report.html           # Reports and analytics page
├── login.html            # User login page
├── createaccount.html    # User registration page
└── README.md             # This file
```

## 🚀 Features

- **Dashboard**: Overview of key metrics and recent activities
- **Delivery Management**: Track and manage blood/organ deliveries
- **Inventory Management**: Monitor blood and organ inventory levels
- **New Requests**: Create and manage delivery requests
- **Reports & Analytics**: Comprehensive reporting and data analysis
- **User Authentication**: Secure login and registration system

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS custom properties
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules
- **Tailwind CSS**: Utility-first CSS framework
- **Material Icons**: Google's Material Design icon set

## 📋 Setup Instructions

1. **Clone or download** the project files
2. **Open** any HTML file in a modern web browser
3. **No build process required** - the application runs directly in the browser

## 🎨 Design System

### Color Palette
- **Primary**: #141414 (Dark Gray)
- **Secondary**: #757575 (Medium Gray)
- **Accent**: #2F6FEB (Blue)
- **Background**: #F9FAFB (Light Gray)
- **Border**: #E5E7EB (Light Border)

### Typography
- **Primary Font**: Plus Jakarta Sans
- **Secondary Font**: Noto Sans
- **Icons**: Material Icons

## 🔧 Customization

### Adding New Pages
1. Create a new HTML file in the root directory
2. Include the CSS and JS files:
   ```html
   <link rel="stylesheet" href="css/styles.css"/>
   <link rel="stylesheet" href="css/components.css"/>
   <script src="js/common.js"></script>
   ```
3. Use the existing sidebar navigation structure

### Adding New JavaScript Functionality
1. Create a new JS file in the `js/` folder
2. Follow the class-based pattern used in existing files
3. Include the file in your HTML page

### Styling
- Use CSS custom properties (variables) defined in `css/styles.css`
- Follow the existing component patterns in `css/components.css`
- Use Tailwind CSS utilities for quick styling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Notes

- This is a frontend-only application
- In production, implement proper backend authentication
- Add HTTPS for secure data transmission
- Implement proper input validation and sanitization

## 🐛 Known Issues

- Favicon is a placeholder (create a proper .ico file)
- Data is currently hardcoded (connect to a backend API)
- No persistent data storage (implement database)

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Database implementation
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF, Excel)
- [ ] User roles and permissions
- [ ] Mobile app version
- [ ] Dark mode toggle
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please contact the development team.

---

**Note**: This is a demonstration project. For production use, implement proper security measures and backend services. 