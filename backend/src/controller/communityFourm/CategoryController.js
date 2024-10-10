// import zod from "zod";
// import CategoryModel from "../../models/community/CategoryModel.js";


// const nameParser = zod.string();
// const tagParser = zod.string().max(10);


// const categoryList = async (req,res)=>{
//     try {
//          const {name , tag} = req.body;
//          const userId = req.params;
         
//          const isName = nameParser.safeParse(name);
//          const isTag = tagParser.safeParse(tag);
    
//          if(!isName.success ){
//              return res.status(400).json({
//                  message: "Invalid input in name",
//                  error: isName.error
//              });
//          }
//          if(!isTag.success){
//              return res.status(400).json({
//                  message: "Invalid input in tag",
//                  error: isTag.error
//              });
//          }

         
//         const Category = new CategoryModel({
//             name,
//             tag,
//         });
//         if(!createdBy){
//             return res.status(400).json({message: "Invalid user ID"});
//         }
//         const category = new CategoryModel({
//             Name:name,
//             tags:tag,
//             createdBy:userId,
//         });
        
//         if(!category){
//             return res.status(400).json({message: "Invalid input"});
//         }
         
//         await category.save();
    
    
//         res.status(200).json({
//             message: "Category created successfully",
//             category
//         });
//     } catch (error) {
//          console.log(error);
//     }
// }

// export default categoryList;

import zod from "zod";
import CategoryModel from "../../models/community/CategoryModel.js";

// Define Zod schema for validation
const nameParser = zod.string().max(12); // Assuming max length of 12 for name
const tagParser = zod.string().max(10); // Assuming max length of 10 for tag

const categoryList = async (req, res) => {
    try {
        const { name, tag } = req.body;
        const { userId } = req.params; // Get userId from request parameters

        // Validate inputs
        const isName = nameParser.safeParse(name);
        const isTag = tagParser.safeParse(tag);

        if (!isName.success) {
            return res.status(400).json({
                message: "Invalid input in name",
                error: isName.error,
            });
        }
        if (!isTag.success) {
            return res.status(400).json({
                message: "Invalid input in tag",
                error: isTag.error,
            });
        }
        
        // Create a new category
        const category = new CategoryModel({
            Name:name, // Assuming your CategoryModel has a field named 'name'
            tags: [tag], // Store tags as an array
            createdBy: userId, // Store the user ID of the creator
        });
        
        if(!category){
            return res.status(400).json({
                message: "error  in creating category",
            }); // Return an error if the category object is invalid or undefined
        }

        // Save the category to the database
        await category.save();

        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({
            message: "An error occurred while creating the category",
            error: error.message, // Send the error message back to the client
        });
    }
};

export default categoryList;
