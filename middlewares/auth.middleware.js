const jwt = require('jsonwebtoken');
const express = require("express")


const auth = async(req, res, next) => {
    
    try {
        const wholeToken = req.headers.authorization
        // console.log(req.body)
        if (wholeToken) {
            // console.log(wholeToken)
            const token = wholeToken.split(" ")[1]
            console.log(token)
            jwt.verify(token, 'avenger', function(err, decoded) {
                if (decoded) {
                    req.body.userId = decoded.userId
                    // console.log(decoded.userId)
                    next()
                } else if (err) {
                    res.status(200).json({"msg": "Wrong token provided"})
                }
              });
        } else {
            res.status(200).json({"msg":"Please Login first"})
        }
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
}



module.exports = {auth}