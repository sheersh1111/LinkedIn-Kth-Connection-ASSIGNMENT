# BEH-BACKEND-ASSIGNMENT

# npm init

You can Install following modules to run the above code:

## npm i express mongoose body-parser validator path dotenv nodemon 

I have used MongoDb database and ExpressJs for this assignment.

Routes are in routes folder.

All api functions are in User controller and Blog controller in controller folder.

I have used User Model and Blog Model . 
You can check them out in Models folder.


## How the create comment api is working?

Well , First, 

it is checking the list of all already commented users on that particular blog.
Then, it is seeing whether each element(userf: user that can be friend in future) of that list is present as friend in our current user which is commenting in the blog.
If it is not present, user adds userf in it's friends list and userf adds user in it's friends list.

Then, 
    user comments on blog and blog is updated on database.

## How the kth level friend finding API is working?

Well , it is a typical BFS(Breadth First Search) Algorithm,
first , there is queue in which we will be adding the user's not visited friends,
      and also, there will be a set in which we will store visited nodes(users).
      
For every level user we will add non-visited node(user's friend's) in the queue with level+1.      
      
When, level reaches k-value, 
we will add user elements present in queue which are not present in visited set.
