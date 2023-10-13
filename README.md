# Florin & Burkes Recycling - Lap 2 project


Try-Catch-A-Cold team:
- Kieran Whitfield (PM, Testing)
- Vadim Zotov​ (Front End Developer​)
- Adil Wadud​ (Integration Developer​)
- Ildiko Magda​ (Back End Developer​)

## Purpose Of The Project​ 
| Action | Explanation |
| --- | --- |
| **Reduce** | The amount of reusable items wasted​ |
| **Educate** | The community about recycling​ |
| **Encourage** | Community togetherness​ |
| **Promote** | Sustainable recycling​ |
| **Support** | People through the cost of living crisis​ |


---

# Installation and Usage

## Installation

To start this app:

- In terminal git clone the repository to your local machine
- In terminal `cd LAP2-Project` to enter the directory
- In terminal `npm install` to install the required packages
- You will need a .env file containing the PORT and DB_URL you wish to use
- If you do not have a DB_URL ready, you can create one using the website [ElephantSQL](https://www.elephantsql.com/)
- In terminal `npm run setup-db` to setup the database for use
- In terminal `npm run dev` to start up a local server
- Using Visual Studio Code, install the Live Server extension if you do not have it installed
- Open index.html using Live Server by right clicking the file in the VSCode explorer

## Usage

---
- Sign up to the website and then log in with your newly created credentials
- On the main page, you can filter for items by category and donate to any items that you like the look of
- On the "ask about recycling" page, you can enter any text and you will be told whether or not the item is able to be recycled or not
- On the account page, you can view your account details or view your personal list of items.
- On the account details page, you have the option to edit your account alongside having the ability to spend your points gained
- On the redeem page, you can choose which voucher you would like to purchase using your points
- On the account items page, you can view all items you currently have the highest donation to. It also allows you to post new items to the site !
- At any time, you can log out of the website, which will take you back to the login screen

# Technologies 

- HTML
- CSS (Bootstrap 5.3)
- JavaScript
  - Node.js
  - Express
  - Jest 
  - Supertest
  - Bcrypt
- SQL
---

# Process
## Backend

## Frontend
- Created relevant html tags with classes and IDs so that they can be used in the frontend code
- Styled all the pages using the latest version of bootstrap - Version 5.3.1
- 
- 

## Testing
- Set up the framework for the testing, in this case, jest and supertest
- Created initial tests for functionality of items
- Iterated on these tests to make them function more accurately
- Repeated this with all other controllers and models
---

## Challenges and Solutions​
| Challenge | Solution |
| --- | --- |
| We wanted to make sure that the ​User can see the images of Items in our database | We created a function that reduces the size and quality then converts the image to a database friendly string​ |
| Handling donations had become challenging as it required potentially a POST and a PATCH method simultaneously | Items are created with a initial bid of £0, which meant that a POST function was not required |
| The size of the project increased quickly and files and folders become very messy | We continuously communicated, pushed/pulled and removed unnecessary files​ |

---

## What We Learned From The Project​
![img](https://github.com/KWhitfieldHull/LAP2-Project/blob/main/client/assets/img/rm-wwl.jpg?raw=true)

---
## Future features
- Deployment​
- Payment Handling​
- WebSockets
- Sign up Via Gmail​
- Instant Buy ​
