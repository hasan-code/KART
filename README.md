<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
  <h1>KART - E-commerce Website</h1>
  <p>KART is a full-fledged e-commerce website developed by <strong><a href="https://github.com/hasan-code">Hasan Al Saeed</a></strong>. It provides a user-friendly
    interface for both administrators and regular users to interact with the platform. The website allows users to browse
    products, add items to their cart, and proceed to checkout. Administrators have additional features, such as managing
    products and viewing orders.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>User Authentication:</strong> Users can sign up and log in to the website using their email and password.
      Passwords are securely hashed using bcrypt for enhanced security.</li>
    <li><strong>User Roles:</strong> The website differentiates between regular users and administrators. Only administrators
      have access to the admin panel.</li>
    <li><strong>Admin Panel:</strong> Administrators can perform various administrative tasks, including adding, editing,
      and deleting products. They can also view orders placed by users.</li>
    <li><strong>Product Catalog:</strong> Users can browse a wide range of products available on the website. Each product
      has detailed information and images for easy selection.</li>
    <li><strong>Shopping Cart:</strong> Users can add products to their cart, view the cart contents, and update quantities.
      The cart provides an order summary for quick reference.</li>
    <li><strong>Secure Checkout:</strong> The website integrates with PayPal for secure and convenient payment processing.
      Users are redirected to PayPal for completing their purchases.</li>
    <li><strong>Responsive Design:</strong> The website is designed to be responsive and compatible with different devices,
      ensuring a seamless user experience on desktop and mobile.</li>
  </ul>

  <h2>Installation</h2>
  <p>To run the KART e-commerce website locally, follow these steps:</p>
  <ol>
    <li>Clone the repository: <code>git clone https://github.com/hasan-code/kart.git</code></li>
    <li>Install dependencies: <code>npm install</code></li>
    <li>Set up environment variables: Create a <code>.env</code> file in the root directory and add the necessary environment
      variables, such as the database connection details and secret key.</li>
    <li>Start the server: <code>npm start</code></li>
    <li>Access the website: Open your browser and visit <code>http://localhost:3000</code></li>
  </ol>
  <p>Please ensure you have MongoDB installed and running to establish a database connection.</p>

  <h2>Dependencies</h2>
  <p>The project uses the following dependencies:</p>
  <ul>
    <li>bcryptjs: ^2.4.3</li>
    <li>body-parser: ^1.20.2</li>
    <li>cookie-parser: ^1.4.6</li>
    <li>dotenv: ^16.1.4</li>
    <li>ejs: ^3.1.9</li>
    <li>express: ^4.18.2</li>
    <li>jsonwebtoken: ^9.0.0</li>
    <li>mongodb: ^5.6.0</li>
    <li>mongoose: ^7.2.3</li>
    <li>multer: ^1.4.5-lts.1</li>
    <li>path: ^0.12.7</li>
  </ul>
  <p>Please refer to the <code>package.json</code> file for more details.</p>

  <h2>Contributing</h2>
  <p>Contributions to the KART project are welcome. If you encounter any issues or have suggestions for improvements,
    please feel free to submit a pull request or open an issue on the GitHub repository.</p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for more details.</p>

  <h2>Contact</h2>
  <p>If you have any questions or inquiries about the KART e-commerce website, you can reach out to the project's author,
    Hasan Al Saeed, via email at <a href="mailto:heyy.hxn@gmail.com">heyy.hxn@gmail.com</a> or visit his GitHub profile:
    <a href="https://github.com/hasan-code">hasan-code</a>.</p>
</body>

</html>
