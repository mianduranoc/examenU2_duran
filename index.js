const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    code: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },
    minimum:{
        type:Number,
        required:true
    }
});
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/examen_u2',{useNewUrlParser:true});
const Product=mongoose.model("Product",productSchema,"products");

function insert(code,price,description,quantity, minimum){
    var product=new Product({
        code:code,
        price:price,
        description: description,
        quantity: quantity,
        minimum: minimum
    });
    Product.create(product,err=>{
        if (err){
            console.log(err);
            console.log("Error al guardar");
        }
        else{
            console.log("Saved!!!");
        }
    })
}
function getReorden(){
    Product.find({$where:"this.quantity<this.minimum"},(err,docs)=>{
        console.log(docs);
        process.exit(0);
    });
}
async function execute(){
    await insert('1',20,"Calculadora",4,5);
    await insert('2',30,"Computadora",10,4);
    await insert('3',50,"Impresora",3,8);
    await insert('4',50,"Software",8,5);
    await getReorden();
}
execute();
