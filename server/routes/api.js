import express from 'express'
import * as TradeController from '../controllers/TradeController.js'

const router=express.Router();

router.post('/create-trade',TradeController.CreateTrade)
router.post('/update-trade/:id',TradeController.UpdateTrade)
router.get('/delete-trade/:id',TradeController.DeleteTask)
router.get('/read-trade/:id',TradeController.ReadTradeData)
router.get('/read-all-trade',TradeController.ReadAllTrade)


export default router;