import { useNavigate } from "react-router-dom";

// const navigate = useNavigate()
function payKorapay(amount) {
  let key = `key${Math.random()}`
  window.Korapay.initialize({
    key: 'pk_test_GEtMPZuJ3BtsD1AFT7nFq85YYQjssECg7tzDTQPd',
    reference: key,
    amount: amount,
    currency: "NGN",
    customer: {
      name: "John Doe",
      email: "john@doe.com"
    },
    onClose: function () {
      // Handle when modal is closed
    },
    onSuccess: function (data) {
      console.log(data)
    },
    onFailed: function (data) {
      console.log(data)
    }
    // notification_url: "https://example.com/webhook"
  });
}



export default payKorapay