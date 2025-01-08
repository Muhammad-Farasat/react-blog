import Blog from '../Model/blog.model.js'
import mongoose from 'mongoose'


export const addBlog = async(req, res) =>{
    try {
        
        const blogs = await Blog.find({})
        // let id

        // if(blogs.length > 0){
        //     let blog_array = blogs.slice(-1)
        //     let new_blog_array = blog_array[0]
        //     id = new_blog_array.id + 1
        // }else{
        //     id = 1
        // }


        const {title, date, description, image, like, dislike, comment} = req.body

        console.log(req.body);

        if(!title || !description || !image){
            res.status(400).json({error: "Fill all feilds"})
        }

        const blog = new Blog({title, date, description, like, dislike, comment, image})

        await blog.save()

        res.status(200).json({message: 'Blog added'})


    } catch (error) {
        res.status(500).json({error: "Internal Error In Add Blog! "})
        console.error("Error: ", error)
    }

}

export const removeBlog = async(req, res) => {
    try {

        const result =  await Blog.findOneAndDelete({ _id: req.body.id });
        if (!result) {
            res.status(404).json({error: "blog not found..!"})
        }
        console.log("Removed");
        res.json({
        success: true,
        name: req.body.name,
        })

    } catch (error) {
        res.status(500).json({error: "Internal Error In removing Blog! "})
        console.error("Error: ", error)
    }
}

export const updateBlog = async(req, res)=>{
    try {
        
        const {id, title, description, image} = req.body

        const blog = await Blog.findOneAndUpdate({id:id},{title, description, image}, {new:true})

        res.json(blog)


    } catch (error) {
        res.status(400).json({error: "Error in updating blog..!"})
    }
}

export const getBlog = async(req, res) => {
    try {
        let blog = await Blog.find({})
        res.status(200).json(blog)

    } catch (error) {
        res.status(500).json({error: "Internal Error In getting Blog! "})
        console.error("Error: ", error)
    }
}

export const getById = async (req, res) => {
    try {
      
      console.log(req.params.id)

      const blog = await Blog.findById(req.params.id)
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found!" });
      }
  
      return res.status(200).json(blog);
  
    } catch (error) {
      
      res.status(500).json({ error: "Error in getting blog by ID..!!" });
      console.error(error);
    }
}

export const likeBlog = async(req, res) =>{
    try {
        
        const { blogId } = req.body
        const userID  = req.user.id


        const blog = await Blog.findById(blogId)

        if(!blog){
            res.json({error: "Blog doesn't exit..!"})
        }

        blog.like += 1

        await blog.save()

        res.json(blog)

    } catch (error) {
        res.status(500).json({error: "Error in liking the blog"})
    }
}

export const dislikeBlog = async(req, res) =>{
    try {
        
        const {dislike, blogId} = req.body
        const userID  = req.user.id


        const blog = await Blog.findById(blogId)

        if(!blog){
            res.json({error: "Blog doesn't exit..!"})
        }

        blog.dislike += 1

        await blog.save()

        res.json(blog)

    } catch (error) {
        res.status(500).json({error: "Error with disliking the blog"})
    }
}

export const commentBlog = async (req, res) => {
    try {
      const { comment, blogId } = req.body;
      const userId = req.user.id;

  
      if (!comment || !blogId) {
        return res.status(400).json({ error: "Comment or Blog ID missing" });
      }
  
      if (!req.user || !req.user.id) {
        return res.status(403).json({ error: "User not authenticated" });
      }
  
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      blog.comment = blog.comment || [];
      blog.comment.push({
        userId: req.user.id,
        comment,
        createdAt: new Date(),
      });
  
      await blog.save();
  
      res.status(200).json({ message: "Comment added successfully", blog });
    } catch (error) {
      console.error("Error in commentBlog:", error.message);
      res.status(500).json({ error: "Server error during commenting" });
    }
};
  

export const displayCommentBlog = async(req, res) => {
    try {
        
        const {id} = req.params

        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        const blog = await Blog.findById(req.params.id).select('comment').populate("comment.userId", "username")

        // console.log(blog);

        if (blog && blog.comment) {
            res.status(200).json({ comment: blog.comment });
          } else {
            res.status(404).json({ message: "No comments found" });
          }

    } catch (error) {
        res.status(500).json({error: "Problem in displaying comment"})
    }
}

export const latestBlog = async(req, res) => {
    try {
        let blog = await Blog.find({})

        const latest = blog.slice(1).slice(-3)

        res.send(latest)

    } catch (error) {
        res.status(500).json({error: "Problem in latest blog..!"})
    }
}
