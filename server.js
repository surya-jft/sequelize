const express = require("express");
const Sequelize = require("sequelize");
const {DataTypes, Op} = Sequelize;
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('sequelize', 'root', 'password', {
    dialect: 'mysql'
})

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate :{
            len : [4,6]
        },
        get() {
            const rawValue = this.getDataValue('username');
            return rawValue.toUpperCase();
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value,salt)
            this.setDataValue('password',hash);
        }
    },
    age: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 21
    },
    wittCodeRocks: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        freezeTableName: true,
        timestamps: false
    })

//User.sync({ alter: true }).then(() => {
    //working with our updated table.

    // const user = User.build({ username:"surya",password:"123",age:25,wittCodeRocks:true});
    // return user.save();

//we can use bulkCreate method to add n number of datas
//     return User.bulkCreate([
//     {
//         username: "Tom",
//         age : 16,
//         password : "pizza"
//     },
//     {
//         username : "Mike",
//         age : 13,
//         password : "12345"
//     },
//     {
//         username : "Freddie"
//     }
// ])

//we can use sequelize function to do a operations
    //return User.findAll({attributes : [[sequelize.fn('AVG',sequelize.col('age')),'how_old']]});

//we can use exclude to do exclude operation
    //return User.findAll({attributes : {exclude : ['password']}});

//using where function
    //return User.findAll({ where : {age : 25, username : "soccer"}})

//set the limit
    //return User.findAll({limit :2});

//using asc and desc
    //return User.findAll({order : [['age','ASC']]});
    //return User.findAll({order : [['age','DESC']]});

//using group method
    // return User.findAll({ 
    //     attributes : ['username',
    //                  [sequelize.fn('SUM',sequelize.col('age')),'sum_age']],
    //     group : 'username'})

//using and , or method
    // return User.findAll({ where : {
    //    [Op.or]: {username : 'soccer',age:25}
    // }})

    // return User.findAll({ where : {
    //    [Op.or]: {username : 'soccer',age:25}
    // }})

//using greater than and less than equals to
    // return User.findAll({ where : {
    //     age : {
    //         [Op.gt]: 21              //gt means greater than
    //     }
    // }})

    // return User.findAll({ where : {
    //     age : {
    //         [Op.or]: {
    //             [Op.lt]: 45,            //lt means less than
    //             [Op.eq] : null          //eq means equals to
    //         }
    //     }
    // }})

//using char_length
    // return User.findAll({ where : 
    //     sequelize.where(sequelize.fn('char_length',sequelize.col('username')),6)
    // })

// }).then((data) => {

//     data.forEach((element)=>{
//         console.log(element.toJSON());
//     })

//     //data.decrement({ age : 2 });
//     //data.increment({ age : 2 });

//     // console.log("User added to database");
//     // data.username="karthik";
//     // data.age = 30;
//     // return data.save({fields:['age']});
// }).catch((err) => {
//     console.log(err);
// })





User.sync({ alter: true }).then(() => {
//using destroy with truncate it will delete all the record in the table
    //return User.destroy({ where : {username : 'shiva'}, truncate : true })

    return User.create({
        username : "witt",
        password : "soccerisfun67"
    })
}).then((data) => {
    console.log(data.username);
    console.log(data.password);
}).catch((err) => {
    console.log(err);
})