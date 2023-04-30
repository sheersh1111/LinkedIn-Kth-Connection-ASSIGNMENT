const User = require("../model/userModel");
const Blog = require("../model/blogModel");

//Register a User
exports.registerUser = async (req, res, next) => {
    const { name, email } = req.body;
    const user = await User.create({
        name,
        email
    });
    res.status(200).json({
        success: true,
        user
    })
}

//create comment on a blog by user
exports.createBlogComment= async(req,res,next)=>{
    const {blogId,user,comment} = req.body; // Json body contains blogId, userId and comment sent by client
    const commentElement={
        user,
        comment
    };
    const blog = await Blog.findById(blogId);
    let userf;
    let i=0;
    for(i=0;i<blog.comments.length;i++){  // checking for already commented users
        userf=blog.comments[i].user; 
       await friendAdd(user,userf); // passing to function to check if already friend
    }                           //if not adding each other in vice-versa list of friends



    blog.comments.push(commentElement)
        await blog.save({validateBeforeSave:false});
        res.status(200).json({
            success:true,
            message:"comment added",
            comment
        })
    }


//checking if already friend , if not ,adding to list
friendAdd=async(user,userf)=>{
    let userData=await User.findById(user);
    let i=0;
    let found=false
    for(i=0;i<userData.friends.length;i++){ // traversing throught the friends list of user and finding
        if(userData.friends[i]===userf){
            found=true
            break
        }
    }
    if(!found){         // if not found adding both user id in each other's list and saving it in database
        userData.friends.push(userf);
        await userData.save({validateBeforeSave:false});
        userData=await User.findById(userf);
        userData.friends.push(user);
         await userData.save({validateBeforeSave:false});
    }
}

//finding kth level friend list of a particular user
exports.klevelfriends=async(req,res)=>{       // it is a typical BFS Algorithm
    const {userId,k}=req.params;
    const startUser = await User.findById(userId).populate('friends');
    let queue = []
  queue.push({user:startUser, level:0}); // adding user object in queue
  let visited = new Set();// also adding it in visited set
  let id=startUser._id;
  console.log(id.toString())
  visited.add(startUser._id.toString())
  let kthLevel = [];// list to be returned

  while (queue.length) {
    console.log(queue.length)
    const {user, level} = queue.shift();//taking out first element of queue
    console.log(queue.length)
    if (level == k) {
      console.log(level,k)
      kthLevel.push(user._id);    //if reached depth of k adding the element in list
    } else if (level < k) {      // if depth < k going depth+1
      for (const friend of user.friends) {
        if (visited.has(friend._id.toString())===false) {// checking if user is already present in visited set
          
          visited.add(friend._id.toString());   // if not adding it to it in set
          const friendWithFriends = await User.findById(friend).populate('friends');
    queue.push({ user: friendWithFriends, level: level + 1 });  // also adding it in queue
        }
      }
    }
  }

  res.status(200).json({
    success:true,
    kthLevel
  })
  

}