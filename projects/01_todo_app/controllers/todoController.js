

const Todo=require('../models/Todos')//*kiler sorumluusunu cagırdım


//*select * from 
const getAllTodos=async(req,res)=>{
    const todos=await Todo.findAndCountAll()  //*findandCount:total ve kaydı buluyor

    res.status(200).send({
        error:false,
        data:todos
    })
}


//*insert * into

const postTodo=async(req,res)=>{
    const todos= await Todo.create(req.body)

    res.status(201).send({
        error:false,
        data:todos,
    })
}


//*update işlemi update todos SET isdone=true Where id=5

const updateTodo=async(req,res,next)=>{
    try {
        const updatedTodo=await Todo.update(req.body, {
            where: {
                id:req.params.id 
            }
           
        })

        res.status(200).send(updatedTodo)
        
    } catch (error) {
        next(error)
        
    }
}


const deleteTodo=async(req,res,next)=>{
    try {
        const deletedTodo=await Todo.destroy(req.body,{
            where: {
                id:req.params.id
            } 
        })
          res.status(204).send(deletedTodo)
        
    } catch (error) {
        next(error)
        
    }
}

module.exports={getAllTodos,postTodo,updateTodo,deleteTodo}