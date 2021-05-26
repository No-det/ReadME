![BFH Banner](https://trello-attachments.s3.amazonaws.com/542e9c6316504d5797afbfb9/542e9c6316504d5797afbfc1/39dee8d993841943b5723510ce663233/Frame_19.png)

# readMe

readMe is an book review website where users can add reviews, trade books and connect with other book readers. Users can log in to the webapp using their google account. If a user likes a review, he can give a rating for the book, and give their thoughts on comment section.

This is a PWA, which means you can install it in your mobile/desktop!

## Team members

1. Nandanunni AS [Github](https://github.com/nandan-unni)
2. Ajal P [Github](https://github.com/ajal333)
3. Abhinav Rajesh [Github](https://github.com/abhinavrajesh)

## Team Id

```
BFH/recslkAeuehVHoDvy/2021
```

## Link to product walkthrough

[Youtube](https://youtu.be/YYwO8wH-VU8)

## How it Works ?

1. Create an account at [readMe](https://readmebfh.netlify.app) using google authentication
2. You can add new review, read review and rate review in review section
3. You can add trade, connect with other users in the trade section
4. You can chat with your followers, people you are following, people who want to trade with you and people who you want to trade with in the chat section
5. Profile page where you can update you profile and view the trades and reviews posted

## Dependencies used

- Server

  - express - 4.17.1
  - firebase-admin - 9.8.0
  - mongoose - 5.12.9

- Client
  - react - 17.0.2
  - node-sass - 6.0.0
  - firebase - 8.6.1
  - axios - 0.21.1
  - antd - 4.15.5
  - react-router-dom - 5.2.0

## How to configure

1. Cloning the repository

   ```sh
    git clone https://github.com/No-det/ReadME.git
   ```

2. Client side setup
   - Go inside the client directory
     ```sh
     cd readMe/client
     ```
   - Install dependencies
     ```sh
     npm install
     ```
   - Environment variable required
     ```sh
     REACT_APP_API_BASE_URL = http://localhost:5000/api/v1
     ```
3. Server side setup
   - Go inside the server directory
     ```sh
     cd readMe/server
     ```
   - Install dependencies
     ```sh
     npm install
     ```
   - Environment variable required
     ```sh
     MONGO_URI = URI_TO_MONGODB_DB
     SERVICE_ACCOUNT_KEY = SERVICE_ACCOUNT_KEY_FROM_FIREBASE
     ```
## How to Run

Instructions for running

1. Client

   - Start the development server 
     ```sh
     cd client && npm start
     ```
     Client would be running at [http://localhost:3000](http://localhost:3000)

2. Server
   - Start the development server
     ```sh
     cd server && npm start
     ```
     Server would be running at [http://localhost:5000](http://localhost:5000)
