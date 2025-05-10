import { Hono } from "hono";
import customerList from "./customer";
import userList from "./users";

// Ensure userList and customerList are arrays
const userArray = Array.isArray(userList) ? userList : [];
const customerArray = Array.isArray(customerList) ? customerList : [];
// This is a common route that merges the user and customer routes
// and provides a combined endpoint for both user and customer data.    
const common = new Hono();

  const mergedList = [...userArray, ...customerArray];
// This endpoint will merge both users and customers and return the list
common.get("/merged", (c) => {
  // Return the combined list
  return c.json(mergedList);
});

export default common;