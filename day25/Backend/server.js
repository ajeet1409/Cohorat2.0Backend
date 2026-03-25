// server ko start karta hai
// database ko connect karta hai

import { app } from "./src/app.js";

import connectToDb from "./src/config/database.js";


connectToDb();

const Port = process.env.PORT || 3000

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
