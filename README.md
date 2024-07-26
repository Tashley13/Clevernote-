# Clevernote-

# API Reference - Backend

## NOTEBOOKS

### Get all Notebooks from current user

Returns all Notebooks created by the current user.

* Require Authentication: True
* Request:
    * Method: GET
    * URL: /notebooks
    * Body: none

* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
            "Notebooks": [{
                "id": 1,
                "title": "Joe's Notebook",
                "user_id": 3,
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36"
            }]
            }
        ```

### Get all data from a specific Notebook

Returns all notes inside of selected Notebook.

* Require Authentication: True
* Request:
    * Method: GET
    * URL: /notebooks/:id  ?/note?
    * Body: none

* Successful Response
    * Status Code: 200
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
            "id": 1,
            "title": "Joe's Notebook",
            "user_id": 3,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36",
            "Notes": [{
                "id": 1,
                "title": "Joes Notebook",
                "content": "Stuff",
                "notebook_id": 1,
                "user_id": 3,
                "created_at": "2021-11-19 20:39:36",
                "updated_at": "2021-11-19 20:39:36"
            }]
            }
        ```

### Create a Notebook

Creates and returns a new Notebook.

* Require Authentication: True
* Request:
    * Method: POST
    * URL: /notebooks
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
            "title": "Tom's Notebook",
            "user_id": 4,
            }
        ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
            "id": 2,
            "title": "Tom's Notebook",
            "user_id": 4,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36",
            }
        ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "title": "Title is required."
      }
    }
    ```

### Adding a Note to a Notebook

Adds the note to the notebook and then returns the note.

* Require Authentication: True
* Request:
    * Method: POST
    * URL: /notes/:id/notebooks
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
                "notebook_id": 2
            }
        ```

* Successful Response
    * Status Code: 201
    * Headers:
        * Content-Type: application/json
    * Body:
        ```json
            {
            "id": 1,
            "title": "Tom's Note",
            "notebook_id": 2,
            "user_id": 4,
            "created_at": "2021-11-19 20:39:36",
            "updated_at": "2021-11-19 20:39:36",
            }
        ```

* Error response: Couldn't find a Notebook with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Notebook couldn't be found"
    }
    ```

### Edit a Notebook

Updates and returns an existing notebook.

* Require Authentication: True
* Require proper authorization: Notebook must belong to the current user
* Request
  * Method: PUT
  * URL: /notebooks/:id
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Peter's Notebook"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 2,
        "title": "Peter's Notebook",
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
      "errors": {
        "title": "Title is required"
      }
    }
    ```

* Error response: Couldn't find a Notebook with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Notebook couldn't be found"
    }
    ```

### Delete a Notebook

Deletes an existing notebook.

* Require Authentication: True
* Require proper authorization: Notebook must belong to the current user
* Request
  * Method: DELETE
  * URL: /notebooks/:id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Notebook with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Notebook couldn't be found"
    }
    ```

# Tasks

#### Create a New Task

A logged-in user can create a new task.

**POST** `/api/tasks`

**Require Authentication:** True

**Request Body:**

```json

{

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "pending",

"due_date": "2024-08-01"

}
```
**Response:**

**Status Code:** 201

**Headers:** Content-Type: application/json

**Body:**
```json
{

"id": 1,

"user_id": 1,

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "pending",

"due_date": "2024-08-01",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:15:22Z"

}
```
**Error Response:**

**Status Code:** 400

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Bad Request",

"errors": { "title" : "Title is required", "description" : "Description is required" }

}
```



#### View All Tasks

A logged-in user can view all of their tasks.

**GET**`/api/tasks`

**Require Authentication:** True

**Succesful Response:**

**Status Code:** 200

**Headers:** Content-Type: application/json

**Body:**
```json

[

{

"id": 1,

"user_id": 1,

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "pending",

"due_date": "2024-08-01",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:15:22Z"

},

{

"id": 2,

"user_id": 1,

"title": "Finish project",

"description": "Complete the Clevernote project",

"status": "completed",

"due_date": "2024-07-25",

"created_at": "2024-07-24T14:20:22Z",

"updated_at": "2024-07-24T14:20:22Z"

}

]
```

**Status Code:** 401

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Unauthorized"

}
```


### View a Single Task

A logged-in user can view a specific task.

**GET** `/api/tasks/:id`

**Require Authentication:** True

**Succesful Response:**
```json
{

"id": 1,

"user_id": 1,

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "pending",

"due_date": "2024-08-01",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:15:22Z"

}
```

**Error Response:**

**Status Code:** 404

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Task not found"

}
```

#### Update a Task

A logged-in user can update an existing task.

**PUT** `/api/tasks/:id`

**Require Authentication:** True

**Request Body:**
```json
{

"title": "Buy groceries and vegetables",

"description": "Get milk, bread, eggs, and carrots",

"status": "pending",

"due_date": "2024-08-02"

}
```
**Successful Response:**

**Status Code:** 200

**Headers:** Content-Type: application/json

**Body:**
```json
{

"id": 1,

"user_id": 1,

"title": "Buy groceries and vegetables",

"description": "Get milk, bread, eggs, and carrots",

"status": "pending",

"due_date": "2024-08-02",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:30:22Z"

}
```
**Error Response:**

**Status Code:** 400

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Bad Request",

"errors": { "title" : "Title is required", "description" : "Description is required" }

}
```
#### Delete a Task

A logged-in user can delete a task.

**DELETE** `/api/tasks/:id`

**Require Authentication:** True

**Successful Response:**

**Status Code:** 200

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Task deleted successfully."

}
```
**Error Response:**

**Status Code:** 404

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Task not found"

}
```
### Mark Task as Completed

A logged-in user can mark a task as completed.

**PUT** `/api/tasks/:id/completed`

**Require Authentication:** True

**Request Body:**
```json
{

"status": "completed"

}
```
**Succesful Response:**

**Status Code: 200**

**Headers: Content-Type:** application/json

**Body:**
```json
{

"id": 1,

"user_id": 1,

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "completed",

"due_date": "2024-08-01",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:45:22Z"

}
```
**Error Response:**

**Status Code:** 400

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "Bad Request",

"errors": { "status" : "Status is required" }

}
```
### Search Tasks by Title

A logged-in user can search for tasks by title.

**GET** `/api/tasks/search?title=:title`

**Require Authentication:** True

**Successful Response:**

**Status Code:** 200

**Headers:** Content-Type: application/json

**Body:**
```json
[

{

"id": 1,

"user_id": 1,

"title": "Buy groceries",

"description": "Get milk, bread, and eggs",

"status": "pending",

"due_date": "2024-08-01",

"created_at": "2024-07-24T14:15:22Z",

"updated_at": "2024-07-24T14:15:22Z"

}

]
```
**Error Response:**

**Status Code:** 404

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "No tasks found"

}
```

### Filtering Tasks by Status

A logged-in user can filter tasks by their status.

**GET** `/api/tasks?status=:status`

**Require Authentication:** True

**Succesful Response:**

**Status Code:** 200

**Headers:** Content-Type: application/json

**Body:**
```json
[

{

"id": 2,

"user_id": 1,

"title": "Finish project",

"description": "Complete the Clevernote project",

"status": "completed",

"due_date": "2024-07-25",

"created_at": "2024-07-24T14:20:22Z",

"updated_at": "2024-07-24T14:20:22Z"

}

]
```
**Error Response:**

**Status Code:** 404

**Headers:** Content-Type: application/json

**Body:**
```json
{

"message": "No tasks found"

}
```



# Notes
## **Get notes of current user - Returns all the notes of the current user**

Require Authentication: true

_**Request**_
* Method: GET
* URL: /api/notes
* Body: none

_**Successful Response**_
* Status Code: 200
* Headers:
_Content-Type: application/json_
* Body:
>
> [
>
> {
> “id”: 1,
> “title”: “Test Note 1”,
> “content”: “This is a test note”,
> “notebookId”: 1,
> “userId”: 1,
> “created_at”: “2024-07-24 19:42:13.424242”,
> “updated_at”: null
> },
>
> {
> “id”: 2,
> “Title”: “Test Note 2”,
> “Content”: “This is another test note”,
> “NotebookId”: 2,
> “userId”: 1,
> “created_at”: “2024-07-24 19:42:13.424243”,
> “updated_at”: null
> }
>
> ]

## **Create a note - creates a new note ready to be updated**

Require Authentication: true

_**Request**_
* Method: POST
*URL: /api/notes
* Body:

> {
>
> “Title” : “Testing Clevernote”,
>
> “Content”: “Note for testing 1”
>
> }

_**Successful Response**_
* Status Code: 201
* Headers:
_Content-Type: application/json_
* Body:

> [
>
> {
> “id”: 5,
> “Title”: “Testing Clevernote”,
> “Content”: “Note for testing 1”,
> “NotebookId”: 4,
> “userId”: 3,
> “created_at”: “2024-07-24 19:58:13.4242”
> “Updated_at”: null
> }
>
> ]

**_Error Response_**
* Status Code: 400
* Headers:
_Content-Type: application/json_
* Body:

> {
>
> “Message”: “Bad Request”,
>
> “errors”:
>  {
> “title” : “Title is required”,
> “content” : “Content is required”
> }
>
> }

## **Update a note - update a note, autosave**
_**Request**_
* Method: PUT
* URL: /api/notes/:noteid
* Headers:
_Content-Type: application/json_
* Body:
>
> {
>
> “Title”: “Edit Title 1”,
>
> “Content”: “Edit this content”,
>
> “NotebookId”: 5
>
> }

_**Successful Response**_
* Status Code: 200
* Headers:
_Content-Type: application/json_
* Body:
>
> {
>
> “Id” : 1,
> “Title”: “Edit Title 1”,
> “Content”: “Edit this content”,
> “NotebookId”: 5,
> “userId”: 3,
> “created_at”: “2024-07-24 19:58:13.4242”,
> “Updated_at”: “2024-07-24 20:16:42.1313”
>
> }

_**Error Response 1**_
* Status Code: 400
* Headers:
_Content-Type: application/json_
* Body:
>
> 	{
>
> “Message”: “Bad Request”,
>
> “errors”:
>  {
> “title” : “Title is required”,
> “content” : “Content is required”
> }
>
> }

**_Error Response 2_**
* Status Code: 404
* Headers:
_Content-Type: application/json_
* Body:

> {
> “Message” : “Note couldn’t be found”
> }

## **Delete a note - delete a note, update shows the note was deleted without refresh**

Require Authentication: true

_**Request**_
* Method: DELETE
* URL: /api/notes/:noteid
* Body: none

_**Successful Response**_
* Status Code: 200
* Headers:
_Content-Type: application/json_
* Body:

> {
> “Message” : “Note deleted successfully
> }

_**Error Response **_
* Status Code: 404
* Headers:
_Content-Type: application/json_
* Body:

> {
> “Message” : “Note couldn’t be found”
> }

> Potential API to add in the future for admin reference: get detail of all notes.
> It could possibly include:
> * noteId
> * title
> * created_at
> * updated_at
> * character_count
> * word_count
> * spaces_count
> * paragraph_count
> * total_updates
> * last_updated
