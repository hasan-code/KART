KART - E-commerce Website
KART is a full-fledged e-commerce website developed by Hasan Al Saeed. It provides a user-friendly interface for both administrators and regular users to interact with the platform. The website allows users to browse products, add items to their cart, and proceed to checkout. Administrators have additional features, such as managing products and viewing orders.

Features
User Authentication: Users can sign up and log in to the website using their email and password. Passwords are securely hashed using bcrypt for enhanced security.
User Roles: The website differentiates between regular users and administrators. Only administrators have access to the admin panel.
Admin Panel: Administrators can perform various administrative tasks, including adding, editing, and deleting products. They can also view orders placed by users.
Product Catalog: Users can browse a wide range of products available on the website. Each product has detailed information and images for easy selection.
Shopping Cart: Users can add products to their cart, view the cart contents, and update quantities. The cart provides an order summary for quick reference.
Secure Checkout: The website integrates with PayPal for secure and convenient payment processing. Users are redirected to PayPal for completing their purchases.
Responsive Design: The website is designed to be responsive and compatible with different devices, ensuring a seamless user experience on desktop and mobile.
Installation
To run the KART e-commerce website locally, follow these steps:

Clone the repository: git clone https://github.com/hasan-code/KART.git
Install dependencies: npm install
Access the website: Open your browser and visit http://localhost:3000
Please ensure you have MongoDB installed and running to establish a database connection.

Dependencies
The project uses the following dependencies:

bcryptjs: ^2.4.3
body-parser: ^1.20.2
cookie-parser: ^1.4.6
dotenv: ^16.1.4
ejs: ^3.1.9
express: ^4.18.2
jsonwebtoken: ^9.0.0
mongodb: ^5.6.0
mongoose: ^7.2.3
multer: ^1.4.5-lts.1
path: ^0.12.7
Please refer to the package.json file for more details.

Contributing
Contributions to the KART project are welcome. If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the GitHub repository.

License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Contact
If you have any questions or inquiries about the KART e-commerce website, you can reach out to the project's author, Hasan Al Saeed, via email at heyy.hxn@gmail.com or visit his GitHub profile: hasan-code.