const express = require("express");
const { fetchInvoices, pay, markDone } = require("../controllers/invoice");
const router = express.Router();

//To fetch invoices
router.get("/invoices", fetchInvoices);

//To make payments
router.post("/pay", pay);

//To change status
router.get('/mark-done', markDone)

module.exports = router;
