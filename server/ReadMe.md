## packages
express-async-errors 
morgan 
express-rate-limit 
helmet 
xss-clean 
cors
express-fileupload
cookie-parser
dotenv
bcryptjs 
validator
http-status-codes
crypto
jsonwebtoken
nodemailer
express-fileupload
cloudinary

## postgress and squeelize
npm install --save sequelize
npm install --save pg pg-hstore # Postgres

npx sequelize-cli init  (optional: Initialize Sequelize Use Sequelize CLI to bootstrap your project) 
# define model npx sequelize-cli model:generate --name User --attributes email:string,name:string


## tables
1. Order Model
The Order model should include details like:

User (relation to a user)
Phone Number (contact details)
Address (where the order is to be delivered)
Order Date (when the order was made)
Order Details (what items are ordered)
Order State (to track the status like pending, completed, etc.)
Extra Info (any additional information the customer provides)


2. Reservation Model
The Reservation model will include:

User (relation to a user)
Reservation Date (when the reservation is made)
Table Number (which table is reserved)
Event Type (for specific events like parties, meetings, etc.)
Number of People (how many guests are in the party)
Reservation State (e.g., confirmed, pending)
Special Requests (any special requests the user may have)


3. Event Model
You might also need an Event model for sharing and tracking current events in the restaurant.

Event Name (name of the event)
Event Description (details about the event)
Event Date (when the event is happening)
Event Type (type of event, e.g., live music, food festival)
Capacity (how many people the event can accommodate)
Location (where the event is happening, if multiple locations are available)
