import { createBrowserRouter } from "react-router-dom";
import Main from "./../Layout/Main";
import Home from "../Pages/Home";
import AdminLogin from "../Pages/AdminPanel/AdminLogin";
import FounderLogin from "../Pages/Founder/FounderLogin";
import InvestorLogin from "../Pages/Investor/InvestorLogin";
import AdminDashborad from "../Pages/AdminPanel/AdminDashborad";
import ErrorPage from "../Pages/ErrorPage";
import InvestorDashboard from "../Pages/Investor/InvestorDashboard";
import Shariah from "../Pages/Shariah";
import FixedReturn from "../Pages/FixedReturn";
import Stocks from "../Pages/Stocks";
import GetFunded from "../Pages/GetFunded";
import FounderDashboard from "../Pages/Founder/FounderDashboard";
import FounderPost from "../Pages/Founder/FounderPost";
// import PrivateInvestorRoute from "./PrivateInvestorRoute";
// import PrivateFounderRoute from "./PrivateFounderRoute";
// import PrivateAdminRoute from "./PrivateAdminRoute";
import ProjectDetail from "../Pages/ProjectDetail";
import Payment from "../Pages/Payment";
import AdminPostDetail from "../Pages/AdminPanel/AdminPostDetail";
import AdminPending from "../Pages/AdminPanel/AdminPending";
import FounderPending from "../Pages/Founder/FounderPending";
import FounderPostReview from "../Pages/Founder/FounderPostReview";
import Terms from "../Pages/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/adminlogin",
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: "/founderlogin",
        element: <FounderLogin></FounderLogin>,
      },
      {
        path: "/founderpending",
        element: <FounderPending></FounderPending>,
      },
      {
        path: "/founderpostreview/:id", // Include :id to capture the post ID
        element: <FounderPostReview />,
      },
      {
        path: "/investorlogin",
        element: <InvestorLogin></InvestorLogin>,
      },
      {
        path: "/admindashboard",
        element: (
          // <PrivateAdminRoute>
          //   <AdminDashborad></AdminDashborad>
          // </PrivateAdminRoute>
          <AdminDashborad></AdminDashborad>
        ),
      },
      {
        path: "/projectdetail/:id",
        element: (
          //   <PrivateInvestorRoute>
          //   <ProjectDetail></ProjectDetail>
          // </PrivateInvestorRoute>
          <ProjectDetail></ProjectDetail>
        ),
      },
      {
        path: "/post/:id",
        element: <AdminPostDetail></AdminPostDetail>,
      },

      {
        path: "/investordashboard",
        element: (
          // <PrivateInvestorRoute>
          //   <InvestorDashboard></InvestorDashboard>
          // </PrivateInvestorRoute>
          <InvestorDashboard></InvestorDashboard>
        ),
      },
      {
        path: "/shariah",
        element: <Shariah></Shariah>,
      },
      {
        path: "/fixedreturn",
        element: <FixedReturn></FixedReturn>,
      },
      {
        path: "/stocks",
        element: <Stocks></Stocks>,
      },
      {
        path: "/terms",
        element: <Terms></Terms>,
      },
      {
        path: "/getfunded",
        element: <GetFunded></GetFunded>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/adminpending",
        element: <AdminPending></AdminPending>,
      },
      {
        path: "/founderdashboard",
        element: (
          // <PrivateFounderRoute>
          //   <FounderDashboard></FounderDashboard>
          // </PrivateFounderRoute>
          <FounderDashboard></FounderDashboard>
        ),
      },
      {
        path: "/founderpost",
        element: (
          // <PrivateFounderRoute>
          //   <FounderPost></FounderPost>
          // </PrivateFounderRoute>
          <FounderPost></FounderPost>
        ),
      },
    ],
  },
]);
