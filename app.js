require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const upload = require("./middleware/upload_products");
const adminAuth = require('./middleware/adminAuth');
const userAuth = require('./middleware/userAuth');
const User = require("./src/models/users");
const Product = require("./src/models/products");

const { calculateTotalPrice } = require("./utils/helper");

// Create express app
const app = express();

// Middleware & Static files
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use('/add-products', express.static('/uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// MongoDB connect
const dbURL =
  "mongodb+srv://kart:dumHp637qbiMRdna@kart.vvjzyyt.mongodb.net/KARTuser?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected!");
    // Listen for the requests
    app.listen(3000);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// app.listen(3000);

// ROUTING
// Homepage
app.get("/", async (req, res) => {
  try {
    const electronicsProducts = await Product.find({
      productCategory: "Electronics",
    });
    const fashionProducts = await Product.find({
      productCategory: "Fashion & Styles",
    });
    const homeProducts = await Product.find({
      productCategory: "Home",
    });
    const stationaryProducts = await Product.find({
      productCategory: "Stationary",
    });
    const groceriesProducts = await Product.find({
      productCategory: "Groceries",
    });
    res.render("index", {
      title: "Home",
      cartItems,
      electronicsProducts: electronicsProducts,
      fashionProducts: fashionProducts,
      homeProducts: homeProducts,
      stationaryProducts: stationaryProducts,
      groceriesProducts: groceriesProducts
    });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// ELECTRONICS
app.get('/electronics', async (req, res) => {
  try {
    const electronicsProducts = await Product.find({
      productCategory: "Electronics",
    });

    res.render('electronics', { title: 'Electronics', cartItems, electronicsProducts: electronicsProducts });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// FASHION & STYLES
app.get('/fashion-and-styles', async (req, res) => {
  try {
    const fashionProducts = await Product.find({
      productCategory: "Fashion & Styles",
    });

    res.render('fashion-and-styles', { title: 'Fashion & Styles', cartItems, fashionProducts: fashionProducts });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// HOME
app.get('/home', async (req, res) => {
  try {
    const homeProducts = await Product.find({
      productCategory: "Home",
    });

    res.render('home', { title: 'Home', cartItems, homeProducts: homeProducts });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// STATIONARY
app.get('/stationary', async (req, res) => {
  try {
    const stationaryProducts = await Product.find({
      productCategory: "Stationary",
    });

    res.render('stationary', { title: 'Stationary', cartItems, stationaryProducts: stationaryProducts });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// GROCERIES
app.get('/groceries', async (req, res) => {
  try {
    const groceriesProducts = await Product.find({
      productCategory: "Groceries",
    });

    res.render('groceries', { title: 'Groceries', cartItems, groceriesProducts: groceriesProducts });
  } catch (err) {
    res.status(500).send("Error retrieving products from the database.");
  }
});

// View Product
app.get("/view-product", async (req, res) => {
  try {
    const productId = req.query.id;
    const product = await Product.findById(productId);
    if (!product) {
      // Product not found
      return res.status(404).send("Product not found!");
    }

    res.render("view-product", { title: "View-product", cartItems, product: product });
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});

// About page
app.get("/about", (req, res) => {
  res.render("about", { title: "About", cartItems });
});

// Contact us page
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", cartItems });
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true
    });

    if (isPasswordMatch) {
      res.status(201).redirect("/");
      console.log("Succesfully logged in!");
    } else {
      res.send("Password incorrect!");
    }
  } catch (err) {
    res.status(400).send("Invalid email!");
  }
});

// SIGNUP PAGE
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});

app.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phonenumber,
        password: password,
        confirmpassword: confirmpassword,
      });
      const token = await newUser.generateAuthToken();

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true
      });

      const registeredUser = await newUser.save();
      res.status(201).redirect("/login");
    } else {
      res.send("Password unmatched!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// CART
var cartItems = [];

// Add items to cart
app.post("/cart/add", (req, res) => {
  const { productName, price, image } = req.body;
  const cartItem = {
    productName,
    price,
    image,
  };

  cartItems.push(cartItem);

  res.send("Item added to cart");
});

// Render the cart page
app.get("/cart", userAuth, (req, res) => {
  res.render("cart", {
    title: "Cart",
    cartItems,
    calculateTotalPrice: calculateTotalPrice(cartItems),
  });
});

// To delete the item from the cart
app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid index" });
  }
});


// ADMIN - DASHBOARD
app.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const adminEmail = 'admin.kart@gmail.com';
    
    if (req.user.email !== adminEmail) {
      // Redirect to the login page if the admin is not logged in
      return res.redirect('/login');
    }

    const electronicsCount = await Product.countDocuments({
      productCategory: "Electronics",
    });
    const fashionCount = await Product.countDocuments({
      productCategory: "Fashion & Styles",
    });
    const homeCount = await Product.countDocuments({
      productCategory: "Home",
    });
    const stationaryCount = await Product.countDocuments({
      productCategory: "Stationary",
    });
    const groceriesCount = await Product.countDocuments({
      productCategory: "Groceries",
    });

    res.render("dashboard", {
      title: "Admin Dashboard",
      electronicsCount: electronicsCount,
      fashionCount: fashionCount,
      homeCount: homeCount,
      stationaryCount: stationaryCount,
      groceriesCount: groceriesCount,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});




// ADD PRODUCTS
app.get("/add-products", (req, res) => {
  res.render("add-products", { title: "Add-products" });
});

app.post("/add-products", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      productCategory: req.body.category,
      productName: req.body.productname,
      brandName: req.body.brandname,
      price: req.body.price,
      stockNumber: req.body.stocknumber,
      description: req.body.desc,
    });

    if (req.file) {
      product.image = req.file.path;
    }
    const newProduct = await product.save();
    res.status(201).render("add-products", { title: "Add Products" });
  } catch (err) {
    res.status(400).send("Products couldn't be added!");
  }
});

// EDIT THE PRODUCT PAGE
app.get('/edit-product', async (req, res) => {
  try {
    const productId = req.query.id;
    const product = await Product.findOne({ _id: productId }).exec();
    res.render('edit-product', { title: 'Edit Product', product });
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// AFTER EDITING, UPDATE DATA TO THE DATABASE
app.post('/update-product', upload.single("image"), async (req, res) => {
  try {
    const productId = req.body.product_id;
    const updatedProduct = {
      productCategory: req.body.category,
      productName: req.body.productname,
      brandName: req.body.brandname,
      price: req.body.price,
      stockNumber: req.body.stocknumber,
      description: req.body.desc
    };
    if (req.file) {
      updatedProduct.image = req.file.path;
    }

    // Update the product in the database
    await Product.findByIdAndUpdate(productId, updatedProduct);

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// DELETE THE PRODUCT FROM THE DATABASE
app.get('/delete', async (req, res) => {
  try {
    const productId = req.query.id;
    // Delete the product in the database
    await Product.findByIdAndDelete(productId);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// VIEW ADDED PRODUCTS
app.get('/view-electronics', async (req, res) => {
  try {
    const electronicsProducts = await Product.find({
      productCategory: "Electronics",
    });
    res.render('view-electronics', { title: 'View Electronics Products', electronicsProducts: electronicsProducts });
  } catch(err) {
    res.status(500).send("Internal server error!");
  }
});

app.get('/view-fashions', async (req, res) => {
  try {
    const fashionProducts = await Product.find({
      productCategory: "Fashion & Styles",
    });
    res.render('view-fashions', { title: 'View Fashions Products', fashionProducts: fashionProducts });
  } catch(err) {
    res.status(500).send("Internal server error!");
  }
});

app.get('/view-home', async (req, res) => {
  try {
    const homeProducts = await Product.find({
      productCategory: "Home",
    });
    res.render('view-home', { title: 'View Home Products', homeProducts: homeProducts });
  } catch(err) {
    res.status(500).send("Internal server error!");
  }
});

app.get('/view-stationary', async (req, res) => {
  try {
    const stationaryProducts = await Product.find({
      productCategory: "Stationary",
    });
    res.render('view-stationary', { title: 'View Stationary Products', stationaryProducts: stationaryProducts });
  } catch(err) {
    res.status(500).send("Internal server error!");
  }
});

app.get('/view-groceries', async (req, res) => {
  try {
    const groceriesProducts = await Product.find({
      productCategory: "Groceries",
    });
    res.render('view-groceries', { title: 'View Groceries Products', groceriesProducts: groceriesProducts });
  } catch(err) {
    res.status(500).send("Internal server error!");
  }
});


// IN DEVELOPMENT PAGE
app.get('/in-development', (req, res) => {
  res.render('in-development');
});

// 404 ERROR - PAGE NOT FOUND ERROR
app.use((req, res) => {
  res.render("404", { title: "Page not found" });
});
