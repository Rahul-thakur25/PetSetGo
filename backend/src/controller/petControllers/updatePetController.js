import express from 'express';
import zod from 'zod';

const StringParser = zod.string();
const NumberParser = zod.number();

const updatePet = async(req,res)=>{
    const { age, weight } = req.body;
    const { petId } = req.params;
    const isPetId = 
    const isAge = NumberParser.safeParse(age);
    const isWeight = NumberParser.safeParse(weight);


    if(!isString.success){
        return res.status(400).json({ message: 'Invalid pet id' });
    }
    if(!isNumber.success){
        return res.status(400).json({ message: 'Invalid age or weight' });
    }

}
export default updatePet;