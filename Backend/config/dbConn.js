const { Sequelize, DataTypes } = require("sequelize");

// init db connection
const sequelize = new Sequelize("dern-support", "root", "", {
  dialect: "mysql",
  port: 3020,
});
// create tables
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

// category

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

// category

const Service = sequelize.define(
  "service",
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_price:{
      type:DataTypes.INTEGER,
      allowNull:false, 
    }
  },
  {
    tableName: "service",
    timestamps: false,
  }
);

// testmnails table 
const Testmonail = sequelize.define(
  "testmonail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    user_name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    bio:{
      type: DataTypes.STRING,
      allowNull:false,
    },
  },
  {
    tableName: "testmonail",
    timestamps: false,
  }
);

// orders table 

const Order = sequelize.define("order",{
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false

  },
  status:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:"in progress"
  },
  label:{
    type:DataTypes.STRING,
    allowNullL:false,
    defaultValue:"low"
  },
  priority:{
    type:DataTypes.STRING,
    allowNull:false
  },
  user_email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  price:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  service_name:{
    type:DataTypes.STRING,
    allowNull:false
  }
})
Testmonail.sync(); 
Order.sync()
// connect to db
sequelize
  .authenticate()
  .then(() => {
    console.log("connexted successfully");
  })
  .catch((e) => console.log(e));

module.exports = {
  User,
  Category,
  Service,
  Testmonail,Order
};
