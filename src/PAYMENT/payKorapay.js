
function payKorapay(amount) {
  let key = `key${Math.random()}`
  if (amount) {
    window.Korapay.initialize({
      key: 'pk_test_gNgfQ3Cmh5CqTwM7GApbuU4WnanGqxykYRJCoNm9',
      reference: key,
      amount:amount,
      currency: "NGN",
      customer: {
        name: "John Doe",
        email: "john@doe.com"
      },
      notification_url:"https://example.com/webhook"
    });
  } else {
    return
  }
}


export default payKorapay