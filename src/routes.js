import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { AuthLayout, DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/BlogOverview";
import Profile from "./views/Profile";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Cases from "./views/Cases";
import AltruisticDonors from "./views/AltruisticDonors";
import Login from "./views/Authentication/Login";
import HealthFacilities from "./views/HealthFacilities";
import Users from "./views/Users";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component: Profile
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/cases",
    layout: DefaultLayout,
    component: Cases
  },
  {
    path: "/facilities",
    layout: DefaultLayout,
    component: HealthFacilities
  },
  {
    path: "/users",
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/altruistic-donors",
    layout: DefaultLayout,
    component: AltruisticDonors
  },
  {
    path: "/login",
    layout: AuthLayout,
    component: Login
  }
];
