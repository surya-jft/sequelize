const Sequelize = require('sequelize');
const { UPSERT } = require('sequelize/types/query-types');
const { DataTypes , Op } = Sequelize;

const sequelize = new Sequelize('sequelize', 'root', 'password',{
    dialect : 'mysql'
})

const Student = sequelize.define('student',{
    Student_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [4,20]
        }
    },
    favorite_class : {
        type : DataTypes.STRING(25),
        defaultValue : 'computer science'
    },
    school_year : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
},{
    freezeTableName : true,
    timestamps : false
})

Student.sync().then(()=>{
    return UPSERT.sum('age', { where : {age : 21}})
}).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})