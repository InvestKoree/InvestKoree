import bkash from "../assets/bkash.png";
import city from "../assets/city.png";
const Payment = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen ">
      <h1 className="text-2xl font-semibold mb-4">Payment Methods</h1>
      <p className="text-gray-600 mb-8">More methods will be added soon.</p>
      <div className="flex items-center space-x-4 bg-white p-4   rounded-lg shadow-lg">
        <img src={bkash} alt="bKash logo" className="h-12 w-20" />
        <span className="text-xl font-medium">+8801684380226</span>
      </div>
      <div className="flex items-center space-x-4 mt-4 bg-white p-4   rounded-lg shadow-lg">
        <img src={city} alt="bKash logo" className="h-12 w-20" />
        <span className="text-xl font-medium">+8801XXXXXXX</span>
      </div>
    </div>
  );
};
export default Payment;
