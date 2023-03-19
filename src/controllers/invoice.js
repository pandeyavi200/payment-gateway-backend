const Invoice = require('../models/invoice');
const request = require('request');
const url = require('url');
const ObjectID = require('mongodb').ObjectId;

// function for fetching invoices
const fetchInvoices = async (req, resp) => {
  const invoices = await Invoice.find();
  resp.json({
    status: invoices?.length ? 200 : 404,
    data: invoices,
  });
};

//function to make payment 
const pay = async (req, resp) => {
  var options = {
    'method': 'POST',
    'url': `${process.env.INSTAMOJO_TEST_DOMAIN}/v2/payment_requests/`,
    'headers': {
      'Authorization': `Bearer ${process.env.AUTH_KEY}`,
      'Cookie': 'testing_im_logged_in=0a0e59cadcec429f80c9f7bd31ad2817; _logged_in=1; csrftoken=BQ1cpOSzlzbk1fEdte8sZzEQdnC4JheTjT4VxpRXnPloGI24nBGv4B50oNHU6noD'
    },
    formData: req.body
  };

  request(options, function (error, response) {

    if (error) throw new Error(error);
    resp.status(200).json(response.body);

  });
}

//fuction to make status of invoice to be Paid
const markDone = async (req, resp) => {

  let urlParts = url.parse(req.url, true)
  let responseData = urlParts.query
  if (responseData.payment_id) {
     await Invoice.findByIdAndUpdate({ _id: new ObjectID(responseData.id) }, { $set: { status: "Paid", payment_id: responseData.payment_id } }, { new: true })
      .then((invoice) => {})
      .catch((error) => {})
      .finally(() => {
        resp.redirect(process.env.REDIRECT_URL)
      })
  } else {
    resp.status(400).json({ error: "Payment ID not provided" })
  }
}
module.exports = { fetchInvoices, pay, markDone }