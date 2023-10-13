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

- In terminal git clone the repository to local machine
- In terminal cd LAP2-Project to enter the required server
- In terminal `npm install` to have all the required packages
- You need .env file with PORT and DB_URL
- For DB url create an intense at elephantsql.com
- In terminal `npm run setup-db` to install the Database
- In terminal `npm run dev` to run backend server
- In your VSCode open index.html with Live Server extention

## Usage

---
- Create a new account
- Login with your name/password
- Now you can donate for any item
- You also can add new items!

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

---

## Challenges and Solutions​
| Challange | Solution |
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
