## Resource Listing Server

<p>Code for server hosted at <a href="https://readmebfh.herokuapp.com/" target="_blank">https://resource-listing.azurewebsites.net</a> using <a href="https://www.heroku.com/" target="_blank">Heroku</a> built with <a href="https://expressjs.com/" target="_blank">ExpressJS Framework</a> on <a href="https://nodejs.org/en/" target="_blank">NodeJS<a/></p>

<p>Server for <a href="https://resourcelisting.netlify.app" target="_blank">readMe</a>, A great eye for good books </p>

<p><a href="https://github.com/No-det/ReadME/tree/main/client" target="_blank" >Code for Client</a></p>
<p><a href="https://localhost:3000" target="_blank">Client</a></p>
   
## 📦 Routes

#### USER ROUTES

**All the routes require `Authorization` sent as `Header` with the `request`**

1.  ```http
    GET /api/v1/user/:uid
    ```

    **Route for getting the user details of the user with unqiue id `uid`. `Authorization` and `uid` is required to get the user Details**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `uid` | `Query` | **Required.** |
    | `Authorization` | `Header` | **Required.** |

    <br/>

2.  ```http
    GET /api/v1/user/profileData/:uid
    ```

    **Route for getting the profile data. `Authorization` and `uid` is required to get the profile data**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `uid` | `Query` | **Required.** |
    | `Authorization` | `Header` | **Required.** |

    <br/>

3.  ```http
    GET /api/v1/user/chat/:uid
    ```

    **Route for getting the chats. `Authorization` and `uid` is required to get the chat details**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `uid` | `Query` | **Required.** |
    | `Authorization` | `Header` | **Required.** |

    <br/>

4.  ```http
    POST /api/v1/user/add
    ```

    **Route for adding user to the database. On success returns the `user` as response**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `uid` | `string` | **Required.** |
    | `displayName` | `string` | **Required.** |
    | `photoURL` | `string` | **Required.** |
    | `email` | `string` | **Required.** |
    <br/>

5.  ```http
    POST /api/v1/user/update
    ```

    **Route for updating the user data. On success returns the `user` as response**
    <br/>

6.  ```http
    POST /api/v1/user/follow
    ```

    **Route for Email Login On success returns the `token` as url parameter to client else redirects back to email signin**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `uid` | `string` | **Required.** |
    | `email` | `string` | **Required.** |
    | `name` | `string` | **Required.** |
    | `photoURL` | `string` | **Required.** |

    <br/>

#### REVIEW ROUTES

**All the routes require `Authorization` sent as Header with the `request`**

1.  ```http
    GET /api/v1/review/getall
    ```

    **Returns the reviews of all whom are followed by the user**
    <br />

2.  ```http
    GET /api/v1/review/:id
    ```

    **Returns the review with matching `id`**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `id`| `Query` | **Required.** Searches DB for matching id of review |
    <br />

<!-- ---

---

--- -->

3.  ```http
    GET /api/v1/review/upvoteReview/:id
    ```

    **Returns the updated post as response**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `postId`| `string` | **Required.** Adds the `postId` to the array of saved posts in the User model|
    <br />

<!-- ---

---

--- -->

4.  ```http
    POST /api/v1/review/add
    ```

    **Returns a message if the review was added successfully**

    | PARAMETERS          | TYPE     | DESCRIPTION   |
    | :------------------ | :------- | :------------ |
    | `uid`               | `string` | **Required.** |
    | `displayName`       | `string` | **Required.** |
    | `bookName`          | `string` | **Required.** |
    | `genre`             | `string` | **Required.** |
    | `language`          | `string` | **Required.** |
    | `author`            | `string` | **Required.** |
    | `ISBNNumber`        | `string` | **Required.** |
    | `coverImage`        | `string` | **Required.** |
    | `linkToPurchase`    | `string` | **Required.** |
    | `yearOfPublication` | `string` | **Required.** |
    | `description`       | `string` | **Required.** |

    <br />

5.  ```http
    POST /api/v1/review/rate
    ```

    **Returns the updated post as response**
    | PARAMETERS | TYPE | DESCRIPTION |
    | :--- | :--- | :--- |
    | `reviewId` | `string` | **Required.** |
    | `rating` | `number` | **Required.** |
    <br />

#### REVIEW ROUTES

**All the routes require `Authorization` sent as Header with the `request`**

1.  ```http
    GET /api/v1/trade/getall
    ```

    **Returns the trades of all whom are followed by the user**
    <br />

2.  ```http
    POST /api/v1/trade/add
    ```

    **Returns a message if the review was added successfully**

    | PARAMETERS    | TYPE     | DESCRIPTION   |
    | :------------ | :------- | :------------ |
    | `uid`         | `string` | **Required.** |
    | `bookName`    | `string` | **Required.** |
    | `genre`       | `string` | **Required.** |
    | `description` | `string` | **Required.** |

    <br />
