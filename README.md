# Login Page and User Manager
Deploy Link: https://itrasition-task-4.onrender.com/

This is a project from Itrasition intership program. If you wanna try it in local take this steps:
- Download the project
- Execute npm install
- In the .env.example file insert your database url to connect the database with prisma as explained here: https://www.prisma.io/docs/accelerate/connection-pooling
- Make sure to change the models in the schema.prisma file if you are not using mysql
- Run prisma migrate dev --name init to begin migrations
- Run npm run dev
- Test the proyect

## Task instructions
Use language and platform FOR YOU GROUP: 

JavaScript or TypeScript, use React (you may use anything to store user data, e.g. implement back on Node.js+Express+MySQL; you may use some SaaS like Firebase - be careful, if you decide to use "out-of-the-box" users, it may be problematic to delete them).

Create a working and deployed Web application with registration and authentication.
Non-authenticated users should not have access to the user management (admin panel).
Only authenticated users should have access the user management table: id, name, e-mail, last login time, registration time, status (active/blocked).

The leftmost column of the table should contains checkboxes without labels for multiple selection (table header contains only checkbox without label that selects or deselects all records).

There must be a toolbar over the table with the following actions: Block (red button with text), Unblock (icon), Delete (icon).

You have to use any CSS framework (Bootstrap is recommended, but you can choose any CSS framework).

All users should be able to block or delete themselves or any other user.

If user account is blocked or deleted any next user’s request should redirect to the login page.

User can use any non-empty password (even one character). If you use 3rd-party service to store users, you may 1) either implement your own "users" there or 2) accept that some requirement cannot be implemented (but you get results faster).

Blocked user should not be able to login, deleted user can re-register.

YOU HAVE TO CREATE A UNIQUE INDEX IN THE SELECTED DATABASE. NOT TO CHECK WITH YOU CODE FOR UNIQUENESS, BUT CREATE THE INDEX.

## Preview Images:
![image](https://github.com/user-attachments/assets/6483e758-4aab-4ab4-af03-a95f49092d8c)

![image](https://github.com/user-attachments/assets/89b21f37-5c17-4280-a7c4-ec38512578ce)

![image](https://github.com/user-attachments/assets/11629aaa-5807-4570-b077-fb786ee00b8c)



