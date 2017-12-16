1. Delete initiative
Inactive Initiatives have a delete button that sends a delete request and deletes the initiative using the provided delete funtion

2. Persistent session 
After each successful login we create a new cookie and set it's life to 30mins and add it to the response

3. "Encrypting" Password
The password is only hashed before sent to the server. We found a third-party library and we use an md5 hashing 
before sending the password in the ajax requests. For this implementation we had to remove back-end Regular expression
checks.

4. All initiative fields are visible on each "block"/div that represents an initiative. There are listeners
in place that open the initiative in a new page where comments, ratings, heatmap(if ended) would be. So far it only isolates
the initiative.

5. We can View all users through the users main page. From there we can click on any table row and we can see the 
initiatives for that particular user 

6. We create a hashmap in the serverContext and we add a username each time a user logs in, and remove it before invalidating
a session when sign out is clicked.

7. 

8.

9. We send a request through a text box and a button, unfortunately it was a last minute implementation so visuals got messed up.
We handle the request in the server and create a new rating object. We did not make it in time to send and handle the appropreate response.
